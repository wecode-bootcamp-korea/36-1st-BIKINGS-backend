-- migrate:up
CREATE TABLE order_items (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    amount INT NOT NULL,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    status_order_item_id INT NOT NULL,
    CONSTRAINT fk_order_items_user_id FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    CONSTRAINT fk_order_items_product_id FOREIGN KEY (product_id) REFERENCES products (id),
    CONSTRAINT fk_order_items_status_order_item_id FOREIGN KEY (status_order_item_id) REFERENCES status_order_items (id)
);

-- migrate:down
DROP TABLE order_items;