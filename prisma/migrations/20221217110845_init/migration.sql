-- CreateTable
CREATE TABLE "gift" (
    "id" SERIAL NOT NULL,
    "expired" BOOLEAN DEFAULT false,
    "belongs_to_user" VARCHAR(30),
    "gift_count" INTEGER,
    "gift_id" INTEGER,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "gift_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "song" (
    "id" SERIAL NOT NULL,
    "belongs_to_user" VARCHAR(30),
    "title" VARCHAR(100),
    "sang" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "song_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "superchat" (
    "id" SERIAL NOT NULL,
    "belongs_to_user" VARCHAR(30),
    "avatar" VARCHAR(100),
    "total_price" DOUBLE PRECISION,
    "text" VARCHAR(100),
    "expired" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "superchat_pkey" PRIMARY KEY ("id")
);
