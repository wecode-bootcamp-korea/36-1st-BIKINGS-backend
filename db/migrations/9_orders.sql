-- migrate:up
CREATE TABLE orders(
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  order_item_id INT NOT NULL,
  status_id INT NOT NULL,
  address_id INT NOT NULL,
  CONSTRAINT fk_order_item_id_orders FOREIGN KEY (order_item_id) REFERENCES order_items (id),
  CONSTRAINT fk_status_id_order FOREIGN KEY (status_id) REFERENCES status (id),
  CONSTRAINT fk_address_id_order FOREIGN KEY (address_id) REFERENCES user_address (id)
);

-- migrate:down
DROP TABLE orders;
