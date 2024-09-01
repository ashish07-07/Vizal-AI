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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = __importDefault(require("../db"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const route = express_1.default.Router();
route.post("/register", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const body = req.body;
            const existingUser = yield db_1.default.user.findFirst({
                where: {
                    email: body.email,
                },
            });
            if (existingUser) {
                return res.status(409).json({
                    msg: "User already exists.",
                });
            }
            const hashedPassword = yield bcrypt_1.default.hash(body.password, 10);
            const customer = yield db_1.default.user.create({
                data: {
                    name: body.name,
                    email: body.email,
                    password: hashedPassword,
                },
            });
            const token = jsonwebtoken_1.default.sign({ email: customer.email }, process.env.JWT_SECRET);
            console.log("User created successfully");
            res.status(201).json({
                token,
            });
        }
        catch (e) {
            console.log(e);
            res.status(500).json({
                msg: "Internal server error.",
            });
        }
    });
});
exports.default = route;
