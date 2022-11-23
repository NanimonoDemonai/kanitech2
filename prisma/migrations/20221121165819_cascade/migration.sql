-- DropForeignKey
ALTER TABLE `History`
    DROP FOREIGN KEY `History_entryId_fkey`;

-- AddForeignKey
ALTER TABLE `History`
    ADD CONSTRAINT `History_entryId_fkey` FOREIGN KEY (`entryId`) REFERENCES `Entry` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
