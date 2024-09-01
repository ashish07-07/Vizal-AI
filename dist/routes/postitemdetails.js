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
router.use(express_1.default.json());
router.post("/itemdetails", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const body = req.body;
            console.log(body);
            const userdetails = yield db_1.default.itemdetails.create({
                data: {
                    name: body.name,
                    description: body.description,
                    price: body.price,
                    stocknumber: body.stocknumber,
                    category: body.category,
                },
            });
            console.log("added the item details in the database ");
            res.status(201).json({
                body,
            });
        }
        catch (e) {
            console.error("some thing went wrong check karlena ");
            console.log(e);
        }
    });
});
exports.default = router;
