import express from 'express';
import auth from '../middlewares/auth.js';
import userController from '../controllers/user.controller.js';

const router = express.Router();

router.post('/update-email-name',auth(), userController.updateEmailName);
router.post('/home', auth() , userController.home);
export default router;