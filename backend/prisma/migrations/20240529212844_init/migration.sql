/*
  Warnings:

  - Added the required column `start_time` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_employee_id_fkey";

-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "start_time" TIME NOT NULL,
ALTER COLUMN "start_date" SET DATA TYPE DATE,
ALTER COLUMN "state" SET DEFAULT 'PENDING',
ALTER COLUMN "created_at" DROP NOT NULL,
ALTER COLUMN "updated_at" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "EmployeeCompany"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
