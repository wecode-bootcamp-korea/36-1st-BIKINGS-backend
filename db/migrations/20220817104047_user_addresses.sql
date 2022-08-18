-- migrate:up
CREATE TABLE user_addresses (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    address VARCHAR(100),
    CONSTRAINT fk_user_address_user_id FOREIGN KEY (user_id) REFERENCES users (id)
);

-- migrate:down
DROP TABLE user_addresses;