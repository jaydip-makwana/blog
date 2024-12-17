import authModel from "../models/auth.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

class AuthController {
  static userRegistration = async (req, res) => {
    try {
      const { username, email, password } = req.body;
      if (!username || !email || !password) {
        return res.status(400).send({ message: "Pass a valid data" });
      }

      const isFound = await authModel.findOne({ email: email });
      if (isFound) {
        return res.status(400).send({ message: "User already found" });
      }
      // Hash the password
      const hash = await bcryptjs.genSalt(10);
      const hashPassword = await bcryptjs.hash(password, hash);

      const user = new authModel({
        username,
        email,
        password: hashPassword,
      });

      const savedUser = await user.save();
      res.send({ message: "User register successfully", data: savedUser });
    } catch (error) {
      res.status(500).send({ errorMessage: error?.message });
    }
  };

  static userLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await authModel.findOne({ email: email });
      if (!user) {
        return res.status(400).send({ message: "User not found" });
      }

      const isValidPassword = await bcryptjs.compare(password, user.password);

      if (!isValidPassword) {
        return res.status(400).send({ message: "Pass a valid passoword" });
      }
      // Generate a token
      const token = jwt.sign({ userId: user?._id }, "pleaseSubscribe", {
        expiresIn: "2d",
      });

      res.send({
        message: "User Login successfully",
        data: {
          name: user.username,
          token,
        },
      });
    } catch (error) {
      res.status(500).send({ errorMessage: error?.message });
    }
  };
}
export default AuthController;
