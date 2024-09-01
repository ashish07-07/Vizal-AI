"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cmiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function cmiddleware(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(403).json({ msg: "no token" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        next();
    }
    catch (e) {
        console.log(e);
    }
}
exports.cmiddleware = cmiddleware;
