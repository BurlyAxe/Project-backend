import Order from "../models/Order.js";

const getOrder = async (req, res, next) => {
    try {
        const orders = await Order.find().populate("user").populate("videogames.videogame").populate("address").populate("paymentMethod");
        res.json(orders);
    } catch (error) {
        next(error);
    }
};

const getOrderById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id).populate("user").populate("videogames.videogame").populate("address").populate("paymentMethod");

        if (!order) {
            return res.status(404).json({ message: "Orden ni encontrada" });
        };

        res.json(order);

    } catch (error) {
        next(error);
    }
};

const createOrder = async (req, res, next) => {
    try {
        const { user, videogames, address, paymentMethod, totalPrice, shippingCost } = req.body;
        const newOrder = await Order.create({ user, videogames, address, paymentMethod, totalPrice, shippingCost});
       
        await newOrder.populate("user");
        await newOrder.populate("videogames.videogame");

        res.status(201).json(newOrder);

    } catch (error) {
        next(error);
    }
};

const updateOrderStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status, paymentStatus } = req.body;

        const updated = await Order.findByIdAndUpdate(id, {status, paymentStatus}, {new: true});

        if (!updated) {
            return res.status(404).json({ message: "Orden no encontrada" });
        };

        res.json(updated);

    } catch (error) {
        next(error);
    }
};

export { getOrder, getOrderById, createOrder, updateOrderStatus };