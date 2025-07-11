-- CreateTable
CREATE TABLE "Payment" (
    "id" SERIAL NOT NULL,
    "externalId" TEXT,
    "amount" DOUBLE PRECISION NOT NULL,
    "description" TEXT,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Payment_externalId_key" ON "Payment"("externalId");
