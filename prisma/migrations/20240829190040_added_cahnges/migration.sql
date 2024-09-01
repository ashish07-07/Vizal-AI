/*
  Warnings:

  - You are about to drop the column `updatedat` on the `itemdetails` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "itemdetails" DROP COLUMN "updatedat";

-- CreateTable
CREATE TABLE "sale" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "starttime" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sale_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "itemsale" (
    "id" SERIAL NOT NULL,
    "saleid" INTEGER NOT NULL,
    "itemid" INTEGER NOT NULL,
    "stock" INTEGER NOT NULL,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "itemsale_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "itemsale" ADD CONSTRAINT "itemsale_saleid_fkey" FOREIGN KEY ("saleid") REFERENCES "sale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itemsale" ADD CONSTRAINT "itemsale_itemid_fkey" FOREIGN KEY ("itemid") REFERENCES "itemdetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
