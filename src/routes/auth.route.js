import express from 'express';
import validate from '../middlewares/validate.js';
import authValidation from '../validations/auth.validation.js';
import authController from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/generate-signUp-otp', authController.generateSignupOtp);
router.post('/generate-login-otp', authController.generateLoginOtp);
router.post('/verify-otp', authController.verifyOtp);
router.post('/logout', validate(authValidation.logout), authController.logout);
router.post('/refresh-tokens', validate(authValidation.refreshTokens), authController.refreshTokens);

export default router;