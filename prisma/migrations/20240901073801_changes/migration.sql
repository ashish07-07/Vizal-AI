-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "customerid" INTEGER NOT NULL,
    "saleid" INTEGER NOT NULL,
    "itemid" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "totalprice" INTEGER NOT NULL,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_customerid_fkey" FOREIGN KEY ("customerid") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_saleid_fkey" FOREIGN KEY ("saleid") REFERENCES "sale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_itemid_fkey" FOREIGN KEY ("itemid") REFERENCES "itemdetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
