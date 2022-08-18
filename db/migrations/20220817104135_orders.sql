-- migrate:up
CREATE TABLE orders (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  order_item_id INT NOT NULL,
  status_orders_id INT NOT NULL,
  user_address_id INT NOT NULL,
  CONSTRAINT fk_orders_user_id FOREIGN KEY (user_id) REFERENCES users (id),
  CONSTRAINT fk_orders_order_item_id FOREIGN KEY (order_item_id) REFERENCES order_items (id),
  CONSTRAINT fk_orders_status_orders_id FOREIGN KEY (status_orders_id) REFERENCES status_orders (id),
  CONSTRAINT fk_orders_user_address_id FOREIGN KEY (user_address_id) REFERENCES user_address (id)
);

-- migrate:down
DROP TABLE orders;