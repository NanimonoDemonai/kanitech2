/*
  Warnings:

  - You are about to drop the column `revision` on the `Entry` table. All the data in the column will be lost.
  - You are about to drop the column `source` on the `Entry` table. All the data in the column will be lost.
  - Added the required column `historyId` to the `Entry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Entry`
    DROP COLUMN `revision`,
    DROP COLUMN `source`,
    ADD COLUMN `historyId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Entry`
    ADD CONSTRAINT `Entry_historyId_fkey` FOREIGN KEY (`historyId`) REFERENCES `History` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
