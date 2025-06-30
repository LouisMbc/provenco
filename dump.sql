

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE SCHEMA IF NOT EXISTS "public";


ALTER SCHEMA "public" OWNER TO "pg_database_owner";


COMMENT ON SCHEMA "public" IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."appellations" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "nom" "text" NOT NULL,
    "description" "text",
    "region" "text"
);


ALTER TABLE "public"."appellations" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."cepages" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "nom" "text" NOT NULL,
    "description" "text"
);


ALTER TABLE "public"."cepages" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."domaines" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "nom" "text" NOT NULL,
    "description" "text",
    "localisation" "text",
    "site_web" "text"
);


ALTER TABLE "public"."domaines" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."histoire" (
    "id" integer NOT NULL,
    "ville_id" integer,
    "titre" "text" NOT NULL,
    "contenu" "text" NOT NULL,
    "periode" "text"
);


ALTER TABLE "public"."histoire" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."histoire_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "public"."histoire_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."histoire_id_seq" OWNED BY "public"."histoire"."id";



CREATE TABLE IF NOT EXISTS "public"."image" (
    "id" integer NOT NULL,
    "url" "text" NOT NULL,
    "description" "text",
    "ville_id" integer,
    "monument_id" integer,
    "histoire_id" integer,
    "legende_id" integer,
    "created_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."image" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."image_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "public"."image_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."image_id_seq" OWNED BY "public"."image"."id";



CREATE TABLE IF NOT EXISTS "public"."legende" (
    "id" integer NOT NULL,
    "ville_id" integer,
    "titre" "text" NOT NULL,
    "contenu" "text" NOT NULL,
    "origine" "text"
);


ALTER TABLE "public"."legende" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."legende_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "public"."legende_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."legende_id_seq" OWNED BY "public"."legende"."id";



CREATE TABLE IF NOT EXISTS "public"."monument" (
    "id" integer NOT NULL,
    "ville_id" integer,
    "nom" "text" NOT NULL,
    "type" "text",
    "date_construction" "text",
    "description" "text"
);


ALTER TABLE "public"."monument" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."monument_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "public"."monument_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."monument_id_seq" OWNED BY "public"."monument"."id";



CREATE TABLE IF NOT EXISTS "public"."profiles" (
    "id" "uuid" NOT NULL,
    "username" "text",
    "created_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"())
);


ALTER TABLE "public"."profiles" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."types_vin" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "nom" "text" NOT NULL
);


ALTER TABLE "public"."types_vin" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."ville" (
    "id" integer NOT NULL,
    "nom" "text" NOT NULL,
    "code_postal" "text",
    "departement" "text",
    "region" "text" DEFAULT 'Provence'::"text",
    "population" integer,
    "latitude" numeric(9,6),
    "longitude" numeric(9,6)
);


ALTER TABLE "public"."ville" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."ville_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "public"."ville_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."ville_id_seq" OWNED BY "public"."ville"."id";



CREATE TABLE IF NOT EXISTS "public"."vin_cepage" (
    "vin_id" "uuid" NOT NULL,
    "cepage_id" "uuid" NOT NULL
);


ALTER TABLE "public"."vin_cepage" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."vins" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "nom" "text" NOT NULL,
    "annee" integer,
    "description" "text",
    "domaine_id" "uuid",
    "appellation_id" "uuid",
    "type_vin_id" "uuid"
);


ALTER TABLE "public"."vins" OWNER TO "postgres";


ALTER TABLE ONLY "public"."histoire" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."histoire_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."image" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."image_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."legende" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."legende_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."monument" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."monument_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."ville" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."ville_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."appellations"
    ADD CONSTRAINT "appellations_nom_key" UNIQUE ("nom");



ALTER TABLE ONLY "public"."appellations"
    ADD CONSTRAINT "appellations_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."cepages"
    ADD CONSTRAINT "cepages_nom_key" UNIQUE ("nom");



ALTER TABLE ONLY "public"."cepages"
    ADD CONSTRAINT "cepages_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."domaines"
    ADD CONSTRAINT "domaines_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."histoire"
    ADD CONSTRAINT "histoire_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."image"
    ADD CONSTRAINT "image_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."legende"
    ADD CONSTRAINT "legende_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."monument"
    ADD CONSTRAINT "monument_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."types_vin"
    ADD CONSTRAINT "types_vin_nom_key" UNIQUE ("nom");



ALTER TABLE ONLY "public"."types_vin"
    ADD CONSTRAINT "types_vin_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."ville"
    ADD CONSTRAINT "ville_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."vin_cepage"
    ADD CONSTRAINT "vin_cepage_pkey" PRIMARY KEY ("vin_id", "cepage_id");



