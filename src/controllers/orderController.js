import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

const getOrder = async (req, res, next) => {
    try {
        const { userId } = req.query;

        let filter = {};
        if (userId) filter.user = userId;

        const orders = await Order.find(filter)
            .populate("user")
            .populate("videogames.videogame")
            .populate("address")
            .populate("paymentMethod");

        res.status(200).json(orders);
    } catch (error) {
        next(error);
    }
};

const getOrderById = async (req, res, next) => {
    try {
        const { orderId } = req.params;

        const order = await Order.findById(orderId)
            .populate("user")
            .populate("videogames.videogame")
            .populate("address")
            .populate("paymentMethod");

        if (!order) {
            return res.status(404).json({ message: "Orden no encontrada" });
        }

        res.status(200).json(order);

    } catch (error) {
        next(error);
    }
};

const createOrder = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { address, paymentMethod, shippingCost = 0 } = req.body;

        const cart = await Cart.findOne({ user: userId }).populate("videogames.videogame");

        if (!cart || cart.videogames.length === 0) {
            return res.status(400).json({ message: "El carrito está vacío" });
        }

        let totalPrice = 0;

        const orderItems = cart.videogames.map(item => {
            const price = item.videogame.price;

            totalPrice += price * item.quantity;

            return {
                videogame: item.videogame._id,
                quantity: item.quantity,
                price
            };
        });

        totalPrice += shippingCost;

        const newOrder = await Order.create({
            user: userId,
            address,
            paymentMethod,
            videogames: orderItems,
            shippingCost,
            totalPrice
        });

        await newOrder.populate("user");
        await newOrder.populate("videogames.videogame");
        await newOrder.populate("address");
        await newOrder.populate("paymentMethod");

        cart.videogames = [];
        await cart.save();

        res.status(201).json(newOrder);

    } catch (error) {
        next(error);
    }
};

const updateOrderStatus = async (req, res, next) => {
    try {
        const { orderId } = req.params;
        const { status, paymentStatus } = req.body;

        const updateFields = {};

        if (status) updateFields.status = status;
        if (paymentStatus) updateFields.paymentStatus = paymentStatus;

        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({ message: "No hay datos para actualizar" });
        }

        const updated = await Order.findByIdAndUpdate(
            orderId,
            updateFields,
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ message: "Orden no encontrada" });
        }

        res.status(200).json(updated);

    } catch (error) {
        next(error);
    }
};

export {
    getOrder,
    getOrderById,
    createOrder,
    updateOrderStatus
};