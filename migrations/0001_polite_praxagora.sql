DO $$ BEGIN
 CREATE TYPE "public"."category" AS ENUM('category1', 'category2');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."difficulty" AS ENUM('easy', 'medium', 'hard');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
