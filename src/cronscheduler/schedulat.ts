import prisma from "../db";
import cron from "node-cron";

export default async function Makethesalelive() {
  try {
    console.log("I was called by cron and now will update the task");
    const update = await prisma.sale.update({
      where: {
        id: 1,
      },
      data: {
        status: "live",
      },
    });
    console.log("Sale status updated to live:", update);
  } catch (error) {
    console.error("Error updating sale status:", error);
  }
}

cron.schedule("0 0 * * *", async function () {
  try {
    // await Makethesalelive();
    console.log("hi bro");
    console.log("I have called this function");
  } catch (error) {
    console.error("Error in cron job:", error);
  }
});
