/*
  Warnings:

  - A unique constraint covering the columns `[saleid,itemid]` on the table `itemsale` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "itemsale_saleid_itemid_key" ON "itemsale"("saleid", "itemid");
