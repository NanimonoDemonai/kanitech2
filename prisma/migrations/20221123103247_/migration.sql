-- DropForeignKey
ALTER TABLE `Entry`
    DROP FOREIGN KEY `Entry_latestId_fkey`;

-- AlterTable
ALTER TABLE `Entry`
    MODIFY `latestId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Entry`
    ADD CONSTRAINT `Entry_latestId_fkey` FOREIGN KEY (`latestId`) REFERENCES `History` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
