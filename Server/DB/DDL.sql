-- Create schema
DROP SCHEMA IF EXISTS BootCamp CASCADE;
CREATE SCHEMA BootCamp;

SET search_path TO BootCamp;

-- ENUMs
DROP TYPE IF EXISTS Users_role_enum CASCADE;
CREATE TYPE Users_role_enum AS ENUM ('team_leader', 'instructor', 'recruit');

DROP TYPE IF EXISTS TraineeTasks_status_enum CASCADE;
CREATE TYPE TraineeTasks_status_enum AS ENUM ('not_started', 'in_progress', 'CR', 'fixed', 'done');

DROP TYPE IF EXISTS OccasionType_enum CASCADE;
CREATE TYPE OccasionType_enum AS ENUM ('guard', 'shift', 'after', 'other');

-- Teams table
DROP TABLE IF EXISTS Teams CASCADE;
CREATE TABLE Teams (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- Users table
DROP TABLE IF EXISTS Users CASCADE;
CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role Users_role_enum NOT NULL,
    teamId INT REFERENCES Teams(id) ON DELETE SET NULL
);

-- Excercises table
DROP TABLE IF EXISTS Excercises CASCADE;
CREATE TABLE Excercises (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    contentFile VARCHAR(255) NOT NULL,
    workDays DECIMAL(3,1) NOT NULL
);

-- TeamExcercises table
DROP TABLE IF EXISTS TeamExcercises CASCADE;
CREATE TABLE TeamExcercises (
    id SERIAL PRIMARY KEY,
    taskId INT NOT NULL REFERENCES Excercises(id) ON DELETE CASCADE,
    teamId INT NOT NULL REFERENCES Teams(id) ON DELETE CASCADE,
    UNIQUE(teamId, taskId)
);

-- RecruitExcercises table
DROP TABLE IF EXISTS RecruitExcercises CASCADE;
CREATE TABLE RecruitExcercises (
    id SERIAL PRIMARY KEY,
    recruitId INT NOT NULL REFERENCES Users(id) ON DELETE CASCADE,
    taskId INT NOT NULL REFERENCES Excercises(id) ON DELETE CASCADE,
    status TraineeTasks_status_enum DEFAULT 'not_started'
);

-- RecruitInstructor table
DROP TABLE IF EXISTS RecruitInstructor CASCADE;
CREATE TABLE RecruitInstructor (
    recruitId INT PRIMARY KEY REFERENCES Users(id) ON DELETE CASCADE,
    instructorId INT UNIQUE NOT NULL REFERENCES Users(id) ON DELETE CASCADE
);

-- RecruitUnavailability table
DROP TABLE IF EXISTS RecruitUnavailability CASCADE;
CREATE TABLE RecruitUnavailability (
    id SERIAL PRIMARY KEY,
    recruitId INT NOT NULL REFERENCES Users(id) ON DELETE CASCADE,
    type OccasionType_enum NOT NULL,
    description VARCHAR(255),
    startDate DATE NOT NULL,
    workDays DECIMAL(3,1) NOT NULL
);