ALTER TABLE ONLY "public"."vins"
    ADD CONSTRAINT "vins_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."histoire"
    ADD CONSTRAINT "histoire_ville_id_fkey" FOREIGN KEY ("ville_id") REFERENCES "public"."ville"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."image"
    ADD CONSTRAINT "image_histoire_id_fkey" FOREIGN KEY ("histoire_id") REFERENCES "public"."histoire"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."image"
    ADD CONSTRAINT "image_legende_id_fkey" FOREIGN KEY ("legende_id") REFERENCES "public"."legende"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."image"
    ADD CONSTRAINT "image_monument_id_fkey" FOREIGN KEY ("monument_id") REFERENCES "public"."monument"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."image"
    ADD CONSTRAINT "image_ville_id_fkey" FOREIGN KEY ("ville_id") REFERENCES "public"."ville"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."legende"
    ADD CONSTRAINT "legende_ville_id_fkey" FOREIGN KEY ("ville_id") REFERENCES "public"."ville"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."monument"
    ADD CONSTRAINT "monument_ville_id_fkey" FOREIGN KEY ("ville_id") REFERENCES "public"."ville"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."vin_cepage"
    ADD CONSTRAINT "vin_cepage_cepage_id_fkey" FOREIGN KEY ("cepage_id") REFERENCES "public"."cepages"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."vin_cepage"
    ADD CONSTRAINT "vin_cepage_vin_id_fkey" FOREIGN KEY ("vin_id") REFERENCES "public"."vins"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."vins"
    ADD CONSTRAINT "vins_appellation_id_fkey" FOREIGN KEY ("appellation_id") REFERENCES "public"."appellations"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."vins"
    ADD CONSTRAINT "vins_domaine_id_fkey" FOREIGN KEY ("domaine_id") REFERENCES "public"."domaines"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."vins"
    ADD CONSTRAINT "vins_type_vin_id_fkey" FOREIGN KEY ("type_vin_id") REFERENCES "public"."types_vin"("id") ON DELETE SET NULL;



CREATE POLICY "Allow individual read access to own profile" ON "public"."profiles" FOR SELECT USING (("auth"."uid"() = "id"));



CREATE POLICY "Only I can delete appellations" ON "public"."appellations" FOR DELETE USING (("auth"."uid"() = '9da02ee5-cdca-4e5c-966c-e56c770fa66c'::"uuid"));



CREATE POLICY "Only I can delete cepages" ON "public"."cepages" FOR DELETE USING (("auth"."uid"() = '9da02ee5-cdca-4e5c-966c-e56c770fa66c'::"uuid"));



CREATE POLICY "Only I can delete domaines" ON "public"."domaines" FOR DELETE USING (("auth"."uid"() = '9da02ee5-cdca-4e5c-966c-e56c770fa66c'::"uuid"));



CREATE POLICY "Only I can delete types_vin" ON "public"."types_vin" FOR DELETE USING (("auth"."uid"() = '9da02ee5-cdca-4e5c-966c-e56c770fa66c'::"uuid"));



CREATE POLICY "Only I can delete vins" ON "public"."vins" FOR DELETE USING (("auth"."uid"() = '9da02ee5-cdca-4e5c-966c-e56c770fa66c'::"uuid"));



CREATE POLICY "Only I can insert appellations" ON "public"."appellations" FOR INSERT WITH CHECK (("auth"."uid"() = '9da02ee5-cdca-4e5c-966c-e56c770fa66c'::"uuid"));



CREATE POLICY "Only I can insert cepages" ON "public"."cepages" FOR INSERT WITH CHECK (("auth"."uid"() = '9da02ee5-cdca-4e5c-966c-e56c770fa66c'::"uuid"));



CREATE POLICY "Only I can insert domaines" ON "public"."domaines" FOR INSERT WITH CHECK (("auth"."uid"() = '9da02ee5-cdca-4e5c-966c-e56c770fa66c'::"uuid"));



CREATE POLICY "Only I can insert types_vin" ON "public"."types_vin" FOR INSERT WITH CHECK (("auth"."uid"() = '9da02ee5-cdca-4e5c-966c-e56c770fa66c'::"uuid"));



CREATE POLICY "Only I can insert vins" ON "public"."vins" FOR INSERT WITH CHECK (("auth"."uid"() = '9da02ee5-cdca-4e5c-966c-e56c770fa66c'::"uuid"));



