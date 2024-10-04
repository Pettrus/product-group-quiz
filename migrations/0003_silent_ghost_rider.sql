ALTER TABLE "users_table" ALTER COLUMN "points" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "users_table" ADD COLUMN "questionsAnswered" json;