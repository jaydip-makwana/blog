import jwt from "jsonwebtoken";
import authModel from "../models/auth.model.js";

const isUserAuthenticated = async (req, res, next) => {
  try {
    let token;
    const { authorization } = req.headers;

    if (authorization && authorization.startsWith("Bearer")) {
      token = authorization.split(" ")[1];
      const { userId } = jwt.verify(token, "pleaseSubscribe");
      req.user = await authModel.findById({ _id: userId }).select("--password");
      next();
    } else {
      res.status(401).send({ errorMessage: "Unauthorized" });
    }
  } catch (error) {
    res.status(401).send({ errorMessage: "Unauthorized" });
  }
};

export default isUserAuthenticated;
