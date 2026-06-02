-- CreateEnum
CREATE TYPE "ChargebackStatus" AS ENUM ('RECEIVED', 'EVIDENCE_NEEDED', 'EVIDENCE_SUBMITTED', 'WON', 'LOST');

-- AlterEnum
ALTER TYPE "OrderStatus" ADD VALUE 'DISPUTED';

-- CreateTable
CREATE TABLE "Chargeback" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "restaurantId" TEXT NOT NULL,
    "providerRef" TEXT NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "reason" TEXT,
    "status" "ChargebackStatus" NOT NULL DEFAULT 'RECEIVED',
    "evidence" JSONB,
    "dueDate" TIMESTAMP(3),
    "resolvedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Chargeback_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Chargeback_providerRef_key" ON "Chargeback"("providerRef");

-- CreateIndex
CREATE INDEX "Chargeback_restaurantId_status_idx" ON "Chargeback"("restaurantId", "status");

-- CreateIndex
CREATE INDEX "Chargeback_restaurantId_createdAt_idx" ON "Chargeback"("restaurantId", "createdAt");

-- AddForeignKey
ALTER TABLE "Chargeback" ADD CONSTRAINT "Chargeback_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
