import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync.js';
import { userService } from '../services/index.js';

const updateEmailName = catchAsync(async(req,res) => {
  const {name,email} = req.body;
const data = await userService.updateEmailName(name,email,req.user.id);
res.status(200).send(data);
})
const home = catchAsync(async(req,res) => {
  const data = await userService.home();
res.send(data);
});

export default {
  updateEmailName,
  home
};
