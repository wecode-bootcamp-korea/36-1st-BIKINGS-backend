-- migrate:up
CREATE TABLE orders (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  status_order_id INT NOT NULL,
  user_address_id INT NOT NULL,
  CONSTRAINT fk_orders_user_id FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
  CONSTRAINT fk_orders_status_order_id FOREIGN KEY (status_order_id) REFERENCES status_orders (id),
  CONSTRAINT fk_orders_user_address_id FOREIGN KEY (user_address_id) REFERENCES user_addresses (id)
);

-- migrate:down
DROP TABLE orders;