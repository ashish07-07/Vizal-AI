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
const customermiddleware_1 = require("../middleware/customermiddleware");
const stock_1 = __importDefault(require("../redisclient/stock"));
const route = express_1.default.Router();
function handlepurchase(itemid, customerid, saleid, quantity, price, totalstock) {
    return __awaiter(this, void 0, void 0, function* () {
        const lockkey = `lock:item:${itemid}`;
        const queueKey = `queue:item:${itemid}`;
        const lock = yield stock_1.default.set(lockkey, customerid, {
            NX: true,
            EX: 5,
        });
        if (lock) {
            try {
                console.log("processing purchase ");
                const transactiondetails = yield db_1.default.transaction.create({
                    data: {
                        customerid: customerid,
                        saleid: saleid,
                        itemid: itemid,
                        quantity: quantity,
                        totalprice: price,
                    },
                });
                const updatedStock = totalstock - quantity;
                console.log("transaction completed successfully");
                yield stock_1.default.set("stocknumber", updatedStock);
                yield db_1.default.itemsale.update({
                    where: {
                        saleid_itemid: {
                            saleid: saleid,
                            itemid: itemid,
                        },
                    },
                    data: {
                        stock: updatedStock,
                    },
                });
            }
            catch (e) {
                console.error("Error processing purchase:", e);
            }
            finally {
                yield stock_1.default.del(lockkey);
                const nextcustomer = yield stock_1.default.lPop(queueKey);
                if (nextcustomer) {
                    const { customerid, saleid, itemid, quantity, totalprice, totalstock } = JSON.parse(nextcustomer);
                    yield handlepurchase(itemid, customerid, saleid, quantity, totalprice, totalstock);
                }
            }
        }
        else {
            console.log(`Item is currently being purchased. ${customerid} is in the queue.`);
        }
    });
}
route.post("/purchase", customermiddleware_1.cmiddleware, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = req.body;
        const saleid = body.saleid;
        const customerid = body.customerid;
        const quantity = body.quantity;
        const itemid = body.itemsaleid;
        const price = body.price;
        const maximumitem = 3;
        const stocksre = yield db_1.default.itemsale.findFirst({
            where: {
                saleid: saleid,
                itemid: itemid,
            },
        });
        const totalstock = stocksre === null || stocksre === void 0 ? void 0 : stocksre.stock;
        if (totalstock && totalstock < quantity) {
            return res.status(401).json({
                msg: "Not that many items are available to order",
            });
        }
        if (quantity > maximumitem) {
            return res.status(401).json({
                msg: `You can only order a maximum of ${maximumitem} to maintain fairness.`,
            });
        }
        const queueKey = `queue:item:${itemid}`;
        const customerRequest = JSON.stringify({
            customerid,
            saleid,
            itemid,
            quantity,
            totalprice: price,
            totalstock,
        });
        yield stock_1.default.rPush(queueKey, customerRequest);
        if (!totalstock) {
            return;
        }
        yield handlepurchase(itemid, customerid, saleid, quantity, price, totalstock);
        if (totalstock) {
            yield stock_1.default.set("stocknumber", totalstock);
        }
        res.status(200).json({ message: "Your request is being processed" });
    });
});
exports.default = route;
