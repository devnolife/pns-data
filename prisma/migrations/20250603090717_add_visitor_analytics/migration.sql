-- CreateTable
CREATE TABLE "visitor_analytics" (
    "id" TEXT NOT NULL,
    "ip_address" TEXT,
    "user_agent" TEXT,
    "page_path" TEXT NOT NULL,
    "page_title" TEXT,
    "referrer" TEXT,
    "session_id" TEXT,
    "user_id" TEXT,
    "visit_duration" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "visitor_analytics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "visitor_analytics_created_at_idx" ON "visitor_analytics"("created_at");

-- CreateIndex
CREATE INDEX "visitor_analytics_page_path_idx" ON "visitor_analytics"("page_path");

-- CreateIndex
CREATE INDEX "visitor_analytics_session_id_idx" ON "visitor_analytics"("session_id");

-- AddForeignKey
ALTER TABLE "visitor_analytics" ADD CONSTRAINT "visitor_analytics_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
