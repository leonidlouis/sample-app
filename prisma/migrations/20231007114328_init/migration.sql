-- CreateTable
CREATE TABLE "todo" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "isDone" BOOLEAN NOT NULL,

    CONSTRAINT "todo_pkey" PRIMARY KEY ("id")
);
