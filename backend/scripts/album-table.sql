CREATE TABLE IF NOT EXISTS album_test(
    id INT AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    artist VARCHAR(255) NOT NULL,
    year INT(4) NOT NULL,
    genre VARCHAR(50) NOT NULL,
    cover_image VARCHAR(255),
    creation_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_update TIMESTAMP,
    PRIMARY KEY (id),
    FULLTEXT (name, artist)
);