CREATE TABLE IF NOT EXISTS album(
    id INT AUTO_INCREMENT,
    collection_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    artist VARCHAR(255) NOT NULL,
    year INT(4) NOT NULL,
    genre VARCHAR(50) NOT NULL,
    cover_image VARCHAR(255),
    creation_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_update TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (collection_id) REFERENCES collection (id) ON DELETE CASCADE,
    FULLTEXT (name, artist)
);