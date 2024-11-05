
import express from 'express';
import authValidation from '../validations/auth.validation.js';
import authController from '../controllers/auth.controller.js';


const router = express.Router();
router.get('/',authController.hello);
export default router;