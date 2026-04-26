import express from "express";
import Address from "../models/Address.js";

const getAddress = async (req, res, next) => {
    try {
        const addresses = await Address.find();
        res.json(addresses);
    } catch (error) {
        next(error);
    };
};

const getAddressById = async (req, res, next) => {
    try {
        const { addressId } = req.params;
        const userId = req.user.userId;
        const address = await Address.findOne({ _id: addressId, user: userId });

        if(!address) {
            return res.status(404).json({ message: "Dirección no encontrada" });
        };

        res.status(200).json(address);
    } catch (error) {
        next(error);
    };
};

const createAddress = async (req, res, next) => {
    try {
        const { name, country, address, state, city, street, postalCode, phone, isDefault, addressType } = req.body;
        const user = req.user?.userId || req.params.id;

        if (!user) {
            return res.status(400).json({ message: "ID de usuario requerido" });
        };

        if(!country || !state || !city || !street || !postalCode || !addressType || !address || !phone) {
            return res.status(400).json({ message: "Todos los campos son requeridos" });
        };

        if (isDefault) {
            await Address.updateMany({ user }, { isDefault: false });
        };

        const newAddress = await Address.create({ user, name, address, street, city, state, postalCode, country: country || "Mexico", phone, isDefault, addressType });

        res.status(201).json(newAddress);

    } catch (error) {
        next(error);
    };
};

const updateAddress = async (req, res, next) => {
    try {
        const { addressId } = req.params;
        const { name, country, state, city, street, postalCode, phone, isDefault, addressType } = req.body;
        const user = req.user.userId;

        const deliveryAddress = await Address.findOne({ _id: addressId, user });

        if (!deliveryAddress) {
            return res.status(404).json({ message: "Direccion no encontrada"})
        };

        if (isDefault && !deliveryAddress.isDefault) {
            await Address.updateMany({ user }, { isDefault: false });
        };

        deliveryAddress.name = name; 
        deliveryAddress.country = country;
        deliveryAddress.state = state;
        deliveryAddress.city = city;
        deliveryAddress.street = street;
        deliveryAddress.postalCode = postalCode;
        deliveryAddress.phone = phone;
        deliveryAddress.isDefault = isDefault;
        deliveryAddress.addressType = addressType;

        await deliveryAddress.save();

        res.status(200).json(deliveryAddress);

    } catch (error) {
        next(error);
    };
};

const deleteAddress = async (req, res, next) => {
    try {
        const { addressId } = req.params;
        const userId = req.user.userId;

        const deletedAddress = await Address.findOne({ _id: addressId, user: userId });

        if(!deletedAddress) {
            return res.status(404).json({ message: "Dirección no encontrada" });    
        };

        await Address.findByIdAndDelete(addressId);

        res.status(200).json({ message: "Dirección eliminada exitosamente" });
    } catch (error) {
        next(error);
    };
};

export { getAddress, getAddressById, createAddress, updateAddress, deleteAddress };