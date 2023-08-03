CREATE TABLE pet_member (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,          
  nickname VARCHAR(50) NOT NULL UNIQUE,
  user_id VARCHAR(50) NOT NULL UNIQUE,  
  password VARCHAR(100) NOT NULL,       
  email VARCHAR(100) NOT NULL,
  mobile_phone VARCHAR(20) NOT NULL,
  address VARCHAR(255)
);

CREATE TABLE pet_free_board (
  free_board_id int NOT NULL AUTO_INCREMENT,
  user_id varchar(255),
  nickname varchar(255),
  title varchar(255) NOT NULL,
  content varchar(255) NOT NULL,
  regdate varbinary(255) DEFAULT NULL,
  updatedate varbinary(255) DEFAULT NULL,
  deletedate varbinary(255) DEFAULT NULL,
  imagefile varchar(255) DEFAULT NULL,
  likes int DEFAULT '0',
  views int DEFAULT '0',
  PRIMARY KEY (free_board_id),
  KEY user_id (user_id),
  CONSTRAINT pet_free_board_ibfk_1 FOREIGN KEY (user_id) REFERENCES pet_member (user_id) ON DELETE CASCADE
);

CREATE TABLE pet_free_reply (
  comment_id bigint NOT NULL AUTO_INCREMENT,
  free_board_id int NOT NULL,
  user_id varchar(255),
  nickname varchar(255),
  contents varchar(255) NOT NULL,
  registration_date varbinary(255) DEFAULT NULL,
  PRIMARY KEY (comment_id),
  KEY free_board_id (free_board_id),
  KEY user_id (user_id),
  CONSTRAINT pet_free_reply_ibfk_1 FOREIGN KEY (free_board_id) REFERENCES pet_free_board (free_board_id) ON DELETE CASCADE,
  CONSTRAINT pet_free_reply_ibfk_2 FOREIGN KEY (user_id) REFERENCES pet_member (user_id) ON DELETE CASCADE
); 


CREATE TABLE pet_honey_board (
  honey_board_id int NOT NULL AUTO_INCREMENT,
  user_id varchar(255),
  nickname varchar(255),
  title varchar(255) NOT NULL,
  content varchar(255) NOT NULL,
  regdate varbinary(255) DEFAULT NULL,
  updatedate varbinary(255) DEFAULT NULL,
  deletedate varbinary(255) DEFAULT NULL,
  imagefile varchar(255) DEFAULT NULL,
  likes int DEFAULT '0',
  views int DEFAULT '0',
  PRIMARY KEY (honey_board_id),
  KEY user_id (user_id),
  CONSTRAINT pet_honey_board_ibfk_1 FOREIGN KEY (user_id) REFERENCES pet_member (user_id) ON DELETE CASCADE
);

CREATE TABLE pet_honey_reply (
  comment_id bigint NOT NULL AUTO_INCREMENT,
  honey_board_id int NOT NULL,
  user_id varchar(255),
  nickname varchar(255),
  contents varchar(255) NOT NULL,
  registration_date varbinary(255) DEFAULT NULL,
  PRIMARY KEY (comment_id),
  KEY honey_board_id (honey_board_id),
  KEY user_id (user_id),
  CONSTRAINT pet_honey_reply_ibfk_1 FOREIGN KEY (honey_board_id) REFERENCES pet_honey_board (honey_board_id) ON DELETE CASCADE,
  CONSTRAINT pet_honey_reply_ibfk_2 FOREIGN KEY (user_id) REFERENCES pet_member (user_id) ON DELETE CASCADE
);
