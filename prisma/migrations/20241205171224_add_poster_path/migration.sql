/*
  Warnings:

  - You are about to drop the column `description` on the `movie` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `movie` DROP COLUMN `description`,
    ADD COLUMN `poster_path` TEXT NULL;
