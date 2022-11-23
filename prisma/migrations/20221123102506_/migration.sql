/*
  Warnings:

  - You are about to drop the column `historyId` on the `Entry` table. All the data in the column will be lost.
  - Added the required column `latestId` to the `Entry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `revision` to the `Entry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `source` to the `Entry` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Entry`
    DROP FOREIGN KEY `Entry_historyId_fkey`;

-- AlterTable
ALTER TABLE `Entry`
    DROP COLUMN `historyId`,
    ADD COLUMN `latestId` INTEGER      NOT NULL,
    ADD COLUMN `revision` VARCHAR(191) NOT NULL,
    ADD COLUMN `source`   TEXT         NOT NULL;

-- AddForeignKey
ALTER TABLE `Entry`
    ADD CONSTRAINT `Entry_latestId_fkey` FOREIGN KEY (`latestId`) REFERENCES `History` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
