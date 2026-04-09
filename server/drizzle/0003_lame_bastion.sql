ALTER TABLE "users" RENAME COLUMN "password" TO "password_hash";--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_email_unique";--> statement-breakpoint
ALTER TABLE "sessions" ALTER COLUMN "id" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "sessions" ALTER COLUMN "id" DROP IDENTITY;--> statement-breakpoint
ALTER TABLE "sessions" ALTER COLUMN "created_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "sessions" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "sessions" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "sessions" ADD COLUMN "secret_hash" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "sessions" ADD COLUMN "last_verified_at" timestamp with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
CREATE INDEX "sessions_user_id_idx" ON "sessions" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "users_email_unique" ON "users" USING btree (lower("email"));--> statement-breakpoint
ALTER TABLE "sessions" DROP COLUMN "is_valid";--> statement-breakpoint
ALTER TABLE "sessions" DROP COLUMN "expires_at";