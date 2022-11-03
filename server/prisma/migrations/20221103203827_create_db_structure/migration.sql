/*
  Warnings:

  - You are about to drop the column `poolId` on the `Guess` table. All the data in the column will be lost.
  - Added the required column `firstTeamPoints` to the `Guess` table without a default value. This is not possible if the table is not empty.
  - Added the required column `secondTeamPoints` to the `Guess` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Guess" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "gameId" TEXT NOT NULL,
    "firstTeamPoints" INTEGER NOT NULL,
    "secondTeamPoints" INTEGER NOT NULL,
    "participantId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Guess_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Guess_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Guess" ("createdAt", "gameId", "id", "participantId") SELECT "createdAt", "gameId", "id", "participantId" FROM "Guess";
DROP TABLE "Guess";
ALTER TABLE "new_Guess" RENAME TO "Guess";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
