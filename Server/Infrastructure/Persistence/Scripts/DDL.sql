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

CREATE OR REPLACE FUNCTION bootcamp.validate_recruit_instructor_roles()
RETURNS TRIGGER AS $$
DECLARE
    recruit_role INT;
    instructor_role INT;
BEGIN
    SELECT role INTO recruit_role FROM bootcamp.users WHERE id = NEW.recruit_id;
    SELECT role INTO instructor_role FROM bootcamp.users WHERE id = NEW.instructor_id;

    IF recruit_role IS NULL OR instructor_role IS NULL THEN
        RAISE EXCEPTION 'Recruit or instructor not found in users table';
    END IF;

    IF recruit_role <> 2 THEN
        RAISE EXCEPTION 'Recruit must have role = 2 (Recruit)';
    END IF;

    IF instructor_role <> 1 THEN
        RAISE EXCEPTION 'Instructor must have role = 1 (Instructor)';
    END IF;

    IF NEW.recruit_id = NEW.instructor_id THEN
        RAISE EXCEPTION 'Recruit and instructor cannot be the same user';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Now create the table
CREATE TABLE IF NOT EXISTS bootcamp.recruit_instructor
(
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    recruit_id UUID NOT NULL UNIQUE,
    instructor_id UUID NOT NULL UNIQUE,
    CONSTRAINT recruit_instructor_pkey PRIMARY KEY (id),
    CONSTRAINT fk_recruit FOREIGN KEY (recruit_id)
        REFERENCES bootcamp.users (id)
        ON DELETE CASCADE,
    CONSTRAINT fk_instructor FOREIGN KEY (instructor_id)
        REFERENCES bootcamp.users (id)
        ON DELETE CASCADE
);

-- Attach the trigger
CREATE TRIGGER trg_validate_recruit_instructor_roles
BEFORE INSERT OR UPDATE ON bootcamp.recruit_instructor
FOR EACH ROW
EXECUTE FUNCTION bootcamp.validate_recruit_instructor_roles();


CREATE INDEX IF NOT EXISTS ix_users_team_id ON bootcamp.users(team_id);

-- exercises (catalog of exercises)
CREATE TABLE IF NOT EXISTS bootcamp.exercises (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title         text NOT NULL,
  content_file  text NOT NULL,
  work_days     numeric(3,1) NOT NULL,
  rtl           boolean NOT NULL DEFAULT false,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT ck_exercises_work_days_range CHECK (work_days >= 0.0 AND work_days <= 365.0)
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

-- ---------- team_exercises (per-team exercise lineup + ordering) ----------
CREATE TABLE IF NOT EXISTS bootcamp.team_exercises (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id      uuid NOT NULL REFERENCES bootcamp.teams(id) ON DELETE CASCADE,
  exercise_id  uuid NOT NULL REFERENCES bootcamp.exercises(id) ON DELETE CASCADE,
  position     integer NOT NULL,  -- order of the exercise within the team lineup (0-based or 1-based: you choose)
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT uq_team_exercise UNIQUE (team_id, exercise_id),
  CONSTRAINT ck_position_nonnegative CHECK (position >= 0)
);

CREATE INDEX IF NOT EXISTS ix_team_exercises_team_id ON bootcamp.team_exercises(team_id);
CREATE INDEX IF NOT EXISTS ix_team_exercises_exercise_id ON bootcamp.team_exercises(exercise_id);
-- optional: speed up "give me the ordered lineup for a team"
CREATE INDEX IF NOT EXISTS ix_team_exercises_team_pos ON bootcamp.team_exercises(team_id, position);

-- keep updated_at fresh
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_touch_team_exercises') THEN
    CREATE TRIGGER trg_touch_team_exercises
      BEFORE UPDATE ON bootcamp.team_exercises
      FOR EACH ROW EXECUTE FUNCTION bootcamp.touch_updated_at();
  END IF;
END$$;

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
