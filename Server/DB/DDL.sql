-- Drop and create schema
DROP SCHEMA IF EXISTS bootcamp CASCADE;
CREATE SCHEMA bootcamp;

SET search_path TO bootcamp;

-- ENUMs
DROP TYPE IF EXISTS role_type CASCADE;
CREATE TYPE role_type AS ENUM ('team_leader', 'instructor', 'recruit');

DROP TYPE IF EXISTS exercise_status_type CASCADE;
CREATE TYPE exercise_status_type AS ENUM ('not_started', 'in_progress', 'code_review', 'fixed', 'done');

DROP TYPE IF EXISTS event_type CASCADE;
CREATE TYPE event_type AS ENUM ('guard', 'shift', 'after', 'code_review', 'fixes_check', 'sickness', 'day_off', 'other');

-- Teams table
CREATE TABLE teams (
    id TEXT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- Users table
CREATE TABLE users (
    id TEXT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    role role_type NOT NULL,
    team_id TEXT NOT NULL REFERENCES teams(id) ON DELETE CASCADE
);

-- Exercises table
CREATE TABLE exercises (
    id TEXT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content_file TEXT NOT NULL,
    work_days NUMERIC(4,1) NOT NULL,
    is_rtl BOOLEAN NOT NULL DEFAULT FALSE
);

-- TeamExercises table
CREATE TABLE team_exercises (
    id TEXT PRIMARY KEY,
    team_id TEXT NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
    exercise_id TEXT NOT NULL REFERENCES exercises(id) ON DELETE CASCADE,
    sort_order INTEGER NOT NULL,
    UNIQUE(team_id, exercise_id)
);

-- RecruitExercises table
CREATE TABLE recruit_exercises (
    id TEXT PRIMARY KEY,
    recruit_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    exercise_id TEXT NOT NULL REFERENCES exercises(id) ON DELETE CASCADE,
    status exercise_status_type NOT NULL DEFAULT 'not_started',
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    code_review_date TIMESTAMP WITH TIME ZONE NULL,
    fix_date TIMESTAMP WITH TIME ZONE NULL,
    done_date TIMESTAMP WITH TIME ZONE NULL
);

-- Events table
CREATE TABLE events (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type event_type NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NULL,
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE NOT NULL,
    all_day BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL
);

-- Recruit Instructor mapping table
CREATE TABLE recruit_instructors (
    recruit_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    instructor_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    PRIMARY KEY (recruit_id, instructor_id)
);

CREATE INDEX ix_recruit_exercises_recruit ON recruit_exercises(recruit_id);
CREATE INDEX ix_team_exercises_team ON team_exercises(team_id);
CREATE INDEX ix_events_user ON events(user_id);
