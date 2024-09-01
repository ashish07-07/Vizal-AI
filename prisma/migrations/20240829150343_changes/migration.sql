/*
  Warnings:

  - You are about to drop the column `stockno` on the `itemdetails` table. All the data in the column will be lost.
  - Added the required column `stocknumber` to the `itemdetails` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "itemdetails" DROP COLUMN "stockno",
ADD COLUMN     "stocknumber" INTEGER NOT NULL,
ALTER COLUMN "category" SET DATA TYPE TEXT;
