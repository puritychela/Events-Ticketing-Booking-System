CREATE TYPE "public"."access_level" AS ENUM('Free', 'VIP');--> statement-breakpoint
CREATE TYPE "public"."event_type" AS ENUM('Online', 'In-person');--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "event_type" "event_type";--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "access_level" "access_level";