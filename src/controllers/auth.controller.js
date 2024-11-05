import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync.js';
import { authService, tokenService } from '../services/index.js';
import moment from 'moment/moment.js';

/**
 * Register a new user and generate OTP
 * @param {Object} req
 * @param {Object} res
 */
const generateSignupOtp = catchAsync(async (req, res) => {
  const { mobile } = req.body;

  // Register the user
  const user = await authService.registerUser(mobile);

  if (!user) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .send({ message: 'Registration failed' });
  }

  // Generate OTP and send for signup
  const otp = await authService.generateOtp(mobile);
  console.log(otp);
  //i do'nt have  the SMS service to send otp via sms , so i will skip it for now

  res.send({
    success: true,
    message: 'OTP sent for verification',
    mobile,
  });
});

/**
 * Generate OTP for login
 * @param {Object} req
 * @param {Object} res
 */
const generateLoginOtp = catchAsync(async (req, res) => {
  const { mobile } = req.body;

  // Check if the user exists
  const user = await authService.getUserByMobile(mobile);

  if (!user) {

    return res
      .status(httpStatus.UNAUTHORIZED)
      .send({ message: 'Mobile number not registered' });
  }
  if (!user.isProfileApprove) {

    return res
      .status(httpStatus.UNAUTHORIZED)
      .send({ message: 'your profile is not approved' });
  }
  // Generate OTP and send for login
  const otp = await authService.generateOtp(mobile);
  res.send({
    success: true,
    message: 'OTP sent successfully for login',
    mobile,
  });
});

const verifyOtp = catchAsync(async (req, res) => {
  const { mobile, otp } = req.body;
  const user = await authService.getUserByMobile(mobile);

  if (!user) {
    return res.status(httpStatus.NOT_FOUND).send({ message: 'User not found' });
  }

  // Check if the OTP has expired
  if (user.otp_expires_at < moment().utc()) {
    return res.status(httpStatus.UNAUTHORIZED).send({ message: 'OTP has expired' });
  }

  // Check if the OTP is incorrect
  if (user.otp_code != otp) {
    return res.status(httpStatus.UNAUTHORIZED).send({ message: 'Wrong OTP' });
  }
  user.otp_verified = 1;
  await user.save();
  // Generate authentication tokens
  const tokens = await tokenService.generateAuthTokens(user.id); // Assuming user is a single object now
  return res.send({ success: true, user, tokens, message: 'Login successful' });
});


const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

const hello = catchAsync(async (req, res) => {

  await res.send({ msg: 'Welcome to the node project' });
});

export default {
  generateSignupOtp,
  generateLoginOtp,
  verifyOtp,
  logout,
  refreshTokens,
  hello
};
