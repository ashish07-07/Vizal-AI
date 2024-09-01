import express from "express";
import router from "./routes/postitemdetails";
import salerouter from "./routes/saledetails";
import saleitemdetail from "./routes/saleitemdetails";
import cron from "node-cron";
import Makethesalelive from "./cronscheduler/schedulat";
import reguser from "./routes/registercustomer";
import redisClient from "./redisclient/stock";
import orderroute from "./routes/purchasitem";

const app = express();
app.use(express.json());

app.use("/item", router);
app.use("/sale", salerouter);
app.use("/saleitem", saleitemdetail);
app.use("/user", reguser);
app.use("/orderitem", orderroute);

cron.schedule("0 0 * * *", async function () {
  await Makethesalelive();
  console.log("the sale is live now ");
});

app.listen(3000, function () {
  console.log(`server listening on port 3000`);
});
