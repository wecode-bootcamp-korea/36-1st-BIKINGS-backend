-- migrate:up
CREATE TABLE order_items(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    amount INT NOT NULL,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    status_id INT NOT NULL,
    CONSTRAINT fk_user_id_order_items FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    CONSTRAINT fk_product_id_order_items FOREIGN KEY (product_id) REFERENCES products (id),
    CONSTRAINT fk_status_id_order_items FOREIGN KEY (status_id) REFERENCES status (id)
);

-- migrate:down
DROP TABLE order_items;
