create table "public"."accounts" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "deleted_at" timestamp with time zone,
    "provider" text not null,
    "provider_id" text not null,
    "access_token" text not null,
    "refresh_token" text not null,
    "email" text not null,
    "photo" text
);


alter table "public"."accounts" enable row level security;

create table "public"."profiles" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "deleted_at" timestamp with time zone,
    "name" text,
    "photo" text,
    "email" text not null,
    "desc" text,
    "public_id" text not null
);


alter table "public"."profiles" enable row level security;

create table "public"."questions" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "deleted_at" timestamp with time zone,
    "public_id" text not null,
    "content" jsonb not null default '{"type": "init"}'::jsonb,
    "creator" bigint not null
);


alter table "public"."questions" enable row level security;

create table "public"."tags" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "deleted_at" timestamp with time zone,
    "public_id" text not null,
    "creator" bigint not null,
    "name" text,
    "desc" text
);


alter table "public"."tags" enable row level security;

create table "public"."tags_questions_relation" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "deleted_at" timestamp with time zone,
    "tag" bigint not null,
    "q" bigint not null
);


alter table "public"."tags_questions_relation" enable row level security;

create table "public"."template" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "deleted_at" timestamp with time zone,
    "public_id" text not null
);


alter table "public"."template" enable row level security;

CREATE UNIQUE INDEX accounts_pkey ON public.accounts USING btree (id);

CREATE UNIQUE INDEX profiles_id_key ON public.accounts USING btree (id);

CREATE UNIQUE INDEX profiles_id_key1 ON public.profiles USING btree (id);

CREATE UNIQUE INDEX profiles_pkey ON public.profiles USING btree (id, public_id);

CREATE UNIQUE INDEX questions_id_key ON public.questions USING btree (id);

CREATE UNIQUE INDEX questions_pkey ON public.questions USING btree (id, public_id);

CREATE UNIQUE INDEX questions_public_id_key ON public.questions USING btree (public_id);

CREATE UNIQUE INDEX tags_id_key ON public.tags USING btree (id);

CREATE UNIQUE INDEX tags_pkey ON public.tags USING btree (id, public_id);

CREATE UNIQUE INDEX tags_public_id_key ON public.tags USING btree (public_id);

CREATE UNIQUE INDEX tags_questions_relation_id_key ON public.tags_questions_relation USING btree (id);

CREATE UNIQUE INDEX tags_questions_relation_pkey ON public.tags_questions_relation USING btree (id);

CREATE UNIQUE INDEX template_id_key ON public.template USING btree (id);

CREATE UNIQUE INDEX template_pkey ON public.template USING btree (id, public_id);

CREATE UNIQUE INDEX template_public_id_key ON public.template USING btree (public_id);

alter table "public"."accounts" add constraint "accounts_pkey" PRIMARY KEY using index "accounts_pkey";

alter table "public"."profiles" add constraint "profiles_pkey" PRIMARY KEY using index "profiles_pkey";

alter table "public"."questions" add constraint "questions_pkey" PRIMARY KEY using index "questions_pkey";

alter table "public"."tags" add constraint "tags_pkey" PRIMARY KEY using index "tags_pkey";

alter table "public"."tags_questions_relation" add constraint "tags_questions_relation_pkey" PRIMARY KEY using index "tags_questions_relation_pkey";

alter table "public"."template" add constraint "template_pkey" PRIMARY KEY using index "template_pkey";

alter table "public"."accounts" add constraint "profiles_id_key" UNIQUE using index "profiles_id_key";

alter table "public"."profiles" add constraint "profiles_id_key1" UNIQUE using index "profiles_id_key1";

alter table "public"."questions" add constraint "questions_creator_fkey" FOREIGN KEY (creator) REFERENCES profiles(id) not valid;

alter table "public"."questions" validate constraint "questions_creator_fkey";

alter table "public"."questions" add constraint "questions_id_key" UNIQUE using index "questions_id_key";

alter table "public"."questions" add constraint "questions_public_id_key" UNIQUE using index "questions_public_id_key";

alter table "public"."tags" add constraint "tags_creator_fkey" FOREIGN KEY (creator) REFERENCES profiles(id) not valid;

alter table "public"."tags" validate constraint "tags_creator_fkey";

alter table "public"."tags" add constraint "tags_id_key" UNIQUE using index "tags_id_key";

alter table "public"."tags" add constraint "tags_public_id_key" UNIQUE using index "tags_public_id_key";

alter table "public"."tags_questions_relation" add constraint "tags_questions_relation_id_key" UNIQUE using index "tags_questions_relation_id_key";

alter table "public"."tags_questions_relation" add constraint "tags_questions_relation_q_fkey" FOREIGN KEY (q) REFERENCES questions(id) not valid;

alter table "public"."tags_questions_relation" validate constraint "tags_questions_relation_q_fkey";

alter table "public"."tags_questions_relation" add constraint "tags_questions_relation_tag_fkey" FOREIGN KEY (tag) REFERENCES tags(id) not valid;

alter table "public"."tags_questions_relation" validate constraint "tags_questions_relation_tag_fkey";

alter table "public"."template" add constraint "template_id_key" UNIQUE using index "template_id_key";

alter table "public"."template" add constraint "template_public_id_key" UNIQUE using index "template_public_id_key";


