import express from "express";
import { getAddress, getAddressById, createAddress, updateAddress, deleteAddress } from "../controllers/addressController.js";

const router = express.Router();

router.get("/", getAddress);
router.get("/:addressId", getAddressById);
router.post("/", createAddress);
router.put("/:addressId", updateAddress);
router.delete("/:addressId", deleteAddress);

export default router;