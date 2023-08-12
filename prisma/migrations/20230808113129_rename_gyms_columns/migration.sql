/*
  Warnings:

  - You are about to drop the column `latitute` on the `gyms` table. All the data in the column will be lost.
  - You are about to drop the column `longitute` on the `gyms` table. All the data in the column will be lost.
  - Added the required column `latitude` to the `gyms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `gyms` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "gyms" DROP COLUMN "latitute",
DROP COLUMN "longitute",
ADD COLUMN     "latitude" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "longitude" DECIMAL(65,30) NOT NULL;