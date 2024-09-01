"use strict";
// import prisma from "../db";
// import cron from "node-cron";
// export async function Makethesalelive() {
//   console.log("i was called by cron and now will update the task");
//   const update = await prisma.sale.update({
//     where: {
//       id: 1,
//     },
//     data: {
//       status: "live",
//     },
//   });
// }
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
// cron.schedule("* * * * *", async function () {
//   await Makethesalelive();
//   console.log("I have called this function");
// });
const db_1 = __importDefault(require("../db"));
const node_cron_1 = __importDefault(require("node-cron"));
function Makethesalelive() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("I was called by cron and now will update the task");
            const update = yield db_1.default.sale.update({
                where: {
                    id: 1,
                },
                data: {
                    status: "live",
                },
            });
            console.log("Sale status updated to live:", update);
        }
        catch (error) {
            console.error("Error updating sale status:", error);
        }
    });
}
exports.default = Makethesalelive;
node_cron_1.default.schedule("0 0 * * *", function () {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // await Makethesalelive();
            console.log("hi bro");
            console.log("I have called this function");
        }
        catch (error) {
            console.error("Error in cron job:", error);
        }
    });
});
