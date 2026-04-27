import PaymentMethod from "../models/PaymentMethod.js";

const getPaymentMethod = async (req, res, next) => {
    try {
        const { user } = req.query;

        let filter = {};
        if (user) {
            filter.user = user;
        }

        const payment = await PaymentMethod.find(filter).select("-cvv");

        res.json(payment);
    } catch (error) {
        next(error);
    }
};

const getPaymentMethodById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const payment = await PaymentMethod.findById(id).select("-cvv");

        if (!payment) {
            return res.status(404).json({ message: "Metodo de pago no encontrado" });
        }

        res.status(200).json(payment);

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

        console.log("CREATED:", newPayment);
        const paymentResponse = newPayment.toObject();
        delete paymentResponse.cvv;

        return res.status(201).json(paymentResponse);

    } catch (error) {
        console.error("Error creating payment method:", error);
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
        const { paymentIds } = req.body;

        if (!paymentIds || !Array.isArray(paymentIds) || paymentIds.length === 0) {
            return res.status(400).json({ message: "Se requiere un array de IDs" });
        }

        const deleted = await PaymentMethod.deleteMany({
            _id: { $in: paymentIds }
        });

        return res.status(200).json({
            message: "Métodos de pago eliminados",
            deletedCount: deleted.deletedCount
        });

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