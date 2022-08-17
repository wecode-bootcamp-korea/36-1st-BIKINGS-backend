-- migrate:up
CREATE TABLE carts(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_id INT NULL,
    product_id INT NULL,
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    CONSTRAINT fk_product_id FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
);

-- migrate:down
DROP TABLE carts;
