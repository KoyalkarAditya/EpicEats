import { Request, Response } from "express";
import Restaurant from "../models/restaurant";
import cloudinary from "cloudinary";
import mongoose from "mongoose";
import Order from "../models/order";
const createMYRestaurant = async (req: Request, res: Response) => {
  try {
    const existingRestaurant = await Restaurant.findOne({
      user: req.userId,
    });
    if (existingRestaurant) {
      return res
        .status(409)
        .json({ message: "User Restaurant already exists" });
    }
    // const image = req.file as Express.Multer.File;
    // const base64Image = Buffer.from(image.buffer.toString("base64"));
    // const dataURI = `data:${image.mimetype};base64,${base64Image}`;
    // const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);

    const imageURL = await uploadImage(req.file as Express.Multer.File);
    const restaurant = new Restaurant(req.body);
    restaurant.imageURL = imageURL;
    restaurant.user = new mongoose.Types.ObjectId(req.userId);
    restaurant.lastUpdated = new Date();
    await restaurant.save();
    res.status(211).send(restaurant);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "SomeThing went wrong",
    });
  }
};

const getMyRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurant = await Restaurant.findOne({ user: req.userId });
    if (!restaurant) {
      return res.status(404).json({
        message: "restaurant not found",
      });
    }
    res.json(restaurant);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error fetching restaurant" });
  }
};

const updateMyRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurant = await Restaurant.findOne({ user: req.userId });
    if (!restaurant) {
      return res.status(404).json({
        message: "restaurant not found",
      });
    }
    restaurant.restaurantName = req.body.restaurantName;
    restaurant.city = req.body.city;
    restaurant.country = req.body.country;
    restaurant.deliveryPrice = req.body.deliveryPrice;
    restaurant.estimatedDeliveryTime = req.body.estimatedDeliveryTime;
    restaurant.cuisines = req.body.cuisines;
    restaurant.menuItems = req.body.menuItems;
    restaurant.lastUpdated = new Date();
    if (req.file) {
      const imageURL = await uploadImage(req.file as Express.Multer.File);
      restaurant.imageURL = imageURL;
    }
    await restaurant.save();
    res.status(200).send(restaurant);
  } catch (e) {
    console.log("error", e);
    res.status(500).json({ message: "Something is wrong" });
  }
};

const uploadImage = async (file: Express.Multer.File) => {
  const image = file as Express.Multer.File;
  const base64Image = Buffer.from(image.buffer.toString("base64"));
  const dataURI = `data:${image.mimetype};base64,${base64Image}`;
  const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);
  return uploadResponse.url;
};

const getMyRestaurantOrders = async (req: Request, res: Response) => {
  try {
    const currentUserRestaurant = await Restaurant.findOne({
      user: req.userId,
    });
    if (!currentUserRestaurant) {
      return res.status(404).json({ message: "restaurant not found" });
    }
    const orders = await Order.find({ restaurant: currentUserRestaurant._id })
      .populate("restaurant")
      .populate("user");

    res.json(orders);
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ message: "error while getting ur restaurant orders" });
  }
};

const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const orderId = req.params.orderId;
    const { status } = req.body;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    const restaurant = await Restaurant.findById(order.restaurant);
    if (restaurant?.user?._id.toString() !== req.userId) {
      return res.status(401).send();
    }
    order.status = status;
    await order.save();
    return res.status(200).json(order);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "unable to update order status" });
  }
};

export default {
  createMYRestaurant,
  getMyRestaurant,
  updateMyRestaurant,
  getMyRestaurantOrders,
  updateOrderStatus,
};
