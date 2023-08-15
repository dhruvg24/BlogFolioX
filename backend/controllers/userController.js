import UserSchema from "../model/UserSchema";
import bcrypt from "bcryptjs";
// so that hashed value of password is stored
export const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await UserSchema.find();
    // WILL RETURN ARRAY
  } catch (err) {
    console.log(err);
  }
  if (!users) {
    return res.status(404).json({ message: "No Users Found!" });
  }
  return res.status(200).json({ users });
};

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await UserSchema.findOne({ email });
    // will only find a single user
  } catch (err) {
    return console.log(err);
  }
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "User already exists! Login instead" });
  }
  // saving the hashed value of the password
  const hashedPassword = bcrypt.hashSync(password);
  const user = new UserSchema({
    name,
    email,
    password: hashedPassword,
    blogs: [],
  });

  // need to save the new user
  try {
    await user.save();
    // adding await since its async task
    // user.save may take some time as well
    // mongoose func to save new user in DB
  } catch (err) {
    return console.log(err);
  }
  return res.status(201).json({ user });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await UserSchema.findOne({ email });
    // will only find a single user
  } catch (err) {
    return console.log(err);
  }
  if (!existingUser) {
    return res
      .status(404)
      .json({
        message: "Couldn't find the user by this email, Please Sign Up!",
      });
  }

  // check the password
  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect Password" });
  }
  return res.status(200).json({ message: "Login Successfull" });
};
