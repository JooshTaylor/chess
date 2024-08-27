CREATE TYPE colour AS ENUM ('white', 'black');
CREATE TYPE game_status AS ENUM ('awaiting-players', 'running', 'ended');
CREATE TYPE game_player_result AS ENUM ('won', 'lost');

CREATE TABLE game (
  id SERIAL PRIMARY KEY,
  status game_status NOT NULL DEFAULT 'awaiting-players',
  turn_colour colour NOT NULL DEFAULT 'white',

  date_created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  date_modified TIMESTAMP DEFAULT NULL,
  date_deleted TIMESTAMP DEFAULT NULL,
  deleted BIT DEFAULT 0
);

CREATE TABLE user (
  id SERIAL PRIMARY KEY,
  username VARCHAR NOT NULL UNIQUE,
  email VARCHAR NOT NULL UNIQUE,

  date_created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  date_modified TIMESTAMP DEFAULT NULL,
  date_deleted TIMESTAMP DEFAULT NULL,
  deleted BIT DEFAULT 0
);

CREATE TABLE game_user_mapping (
  game_id INT FOREIGN KEY REFERENCES user(id) NOT NULL,
  user_id INT FOREIGN KEY REFERENCES user(id) NOT NULL,

  colour colour NOT NULL,
  result game_player_result DEFAULT NULL,

  PRIMARY KEY (game_id, user_id)
);