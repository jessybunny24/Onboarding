-- CreateTable
CREATE TABLE "AnomalyProgress" (
    "id" TEXT NOT NULL DEFAULT 'default-session',
    "isAnomalyActive" BOOLEAN NOT NULL DEFAULT false,
    "activeTicketIndex" INTEGER NOT NULL DEFAULT 0,
    "anomalyMode" BOOLEAN NOT NULL DEFAULT false,
    "playerHealth" INTEGER NOT NULL DEFAULT 100,
    "solvedStreak" INTEGER NOT NULL DEFAULT 0,
    "printerPulls" INTEGER NOT NULL DEFAULT 0,
    "cablesConnected" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "sliderValue" INTEGER NOT NULL DEFAULT 40,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AnomalyProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IncidentReport" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "incidentType" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "IncidentReport_pkey" PRIMARY KEY ("id")
);
