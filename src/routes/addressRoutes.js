import express from "express";
import { getAddress, getAddressById, createAddress, updateAddress, deleteAddress } from "../controllers/addressController.js";
import { body, param } from "express-validator";
import authMiddleware from "../middlewares/authMiddleware.js";
import validate from "../middlewares/validation.js";
import isAdmin from "../middlewares/isAdminMiddleware.js";

const router = express.Router();

const userIdValidation = [
  param("id").isMongoId().withMessage("User ID must be a valid MongoDB ObjectId"),
];

const addressIdValidation = [
  param("addressId").isMongoId().withMessage("Address ID must be a valid MongoDB ObjectId"),
];

const createAddressValidation = [
  body("street").notEmpty().withMessage("Street is required"),
  body("city").notEmpty().withMessage("City is required"),
  body("postalCode")
    .isPostalCode("any")
    .withMessage("Postal code must be a valid postal code"),
];
const updateAddressValidation = [
  body("street").optional().notEmpty().withMessage("Street is required if provided"),
  body("city").optional().notEmpty().withMessage("City is required if provided"),
  body("zipcode")
    .optional()
    .isPostalCode("any")
    .withMessage("Zipcode must be a valid postal code if provided"),
];

router.get("/users/:id/address", getAddress);
router.get("/users/:id/address/:addressId", userIdValidation, addressIdValidation, validate, getAddressById);
router.post("/users/:id/address", userIdValidation, createAddressValidation, createAddress);
router.put("/users/:id/address/:addressId", userIdValidation, addressIdValidation, updateAddressValidation, validate, updateAddress);
router.delete("/users/:id/address/:addressId", userIdValidation, addressIdValidation, validate, deleteAddress);

export default router;