CREATE DATABASE jwt_auth;

CREATE TABLE users(
    id uuid PRIMARY key DEFAULT 
    uuid_generate_v4(),
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

INSERT INTO users (first_name, last_name, email, password)
VALUES('Ejiro', 'Asiuwhu', 'ejiro@gmail.com', 11111111)