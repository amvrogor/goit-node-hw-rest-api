const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  User,
  userRegisterSchema,
  userLoginSchema,
  updateSubscriptionSchema,
} = require("../models/user");
const { HttpError } = require("../helpers");
const { SECRET_KEY } = process.env;

const register = async (req, res, next) => {
  try {
    const { error } = userRegisterSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.details[0].message);
    }

    const { email, password, subscription } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw HttpError(409, "Email in use");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const result = await User.create({
      ...req.body,
      password: hashPassword,
      subscription,
    });
    res.status(201).json({
      user: { email: result.email, subscription: result.subscription },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { error } = userLoginSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.details[0].message);
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw HttpError(401, "Email or password is wrong");
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw HttpError(401, "Email or password is wrong");
    }
    const { _id: id, subscription } = user;
    const payload = {
      id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
    await User.findByIdAndUpdate(id, { token });
    res.json({
      token,
      user: {
        email: user.email,
        subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getCurrent = async (req, res, next) => {
  try {
    const { email, subscription } = req.user;
    res.json({
      user: {
        email,
        subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: null });
    res.status(204).json({
      message: "No content",
    });
  } catch (error) {
    next(error);
  }
};

const updateSubscription = async (req, res, next) => {
  try {
    const { error } = updateSubscriptionSchema.validate(req.body);
    if (error) {
      throw HttpError(400, "Incorrect data");
    }
    const { _id } = req.user;
    const result = await User.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getCurrent,
  logout,
  updateSubscription,
};
