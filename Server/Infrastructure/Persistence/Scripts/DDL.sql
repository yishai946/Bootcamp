-- ---------- one-time setup ----------
CREATE SCHEMA IF NOT EXISTS bootcamp;

-- for gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- make bootcamp the first place Postgres looks
SET search_path TO bootcamp, public;

-- ---------- enums ----------
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'role') THEN
    CREATE TYPE role AS ENUM ('team_leader', 'instructor', 'recruit');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'exercise_status') THEN
    CREATE TYPE exercise_status AS ENUM ('not_started', 'in_progress', 'code_review', 'fixed', 'done');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'event_type') THEN
    CREATE TYPE event_type AS ENUM ('guard', 'shift', 'after', 'cr', 'fixes_check', 'day_off', 'other');
  END IF;
END$$;

-- ---------- tables ----------
-- teams
CREATE TABLE IF NOT EXISTS bootcamp.teams (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name         text NOT NULL UNIQUE,
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now()
);

-- users
CREATE TABLE IF NOT EXISTS bootcamp.users (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username       text NOT NULL UNIQUE,
  name			 text NOT NULL,
  password_hash  text NOT NULL,
  role           role NOT NULL DEFAULT 'recruit',
  team_id        uuid REFERENCES bootcamp.teams(id) ON DELETE SET NULL,
  created_at     timestamptz NOT NULL DEFAULT now(),
  updated_at     timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS ix_users_team_id ON bootcamp.users(team_id);

-- exercises (catalog of exercises)
CREATE TABLE IF NOT EXISTS bootcamp.exercises (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code         text NOT NULL UNIQUE,      -- e.g., "EX-001"
  title        text NOT NULL,
  description  text,
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now()
);

-- recruit_exercises (assignment + status tracking)
CREATE TABLE IF NOT EXISTS bootcamp.recruit_exercises (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  recruit_id   uuid NOT NULL REFERENCES bootcamp.users(id) ON DELETE CASCADE,
  exercise_id  uuid NOT NULL REFERENCES bootcamp.exercises(id) ON DELETE CASCADE,
  status       exercise_status NOT NULL DEFAULT 'not_started',
  start_date   timestamptz,
  cr_date      timestamptz,      -- "code_review" started
  fix_date     timestamptz,
  done_date    timestamptz,
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now(),
  UNIQUE (recruit_id, exercise_id)
);

CREATE INDEX IF NOT EXISTS ix_recruit_exercises_recruit_id ON bootcamp.recruit_exercises(recruit_id);
CREATE INDEX IF NOT EXISTS ix_recruit_exercises_exercise_id ON bootcamp.recruit_exercises(exercise_id);
CREATE INDEX IF NOT EXISTS ix_recruit_exercises_status ON bootcamp.recruit_exercises(status);

-- events (calendar / scheduling)
CREATE TABLE IF NOT EXISTS bootcamp.events (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      uuid NOT NULL REFERENCES bootcamp.users(id) ON DELETE CASCADE,
  type         event_type NOT NULL,
  title        text NOT NULL,
  description  text,
  start_time   timestamptz NOT NULL,
  end_time     timestamptz NOT NULL,
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now(),
  CHECK (end_time > start_time)
);

CREATE INDEX IF NOT EXISTS ix_events_user_id ON bootcamp.events(user_id);
CREATE INDEX IF NOT EXISTS ix_events_user_time ON bootcamp.events(user_id, start_time);

-- ---------- triggers to keep updated_at fresh (optional but handy) ----------
CREATE OR REPLACE FUNCTION bootcamp.touch_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at := now();
  RETURN NEW;
END$$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_touch_users') THEN
    CREATE TRIGGER trg_touch_users
      BEFORE UPDATE ON bootcamp.users
      FOR EACH ROW EXECUTE FUNCTION bootcamp.touch_updated_at();
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_touch_teams') THEN
    CREATE TRIGGER trg_touch_teams
      BEFORE UPDATE ON bootcamp.teams
      FOR EACH ROW EXECUTE FUNCTION bootcamp.touch_updated_at();
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_touch_exercises') THEN
    CREATE TRIGGER trg_touch_exercises
      BEFORE UPDATE ON bootcamp.exercises
      FOR EACH ROW EXECUTE FUNCTION bootcamp.touch_updated_at();
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_touch_recruit_exercises') THEN
    CREATE TRIGGER trg_touch_recruit_exercises
      BEFORE UPDATE ON bootcamp.recruit_exercises
      FOR EACH ROW EXECUTE FUNCTION bootcamp.touch_updated_at();
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_touch_events') THEN
    CREATE TRIGGER trg_touch_events
      BEFORE UPDATE ON bootcamp.events
      FOR EACH ROW EXECUTE FUNCTION bootcamp.touch_updated_at();
  END IF;
END$$;
