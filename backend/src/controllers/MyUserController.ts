import { Request, Response } from "express";
import User from "../models/user";
const createCurrentUser = async (req: Request, res: Response) => {
  try {
    const { auth0Id } = req.body;
    const existingUser = await User.findOne({ auth0Id });
    if (existingUser) {
      return res.status(200).send();
    }
    const newUser = await User.create(req.body);
    // await newUser.save();
    return res.status(201).json(newUser.toObject());
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Error creating user",
    });
  }
};

export default {
  createCurrentUser,
};
