-- migrate:up
CREATE TABLE carts (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_id INT NULL,
    product_id INT NULL,
    amount INT NOT NULL DEFAULT 1,
    CONSTRAINT fk_carts_user_id FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    CONSTRAINT fk_carts_product_id FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
);

-- migrate:down
DROP TABLE carts;