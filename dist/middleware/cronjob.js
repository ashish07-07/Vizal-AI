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
exports.Cronjobchecker = void 0;
const db_1 = __importDefault(require("../db"));
function Cronjobchecker(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = req.body;
        const saleid = body.saleid;
        const maximumitem = 3;
        const response = yield db_1.default.sale.findFirst({
            where: {
                id: saleid,
            },
        });
        if ((response === null || response === void 0 ? void 0 : response.status) === "live") {
            next();
        }
        else {
            return res.status(401).json({
                message: "the sale is not live currently",
            });
        }
    });
}
exports.Cronjobchecker = Cronjobchecker;
