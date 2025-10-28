import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/index.js";
const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ user });
};
const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  res.status(StatusCodes.OK).json({ user });
};
export { register, login };
