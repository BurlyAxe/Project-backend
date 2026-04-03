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
        const { name, country, state, city, street, postalCode, phone, isDefault, addressType } = req.body;
        const user = req.user.userId;

        if(!country || !state || !city || !street || !postalCode || !addressType) {
            return res.status(400).json({ message: "Todos los campos son requeridos" });
        };

        if (isDefault) {
            await Address.updateMany({ user }, { isDefault: false });
        };

        const newAddress = await Address.create({ user, name, address, city, state, postalCode, country: country || "Mexico", phone, isDefault, addressType });

        await newAddress.save();

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

        const deliveryAddress = await Address.findOne({ _id: addressId, user: userId });

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

        await deletedAddress.findByIdAndDelete(addressId);

        res.status(200).json({ message: "Dirección eliminada exitosamente" });
    } catch (error) {
        next(error);
    };
};

export { getAddress, getAddressById, createAddress, updateAddress, deleteAddress };