"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postitemdetails_1 = __importDefault(require("./routes/postitemdetails"));
const saledetails_1 = __importDefault(require("./routes/saledetails"));
const saleitemdetails_1 = __importDefault(require("./routes/saleitemdetails"));
const registercustomer_1 = __importDefault(require("./routes/registercustomer"));
const purchasitem_1 = __importDefault(require("./routes/purchasitem"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/item", postitemdetails_1.default);
app.use("/sale", saledetails_1.default);
app.use("/saleitem", saleitemdetails_1.default);
app.use("/user", registercustomer_1.default);
app.use("/orderitem", purchasitem_1.default);
// cron.schedule("* * * * *", async function () {
//   await Makethesalelive();
//   console.log("the sale is live now ");
// });
app.listen(3000, function () {
    console.log(`server listening on port 3000`);
});
