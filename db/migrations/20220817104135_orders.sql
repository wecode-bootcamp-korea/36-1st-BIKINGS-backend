-- migrate:up
CREATE TABLE orders (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  order_item_id INT NOT NULL,
  status_id INT NOT NULL,
  user_address_id INT NOT NULL,
  CONSTRAINT fk_orders_order_item_id FOREIGN KEY (order_item_id) REFERENCES order_items (id),
  CONSTRAINT fk_orders_status_id FOREIGN KEY (status_id) REFERENCES status (id),
  CONSTRAINT fk_orders_user_address_id FOREIGN KEY (user_address_id) REFERENCES user_address (id)
);

-- migrate:down
DROP TABLE orders;