CREATE POLICY "Only I can update appellations" ON "public"."appellations" FOR UPDATE USING (("auth"."uid"() = '9da02ee5-cdca-4e5c-966c-e56c770fa66c'::"uuid"));



CREATE POLICY "Only I can update cepages" ON "public"."cepages" FOR UPDATE USING (("auth"."uid"() = '9da02ee5-cdca-4e5c-966c-e56c770fa66c'::"uuid"));



CREATE POLICY "Only I can update domaines" ON "public"."domaines" FOR UPDATE USING (("auth"."uid"() = '9da02ee5-cdca-4e5c-966c-e56c770fa66c'::"uuid"));



CREATE POLICY "Only I can update types_vin" ON "public"."types_vin" FOR UPDATE USING (("auth"."uid"() = '9da02ee5-cdca-4e5c-966c-e56c770fa66c'::"uuid"));



CREATE POLICY "Only I can update vins" ON "public"."vins" FOR UPDATE USING (("auth"."uid"() = '9da02ee5-cdca-4e5c-966c-e56c770fa66c'::"uuid"));



CREATE POLICY "Public can read appellations" ON "public"."appellations" FOR SELECT USING (true);



CREATE POLICY "Public can read cepages" ON "public"."cepages" FOR SELECT USING (true);



CREATE POLICY "Public can read domaines" ON "public"."domaines" FOR SELECT USING (true);



CREATE POLICY "Public can read types_vin" ON "public"."types_vin" FOR SELECT USING (true);



CREATE POLICY "Public can read vins" ON "public"."vins" FOR SELECT USING (true);



ALTER TABLE "public"."appellations" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."cepages" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."domaines" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."types_vin" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."vins" ENABLE ROW LEVEL SECURITY;


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";



GRANT ALL ON TABLE "public"."appellations" TO "anon";
GRANT ALL ON TABLE "public"."appellations" TO "authenticated";
GRANT ALL ON TABLE "public"."appellations" TO "service_role";



GRANT ALL ON TABLE "public"."cepages" TO "anon";
GRANT ALL ON TABLE "public"."cepages" TO "authenticated";
GRANT ALL ON TABLE "public"."cepages" TO "service_role";



GRANT ALL ON TABLE "public"."domaines" TO "anon";
GRANT ALL ON TABLE "public"."domaines" TO "authenticated";
GRANT ALL ON TABLE "public"."domaines" TO "service_role";



GRANT ALL ON TABLE "public"."histoire" TO "anon";
GRANT ALL ON TABLE "public"."histoire" TO "authenticated";
GRANT ALL ON TABLE "public"."histoire" TO "service_role";



GRANT ALL ON SEQUENCE "public"."histoire_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."histoire_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."histoire_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."image" TO "anon";
GRANT ALL ON TABLE "public"."image" TO "authenticated";
GRANT ALL ON TABLE "public"."image" TO "service_role";



GRANT ALL ON SEQUENCE "public"."image_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."image_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."image_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."legende" TO "anon";
GRANT ALL ON TABLE "public"."legende" TO "authenticated";
GRANT ALL ON TABLE "public"."legende" TO "service_role";



GRANT ALL ON SEQUENCE "public"."legende_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."legende_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."legende_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."monument" TO "anon";
GRANT ALL ON TABLE "public"."monument" TO "authenticated";
GRANT ALL ON TABLE "public"."monument" TO "service_role";



GRANT ALL ON SEQUENCE "public"."monument_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."monument_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."monument_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."profiles" TO "anon";
GRANT ALL ON TABLE "public"."profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."profiles" TO "service_role";



GRANT ALL ON TABLE "public"."types_vin" TO "anon";
GRANT ALL ON TABLE "public"."types_vin" TO "authenticated";
GRANT ALL ON TABLE "public"."types_vin" TO "service_role";



GRANT ALL ON TABLE "public"."ville" TO "anon";
GRANT ALL ON TABLE "public"."ville" TO "authenticated";
GRANT ALL ON TABLE "public"."ville" TO "service_role";



GRANT ALL ON SEQUENCE "public"."ville_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."ville_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."ville_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."vin_cepage" TO "anon";
GRANT ALL ON TABLE "public"."vin_cepage" TO "authenticated";
GRANT ALL ON TABLE "public"."vin_cepage" TO "service_role";



GRANT ALL ON TABLE "public"."vins" TO "anon";
GRANT ALL ON TABLE "public"."vins" TO "authenticated";
GRANT ALL ON TABLE "public"."vins" TO "service_role";



ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "service_role";






RESET ALL;
