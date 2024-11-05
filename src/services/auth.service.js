import httpStatus from 'http-status';
import tokenService from './token.service.js';
import db from '../models/index.js';
import ApiError from '../utils/ApiError.js';
import { tokenTypes } from '../config/tokens.js';
import moment from 'moment/moment.js';
// Fetch a user by mobile number
const getUserByMobile = async (mobile) => {
  return await db.User.findOne({ where: { mobile_number: mobile } });
};

// Register a new user
const registerUser = async (mobile) => {
  const existingUser = await getUserByMobile(mobile);

  if (existingUser) {
    if (existingUser.isProfileApprove) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Mobile number already registered');
    }
    return existingUser;
  }

  return await db.User.create({ mobile_number: mobile });
};

// Generate OTP for signup
const generateOtp = async (mobile) => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  const user = await db.User.findOne({ where: { mobile_number: mobile } });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  user.otp_code = otp;
  user.otp_verified = 0;
  user.otp_expires_at = moment().utc().add(10, 'minutes').toDate();
  await user.save();
  return otp;
};

// Logout
const logout = async (refreshToken) => {
  const refreshTokenDoc = await db.tokens.findOne({
    where: { token: refreshToken, type: tokenTypes.REFRESH, blacklisted: false },
  });

  if (!refreshTokenDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
  }

  await refreshTokenDoc.destroy();
  return {};
};

// Refresh auth tokens
const refreshAuth = async (refreshToken) => {
  try {
    const refreshTokenDoc = await tokenService.verifyToken(refreshToken, tokenTypes.REFRESH);
    const user = await getUserByMobile(refreshTokenDoc.user);

    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }

    await refreshTokenDoc.destroy();
    return tokenService.generateAuthTokens(user);
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
  }
};

export default {
  registerUser,
  generateOtp,
  getUserByMobile,
  logout,
  refreshAuth,
};
