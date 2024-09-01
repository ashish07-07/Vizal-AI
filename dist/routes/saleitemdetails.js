"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("../db"));
const router = express_1.default.Router();
router.post("/saleitemdetails", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const saleitemdata = req.body;
        console.log(saleitemdata.stock);
        try {
            const itemdetails = yield db_1.default.itemdetails.findFirst({
                where: {
                    id: saleitemdata.itemid,
                },
            });
            if (!itemdetails) {
                return res.status(404).json({
                    message: "Item not found.",
                });
            }
            console.log(itemdetails);
            if (itemdetails.stocknumber <= 0) {
                return res.status(400).json({
                    message: "This item is out of stock.",
                });
            }
            if (itemdetails.stocknumber < saleitemdata.stock) {
                return res.status(400).json({
                    message: `Please enter a valid stock number as the total stock of that item is only ${itemdetails.stocknumber}.`,
                });
            }
            const response = yield db_1.default.itemsale.create({
                data: {
                    saleid: saleitemdata.saleid,
                    itemid: saleitemdata.itemid,
                    stock: saleitemdata.stock,
                },
            });
            console.log("Sale item added successfully");
            const updatedItem = yield db_1.default.itemdetails.update({
                where: {
                    id: saleitemdata.itemid,
                },
                data: {
                    stocknumber: itemdetails.stocknumber - saleitemdata.stock,
                },
            });
            return res.status(201).json({
                msg: response,
                updatedItem: updatedItem,
            });
        }
        catch (e) {
            console.log(e);
            return res.status(500).json({
                message: "An error occurred while processing the request.",
            });
        }
    });
});
exports.default = router;
