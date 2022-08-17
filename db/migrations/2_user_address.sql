-- migrate:up
CREATE TABLE user_address (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    address VARCHAR(100),
    CONSTRAINT fk_user_id_address FOREIGN KEY (user_id) REFERENCES users(id)
);

-- migrate:down
DROP TABLE user_address;