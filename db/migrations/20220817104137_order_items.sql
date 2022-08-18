-- migrate:up
CREATE TABLE order_items (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    amount INT NOT NULL,
    product_id INT NOT NULL,
    status_order_item_id INT NOT NULL,
    order_id INT NOT NULL,
    CONSTRAINT fk_order_items_product_id FOREIGN KEY (product_id) REFERENCES products (id),
    CONSTRAINT fk_order_items_status_order_item_id FOREIGN KEY (status_order_item_id) REFERENCES status_order_items (id),
    CONSTRAINT fk_order_items_order_id FOREIGN KEY (order_id) REFERENCES orders (id)
);

-- migrate:down
DROP TABLE order_items;