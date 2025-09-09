import { registerUserService, loginUserService } from "../services/authServices.js";

export const registerUser = async (req, res, next) => {
  try {
    const result = await registerUserService(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err); // Pass to error middleware
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const result = await loginUserService(req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};
