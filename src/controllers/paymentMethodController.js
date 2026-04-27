import PaymentMethod from "../models/PaymentMethod.js";

const getPaymentMethod = async (req, res, next) => {
    try {
        const { user } = req.query;

        const payment = await PaymentMethod.find({ user }).select("-cvv");

        res.json(payment);
    } catch (error) {
        next(error);
    }
};

const getPaymentMethodById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const paymentId = await PaymentMethod.findOne({ _id: id, user }).select("-cvv");

        if (!paymentId) {
            return res.status(404).json({ message: "Metodo de pago no encontrado" });
        }

        res.status(200).json(paymentId);
    } catch (error) {
        next(error);
    }
};

const createPaymentMethod = async (req, res, next) => {
    try {
        const { user, type, cardNumber, cardHolder, cvv, expirationDate, isDefault } = req.body;

        if (!user || !type) {
            return res.status(400).json({ message: "El usuario y tipo son requeridos" });
        }

        if (type === "credit_card") {
            if (!cardNumber || !cardHolder || !cvv || !expirationDate) {
                return res.status(400).json({ message: "Datos de tarjeta incompletos" });
            }
        }

        if (isDefault) {
            await PaymentMethod.updateMany({ user }, { isDefault: false });
        }

        const newPayment = await PaymentMethod.create({
            user,
            type,
            cardNumber,
            cardHolder,
            cvv,
            expirationDate,
            isDefault
        });

        const paymentResponse = newPayment.toObject();
        delete paymentResponse.cvv;

        return res.status(201).json(paymentResponse);

    } catch (error) {
        next(error);
    }
};

const updatePaymentMethod = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { user, cardNumber, expirationDate, isDefault } = req.body;

        if (!user) {
            return res.status(400).json({ message: "User requerido" });
        }

        const updateFields = {};

        if (cardNumber) updateFields.cardNumber = cardNumber;
        if (expirationDate) updateFields.expirationDate = expirationDate;
        if (typeof isDefault === "boolean") updateFields.isDefault = isDefault;

        if (isDefault) {
            await PaymentMethod.updateMany({ user }, { isDefault: false });
        }

        const updatePayment = await PaymentMethod.findOneAndUpdate(
            { _id: id, user },
            updateFields,
            { new: true }
        ).select("-cvv");

        if (!updatePayment) {
            return res.status(404).json({ message: "Método de pago no encontrado" });
        }

        return res.status(200).json(updatePayment);

    } catch (error) {
        next(error);
    }
};

const deletePaymentMethod = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { user } = req.body;

        if (!user) {
            return res.status(400).json({ message: "User requerido" });
        }

        const deletePayment = await PaymentMethod.findOneAndDelete({
            _id: id,
            user
        });

        if (!deletePayment) {
            return res.status(404).json({ message: "Método de pago no encontrado" });
        }

        return res.status(204).send();

    } catch (error) {
        next(error);
    }
};

export {
    getPaymentMethod,
    getPaymentMethodById,
    createPaymentMethod,
    updatePaymentMethod,
    deletePaymentMethod
};