CREATE TABLE "ticket_replies" (
	"reply_id" serial PRIMARY KEY NOT NULL,
	"ticket_id" integer,
	"responder_id" integer,
	"message" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "profilepicture" varchar(255);--> statement-breakpoint
ALTER TABLE "ticket_replies" ADD CONSTRAINT "ticket_replies_ticket_id_support_tickets_ticket_id_fk" FOREIGN KEY ("ticket_id") REFERENCES "public"."support_tickets"("ticket_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ticket_replies" ADD CONSTRAINT "ticket_replies_responder_id_users_user_id_fk" FOREIGN KEY ("responder_id") REFERENCES "public"."users"("user_id") ON DELETE cascade ON UPDATE no action;