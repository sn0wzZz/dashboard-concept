-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE SCHEMA "core";
--> statement-breakpoint
CREATE SCHEMA "contacts";
--> statement-breakpoint
CREATE SCHEMA "cms";
--> statement-breakpoint
CREATE SCHEMA "mail";
--> statement-breakpoint
CREATE SCHEMA "sitebuilder_v1";
--> statement-breakpoint
CREATE SCHEMA "relationships";
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "cms"."rows_field_appearance" AS ENUM('DATE_TIME', 'SINGLE_SELECT', 'MULTI_SELECT', 'CURRENCY', 'CHECKBOX', 'SWITCH', 'TEXT', 'TEXTAREA', 'NUMBER', 'SLUG', 'URL', 'JSON', 'CODE', 'EMAIL', 'PHONE');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "cms"."rows_field_type" AS ENUM('NUMBER', 'STRING', 'BOOLEAN', 'DATE');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "cms"."rows_validator_type" AS ENUM('MIN', 'MAX', 'MIN_LENGTH', 'MAX_LENGTH', 'REQUIRED', 'REGEX');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "cms"."rows_value_type" AS ENUM('VALUE', 'PREDEFINED_VALUE', 'DEFAULT_VALUE');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "contacts"."contacts_field_appearance" AS ENUM('DATE_TIME', 'SINGLE_SELECT', 'MULTI_SELECT', 'CURRENCY', 'CHECKBOX', 'SWITCH', 'TEXT', 'TEXTAREA', 'NUMBER', 'SLUG', 'URL', 'JSON', 'CODE', 'EMAIL', 'PHONE');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "contacts"."contacts_field_type" AS ENUM('NUMBER', 'STRING', 'BOOLEAN', 'DATE');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "contacts"."contacts_validator_type" AS ENUM('MIN', 'MAX', 'MIN_LENGTH', 'MAX_LENGTH', 'REQUIRED', 'REGEX');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "contacts"."contacts_value_type" AS ENUM('VALUE', 'PREDEFINED_VALUE', 'DEFAULT_VALUE');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "core"."billing_interval" AS ENUM('free', 'month', 'year', 'week');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "core"."plan_quota_type_enum" AS ENUM('OVERAGE', 'RESTRICT');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "core"."settings_value_type" AS ENUM('STRING', 'NUMBER', 'JSON', 'BOOLEAN', 'UUID');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "core"."stripe_event_staus_enum" AS ENUM('PROCESSING', 'PROCESSED', 'ERROR');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "core"."subscription_status_enum" AS ENUM('incomplete', 'incomplete_expired', 'trialing', 'active', 'past_due', 'canceled', 'unpaid', 'paused');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "core"."user_preffered_theme_enum" AS ENUM('dark', 'light', 'system');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "core"."view_level" AS ENUM('PERSONAL', 'WORKSPACE');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "core"."workspace_invite_status" AS ENUM('ACCEPTED', 'PENDING', 'REJECTED');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "core"."workspace_users_type" AS ENUM('MEMBER', 'TENANT');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."workspace_invite_status" AS ENUM('ACCEPTED', 'PENDING', 'REJECTED');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "sitebuilder_v1"."entity_type" AS ENUM('PAGE', 'COMPONENT');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "core"."user_profiles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"user_id" uuid NOT NULL,
	"email" varchar(255),
	"name" varchar(255),
	"image_url" varchar,
	"phone" varchar(20),
	"location" varchar(255),
	"job_title" varchar(255),
	"birthday" date,
	CONSTRAINT "user_profiles_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "core"."channels" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"created_by_id" uuid NOT NULL,
	"workspace_id" uuid NOT NULL,
	"name" varchar(50) NOT NULL,
	"color" varchar(50) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "core"."workspace_currencies" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"created_by_id" uuid NOT NULL,
	"workspace_id" uuid NOT NULL,
	"currency_id" uuid NOT NULL,
	"is_default" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "contacts"."contacts" (
	"folio" integer NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255),
	"phone" varchar(30),
	"type_id" uuid,
	"workspace_id" uuid NOT NULL,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "contacts"."contacts_types" (
	"name" varchar(255) NOT NULL,
	"workspace_id" uuid NOT NULL,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"description" varchar(255),
	"config" jsonb
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cms"."rows_types" (
	"slug" varchar(255) NOT NULL,
	"description" varchar(255),
	"space_id" uuid NOT NULL,
	"name" varchar(255) NOT NULL,
	"config" jsonb,
	"workspace_id" uuid NOT NULL,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cms"."spaces" (
	"workspace_id" uuid NOT NULL,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"name" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"description" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cms"."rows_validators" (
	"field_id" uuid NOT NULL,
	"type" "cms"."rows_validator_type" NOT NULL,
	"value" varchar(1024) NOT NULL,
	"message" varchar(255),
	"workspace_id" uuid NOT NULL,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cms"."rows_values" (
	"field_id" uuid NOT NULL,
	"row_id" uuid,
	"value" text,
	"type" "cms"."rows_value_type" DEFAULT 'VALUE' NOT NULL,
	"index" integer DEFAULT 0 NOT NULL,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "contacts"."tag_to_contact" (
	"contact_id" uuid,
	"tag_id" uuid,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "contacts"."tag_to_contact_type" (
	"field_id" uuid,
	"type_id" uuid,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "unique_tag_to_field" UNIQUE("field_id","type_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "contacts"."contacts_validators" (
	"field_id" uuid NOT NULL,
	"type" "contacts"."contacts_validator_type" NOT NULL,
	"value" varchar(1024) NOT NULL,
	"message" varchar(255),
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"workspace_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cms"."rows_fields" (
	"name" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"description" varchar(255),
	"label" varchar(255),
	"help" varchar(255),
	"data_type" "cms"."rows_field_type" DEFAULT 'STRING' NOT NULL,
	"appearance" "cms"."rows_field_appearance" DEFAULT 'TEXT' NOT NULL,
	"is_multi_value" boolean DEFAULT false NOT NULL,
	"placeholder" varchar(255),
	"metadata" jsonb,
	"workspace_id" uuid NOT NULL,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"type_id" uuid NOT NULL,
	"index" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "contacts"."contacts_fields" (
	"name" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"description" varchar(255),
	"label" varchar(255),
	"help" varchar(255),
	"data_type" "contacts"."contacts_field_type" DEFAULT 'STRING' NOT NULL,
	"workspace_id" uuid NOT NULL,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"appearance" "contacts"."contacts_field_appearance" DEFAULT 'TEXT' NOT NULL,
	"is_multi_value" boolean DEFAULT false NOT NULL,
	"metadata" jsonb,
	"placeholder" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cms"."rows" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"workspace_id" uuid NOT NULL,
	"published_at" timestamp with time zone,
	"deleted_at" timestamp with time zone,
	"type_id" uuid,
	"folio" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "contacts"."contacts_values" (
	"field_id" uuid NOT NULL,
	"row_id" uuid,
	"value" text,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"type" "contacts"."contacts_value_type" DEFAULT 'VALUE' NOT NULL,
	"index" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "mail"."mailboxes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"created_by_id" uuid NOT NULL,
	"workspace_id" uuid NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"enabled" boolean DEFAULT true NOT NULL,
	"password" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "core"."quota_types" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"name" varchar(100) NOT NULL,
	"unit" varchar(50) NOT NULL,
	"description" text,
	"slug" varchar(100) NOT NULL,
	CONSTRAINT "quota_types_name_unique" UNIQUE("name"),
	CONSTRAINT "quota_types_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "core"."roles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" varchar(255),
	"workspace_id" uuid NOT NULL,
	"is_administrator" boolean NOT NULL,
	"default_json_config_key" varchar,
	"can_delete" boolean DEFAULT true NOT NULL,
	"type" "core"."workspace_users_type" DEFAULT 'MEMBER' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "core"."plan_quotas" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"plan_id" uuid NOT NULL,
	"quota_type_id" uuid NOT NULL,
	"max_value" integer NOT NULL,
	"type" "core"."plan_quota_type_enum" DEFAULT 'RESTRICT' NOT NULL,
	"does_reset" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "core"."quota_usage" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"workspace_id" uuid NOT NULL,
	"quota_type_id" uuid,
	"used_value" integer DEFAULT 0 NOT NULL,
	"overage_value" integer DEFAULT 0 NOT NULL,
	"period_start" timestamp with time zone NOT NULL,
	"period_end" timestamp with time zone NOT NULL,
	"last_reported" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "core"."plan_prices" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"plan_id" uuid NOT NULL,
	"billing_interval" "core"."billing_interval" NOT NULL,
	"currency_id" uuid NOT NULL,
	"amount" integer NOT NULL,
	"stripe_price_id" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "core"."subscriptions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"workspace_id" uuid,
	"stripe_customer_id" varchar(255),
	"status" "core"."subscription_status_enum" DEFAULT 'incomplete' NOT NULL,
	"plan_id" uuid NOT NULL,
	"plan_started_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"plan_expired_at" timestamp with time zone NOT NULL,
	"bulling_interval" "core"."billing_interval" NOT NULL,
	"billing_cycle_anchor" timestamp with time zone,
	"stripe_subscription_id" varchar(255),
	"trialStart" timestamp with time zone,
	"trialEnd" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "core"."stripe_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"stripe_event_id" varchar(255),
	"type" varchar(255) NOT NULL,
	"data" jsonb NOT NULL,
	"status" "core"."stripe_event_staus_enum" DEFAULT 'PROCESSING' NOT NULL,
	"error" jsonb
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "core"."currencies" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"code" varchar(3) NOT NULL,
	"number" varchar(3) NOT NULL,
	"decimalDigits" integer NOT NULL,
	"name" varchar(100) NOT NULL,
	"keywords" varchar(1024)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "core"."payments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"workspace_id" uuid,
	"stripe_payment_intent_id" varchar(255) NOT NULL,
	"amount" integer NOT NULL,
	"currency_id" uuid,
	"status" varchar NOT NULL,
	"description" text,
	CONSTRAINT "payments_stripe_payment_intent_id_unique" UNIQUE("stripe_payment_intent_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "core"."quota_type_prices" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"quota_type_id" uuid NOT NULL,
	"currency_id" uuid NOT NULL,
	"amount" integer NOT NULL,
	"stripe_price_id" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "core"."settings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"workspace_id" uuid,
	"key" varchar(255) NOT NULL,
	"value" varchar,
	"type" "core"."settings_value_type" NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "core"."plans" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" text,
	"stripe_product_id" varchar(255),
	"enabled" boolean DEFAULT false,
	"is_default" boolean DEFAULT false NOT NULL,
	"order" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "core"."views" (
	"workspace_id" uuid NOT NULL,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"created_by_id" uuid,
	"level" "core"."view_level" DEFAULT 'PERSONAL' NOT NULL,
	"key" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"config" jsonb NOT NULL,
	"slug" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "core"."users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"email" varchar(255) NOT NULL,
	"emailVerified" timestamp,
	"phone" text,
	"preferred_locale" varchar(5) DEFAULT 'bg_BG' NOT NULL,
	"stripe_customer_id" varchar(255),
	"preferred_theme" "core"."user_preffered_theme_enum" DEFAULT 'system' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "core"."permissions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"role_id" uuid,
	"key" varchar(512) NOT NULL,
	"enabled" boolean DEFAULT false NOT NULL,
	"type" varchar DEFAULT ''
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "core"."users_roles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"workspace_id" uuid NOT NULL,
	"user_id" uuid,
	"role_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "core"."workspace_invites" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"expired_at" timestamp with time zone NOT NULL,
	"user_action_at" timestamp with time zone,
	"type" "core"."workspace_users_type" NOT NULL,
	"email" varchar(255),
	"user_id" uuid,
	"workspace_id" uuid NOT NULL,
	"status" "core"."workspace_invite_status" DEFAULT 'PENDING' NOT NULL,
	"role_id" uuid NOT NULL,
	"metadata" jsonb
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "contacts"."tags" (
	"name" varchar(255) NOT NULL,
	"color_hex" varchar(7) DEFAULT '#000000',
	"workspace_id" uuid NOT NULL,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "core"."workspaces" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"name" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"owner_id" uuid NOT NULL,
	"plan_id" uuid,
	"region_id" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "core"."workspaces_apps" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"app_slug" varchar(255) NOT NULL,
	"workspace_id" uuid NOT NULL,
	"disabled_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "core"."default_views" (
	"workspace_id" uuid NOT NULL,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"view_id" uuid,
	"key" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "core"."regions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"name" varchar(255) NOT NULL,
	"code" varchar(50) DEFAULT 'fra1' NOT NULL,
	"flag" varchar(50) DEFAULT 'DE' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "core"."api_keys" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"name" varchar(255) NOT NULL,
	"created_by_id" uuid NOT NULL,
	"enabled" boolean DEFAULT true NOT NULL,
	"workspace_id" uuid NOT NULL,
	"role_id" uuid,
	"value" varchar(512) NOT NULL,
	"valid_until_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "core"."workspaces_users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"user_id" uuid NOT NULL,
	"workspace_id" uuid NOT NULL,
	"type" "core"."workspace_users_type" NOT NULL,
	"given_name" varchar(255),
	"job_position" varchar(255),
	"organization" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "core"."recently_used_apps" (
	"workspace_id" uuid NOT NULL,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"created_by_id" uuid,
	"app_slug" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sitebuilder_v1"."apis" (
	"workspace_id" uuid NOT NULL,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"created_by_id" uuid,
	"entity_id" uuid NOT NULL,
	"name" varchar(255) NOT NULL,
	"method" varchar NOT NULL,
	"url" varchar,
	"headers" jsonb,
	"body" jsonb
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sitebuilder_v1"."variables" (
	"workspace_id" uuid NOT NULL,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"created_by_id" uuid,
	"entity_id" uuid NOT NULL,
	"name" varchar(255) NOT NULL,
	"initial_value" varchar(255) DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sitebuilder_v1"."entities" (
	"workspace_id" uuid NOT NULL,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"created_by_id" uuid,
	"name" varchar(255) NOT NULL,
	"description" varchar(255),
	"slug" varchar(1024) NOT NULL,
	"project_id" uuid NOT NULL,
	"data" jsonb NOT NULL,
	"type" "sitebuilder_v1"."entity_type" DEFAULT 'PAGE' NOT NULL,
	"css" text DEFAULT '' NOT NULL,
	"metadata" jsonb DEFAULT '{}'::jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sitebuilder_v1"."projects" (
	"workspace_id" uuid NOT NULL,
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"created_by_id" uuid,
	"name" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"metadata" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"css" text DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "core"."notifications_settings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"app_slug" varchar(255) NOT NULL,
	"workspace_id" uuid NOT NULL,
	"email" boolean DEFAULT true NOT NULL,
	"key" varchar(255) NOT NULL,
	"user_id" uuid NOT NULL,
	"in_app" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "core"."bank_accounts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"created_by_id" uuid NOT NULL,
	"workspace_id" uuid NOT NULL,
	"name" varchar(50) NOT NULL,
	"description" varchar(255),
	"bank_name" varchar(255) NOT NULL,
	"iban" varchar(255) NOT NULL,
	"bic" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "relationships"."avatar_to_user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"file_id" uuid NOT NULL,
	"user_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "relationships"."image_to_workspace" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"workspace_id" uuid NOT NULL,
	"file_id" uuid NOT NULL,
	"type" varchar(50) NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "core"."user_profiles" ADD CONSTRAINT "user_profiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "core"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "core"."channels" ADD CONSTRAINT "channels_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "core"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "core"."channels" ADD CONSTRAINT "channels_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "core"."workspaces"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "core"."workspace_currencies" ADD CONSTRAINT "workspace_currencies_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "core"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "core"."workspace_currencies" ADD CONSTRAINT "workspace_currencies_currency_id_currencies_id_fk" FOREIGN KEY ("currency_id") REFERENCES "core"."currencies"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "core"."workspace_currencies" ADD CONSTRAINT "workspace_currencies_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "core"."workspaces"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "contacts"."contacts" ADD CONSTRAINT "contacts_type_id_contacts_types_id_fk" FOREIGN KEY ("type_id") REFERENCES "contacts"."contacts_types"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "contacts"."contacts" ADD CONSTRAINT "contacts_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "core"."workspaces"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "contacts"."contacts_types" ADD CONSTRAINT "contacts_types_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "core"."workspaces"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cms"."rows_types" ADD CONSTRAINT "rows_types_space_id_spaces_id_fk" FOREIGN KEY ("space_id") REFERENCES "cms"."spaces"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cms"."rows_types" ADD CONSTRAINT "rows_types_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "core"."workspaces"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cms"."spaces" ADD CONSTRAINT "spaces_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "core"."workspaces"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cms"."rows_validators" ADD CONSTRAINT "rows_validators_field_id_rows_fields_id_fk" FOREIGN KEY ("field_id") REFERENCES "cms"."rows_fields"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cms"."rows_validators" ADD CONSTRAINT "rows_validators_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "core"."workspaces"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cms"."rows_values" ADD CONSTRAINT "rows_values_field_id_rows_fields_id_fk" FOREIGN KEY ("field_id") REFERENCES "cms"."rows_fields"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cms"."rows_values" ADD CONSTRAINT "rows_values_row_id_rows_id_fk" FOREIGN KEY ("row_id") REFERENCES "cms"."rows"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "contacts"."tag_to_contact" ADD CONSTRAINT "tag_to_contact_contact_id_contacts_id_fk" FOREIGN KEY ("contact_id") REFERENCES "contacts"."contacts"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "contacts"."tag_to_contact" ADD CONSTRAINT "tag_to_contact_tag_id_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "contacts"."tags"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "contacts"."tag_to_contact_type" ADD CONSTRAINT "tag_to_contact_type_field_id_contacts_fields_id_fk" FOREIGN KEY ("field_id") REFERENCES "contacts"."contacts_fields"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "contacts"."tag_to_contact_type" ADD CONSTRAINT "tag_to_contact_type_type_id_contacts_types_id_fk" FOREIGN KEY ("type_id") REFERENCES "contacts"."contacts_types"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "contacts"."contacts_validators" ADD CONSTRAINT "contacts_validators_field_id_contacts_fields_id_fk" FOREIGN KEY ("field_id") REFERENCES "contacts"."contacts_fields"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "contacts"."contacts_validators" ADD CONSTRAINT "contacts_validators_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "core"."workspaces"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cms"."rows_fields" ADD CONSTRAINT "rows_fields_type_id_rows_types_id_fk" FOREIGN KEY ("type_id") REFERENCES "cms"."rows_types"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cms"."rows_fields" ADD CONSTRAINT "rows_fields_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "core"."workspaces"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "contacts"."contacts_fields" ADD CONSTRAINT "contacts_fields_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "core"."workspaces"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cms"."rows" ADD CONSTRAINT "rows_type_id_rows_types_id_fk" FOREIGN KEY ("type_id") REFERENCES "cms"."rows_types"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cms"."rows" ADD CONSTRAINT "rows_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "core"."workspaces"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "contacts"."contacts_values" ADD CONSTRAINT "contacts_values_field_id_contacts_fields_id_fk" FOREIGN KEY ("field_id") REFERENCES "contacts"."contacts_fields"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "contacts"."contacts_values" ADD CONSTRAINT "contacts_values_row_id_contacts_id_fk" FOREIGN KEY ("row_id") REFERENCES "contacts"."contacts"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "mail"."mailboxes" ADD CONSTRAINT "mailboxes_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "core"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "mail"."mailboxes" ADD CONSTRAINT "mailboxes_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "core"."workspaces"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "core"."roles" ADD CONSTRAINT "roles_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "core"."workspaces"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "core"."plan_quotas" ADD CONSTRAINT "plan_quotas_plan_id_plans_id_fk" FOREIGN KEY ("plan_id") REFERENCES "core"."plans"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "core"."plan_quotas" ADD CONSTRAINT "plan_quotas_quota_type_id_quota_types_id_fk" FOREIGN KEY ("quota_type_id") REFERENCES "core"."quota_types"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "core"."quota_usage" ADD CONSTRAINT "quota_usage_quota_type_id_quota_types_id_fk" FOREIGN KEY ("quota_type_id") REFERENCES "core"."quota_types"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "core"."quota_usage" ADD CONSTRAINT "quota_usage_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "core"."workspaces"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "core"."plan_prices" ADD CONSTRAINT "plan_prices_currency_id_currencies_id_fk" FOREIGN KEY ("currency_id") REFERENCES "core"."currencies"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "core"."plan_prices" ADD CONSTRAINT "plan_prices_plan_id_plans_id_fk" FOREIGN KEY ("plan_id") REFERENCES "core"."plans"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "core"."subscriptions" ADD CONSTRAINT "subscriptions_plan_id_plans_id_fk" FOREIGN KEY ("plan_id") REFERENCES "core"."plans"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "core"."subscriptions" ADD CONSTRAINT "subscriptions_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "core"."workspaces"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "core"."payments" ADD CONSTRAINT "payments_currency_id_currencies_id_fk" FOREIGN KEY ("currency_id") REFERENCES "core"."currencies"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "core"."payments" ADD CONSTRAINT "payments_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "core"."workspaces"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "core"."quota_type_prices" ADD CONSTRAINT "quota_type_prices_currency_id_currencies_id_fk" FOREIGN KEY ("currency_id") REFERENCES "core"."currencies"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "core"."quota_type_prices" ADD CONSTRAINT "quota_type_prices_quota_type_id_quota_types_id_fk" FOREIGN KEY ("quota_type_id") REFERENCES "core"."quota_types"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "core"."settings" ADD CONSTRAINT "settings_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "core"."workspaces"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "core"."views" ADD CONSTRAINT "views_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "core"."users"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "core"."views" ADD CONSTRAINT "views_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "core"."workspaces"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "core"."permissions" ADD CONSTRAINT "permissions_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "core"."roles"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "core"."users_roles" ADD CONSTRAINT "users_roles_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "core"."roles"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "core"."users_roles" ADD CONSTRAINT "users_roles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "core"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "core"."users_roles" ADD CONSTRAINT "users_roles_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "core"."workspaces"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "core"."workspace_invites" ADD CONSTRAINT "workspace_invites_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "core"."roles"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "core"."workspace_invites" ADD CONSTRAINT "workspace_invites_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "core"."users"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "core"."workspace_invites" ADD CONSTRAINT "workspace_invites_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "core"."workspaces"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "contacts"."tags" ADD CONSTRAINT "tags_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "core"."workspaces"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "core"."workspaces" ADD CONSTRAINT "workspaces_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "core"."users"("id") ON DELETE restrict ON UPDATE restrict;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "core"."workspaces" ADD CONSTRAINT "workspaces_plan_id_plans_id_fk" FOREIGN KEY ("plan_id") REFERENCES "core"."plans"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "core"."workspaces" ADD CONSTRAINT "workspaces_region_id_regions_id_fk" FOREIGN KEY ("region_id") REFERENCES "core"."regions"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "core"."workspaces_apps" ADD CONSTRAINT "workspaces_apps_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "core"."workspaces"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "core"."default_views" ADD CONSTRAINT "default_views_view_id_views_id_fk" FOREIGN KEY ("view_id") REFERENCES "core"."views"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "core"."default_views" ADD CONSTRAINT "default_views_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "core"."workspaces"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "core"."api_keys" ADD CONSTRAINT "api_keys_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "core"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "core"."api_keys" ADD CONSTRAINT "api_keys_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "core"."roles"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "core"."api_keys" ADD CONSTRAINT "api_keys_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "core"."workspaces"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "core"."workspaces_users" ADD CONSTRAINT "workspaces_users_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "core"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "core"."workspaces_users" ADD CONSTRAINT "workspaces_users_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "core"."workspaces"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "core"."recently_used_apps" ADD CONSTRAINT "recently_used_apps_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "core"."users"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "core"."recently_used_apps" ADD CONSTRAINT "recently_used_apps_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "core"."workspaces"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sitebuilder_v1"."apis" ADD CONSTRAINT "apis_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "core"."users"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sitebuilder_v1"."apis" ADD CONSTRAINT "apis_entity_id_entities_id_fk" FOREIGN KEY ("entity_id") REFERENCES "sitebuilder_v1"."entities"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sitebuilder_v1"."apis" ADD CONSTRAINT "apis_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "core"."workspaces"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sitebuilder_v1"."variables" ADD CONSTRAINT "variables_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "core"."users"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sitebuilder_v1"."variables" ADD CONSTRAINT "variables_entity_id_entities_id_fk" FOREIGN KEY ("entity_id") REFERENCES "sitebuilder_v1"."entities"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sitebuilder_v1"."variables" ADD CONSTRAINT "variables_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "core"."workspaces"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sitebuilder_v1"."entities" ADD CONSTRAINT "entities_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "core"."users"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sitebuilder_v1"."entities" ADD CONSTRAINT "entities_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "sitebuilder_v1"."projects"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sitebuilder_v1"."entities" ADD CONSTRAINT "entities_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "core"."workspaces"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sitebuilder_v1"."projects" ADD CONSTRAINT "projects_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "core"."users"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sitebuilder_v1"."projects" ADD CONSTRAINT "projects_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "core"."workspaces"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "core"."notifications_settings" ADD CONSTRAINT "notifications_settings_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "core"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "core"."notifications_settings" ADD CONSTRAINT "notifications_settings_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "core"."workspaces"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "core"."bank_accounts" ADD CONSTRAINT "bank_accounts_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "core"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "core"."bank_accounts" ADD CONSTRAINT "bank_accounts_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "core"."workspaces"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "relationships"."avatar_to_user" ADD CONSTRAINT "avatar_to_user_file_id_files_id_fk" FOREIGN KEY ("file_id") REFERENCES "media"."files"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "relationships"."avatar_to_user" ADD CONSTRAINT "avatar_to_user_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "core"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "relationships"."image_to_workspace" ADD CONSTRAINT "image_to_workspace_file_id_files_id_fk" FOREIGN KEY ("file_id") REFERENCES "media"."files"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "relationships"."image_to_workspace" ADD CONSTRAINT "image_to_workspace_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "core"."workspaces"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_id_idx" ON "core"."user_profiles" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_workspace_currency" ON "core"."workspace_currencies" USING btree ("workspace_id","currency_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_folio" ON "contacts"."contacts" USING btree ("workspace_id","folio");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_type" ON "contacts"."contacts_types" USING btree ("workspace_id","name");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_type" ON "cms"."rows_types" USING btree ("workspace_id","name");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_type_name" ON "cms"."rows_types" USING btree ("workspace_id","name","space_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_type_slug" ON "cms"."rows_types" USING btree ("workspace_id","slug","space_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_space_slug" ON "cms"."spaces" USING btree ("slug","workspace_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_value_per_row" ON "cms"."rows_values" USING btree ("field_id","row_id","index");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "uniqe_tag_to_contact" ON "contacts"."tag_to_contact" USING btree ("contact_id","tag_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_row_folio" ON "cms"."rows" USING btree ("folio","workspace_id","type_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_value_per_row" ON "contacts"."contacts_values" USING btree ("field_id","row_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_mail_box" ON "mail"."mailboxes" USING btree ("workspace_id","name");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_mailbox_email" ON "mail"."mailboxes" USING btree ("email");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_slug" ON "core"."quota_types" USING btree ("slug");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_usage" ON "core"."quota_usage" USING btree ("workspace_id","quota_type_id","period_start","period_end");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "stripe_price_id" ON "core"."plan_prices" USING btree ("stripe_price_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "uniqe_plan" ON "core"."plan_prices" USING btree ("plan_id","billing_interval","currency_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_by_ws" ON "core"."subscriptions" USING btree ("workspace_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "event_id" ON "core"."stripe_events" USING btree ("stripe_event_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_code" ON "core"."currencies" USING btree ("code");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_key" ON "core"."settings" USING btree ("workspace_id","key");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_plan" ON "core"."plans" USING btree ("stripe_product_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "key_index" ON "core"."views" USING btree ("key");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_slug_index" ON "core"."views" USING btree ("workspace_id","key","slug");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_perms_per_role" ON "core"."permissions" USING btree ("role_id","key");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "role_index" ON "core"."users_roles" USING btree ("workspace_id","user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "email_index" ON "core"."workspace_invites" USING btree ("email");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_name" ON "contacts"."tags" USING btree ("workspace_id","name");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "slug_idx" ON "core"."workspaces" USING btree ("slug");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "workspaces_apps_app_slug_workspace_id_index" ON "core"."workspaces_apps" USING btree ("app_slug","workspace_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_default_view" ON "core"."default_views" USING btree ("workspace_id","key");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_api_key" ON "core"."api_keys" USING btree ("workspace_id","name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "value_index" ON "core"."api_keys" USING btree ("value");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_user_idx" ON "core"."workspaces_users" USING btree ("user_id","workspace_id","type");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_en_api" ON "sitebuilder_v1"."apis" USING btree ("entity_id","name");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_en_var" ON "sitebuilder_v1"."variables" USING btree ("entity_id","name");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_entity_slug" ON "sitebuilder_v1"."entities" USING btree ("slug","project_id","type");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_pr_name_ws" ON "sitebuilder_v1"."projects" USING btree ("name","workspace_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_pr_slug_ws" ON "sitebuilder_v1"."projects" USING btree ("slug","workspace_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_bank_account" ON "core"."bank_accounts" USING btree ("workspace_id","name");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_avatar_to_user" ON "relationships"."avatar_to_user" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_workspace_type" ON "relationships"."avatar_to_user" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_image_to_workspace_type" ON "relationships"."image_to_workspace" USING btree ("workspace_id","type");
*/