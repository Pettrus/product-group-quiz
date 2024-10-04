CREATE TABLE IF NOT EXISTS "questions_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"question" text NOT NULL,
	"options" text NOT NULL,
	"answer" varchar(20) NOT NULL,
	"difficulty" "difficulty" NOT NULL,
	"category" "category"
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"points" integer NOT NULL
);
