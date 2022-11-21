-- AlterTable
ALTER TABLE `Entry`
    MODIFY `revision` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `History`
    MODIFY `revision` VARCHAR(191) NOT NULL;
