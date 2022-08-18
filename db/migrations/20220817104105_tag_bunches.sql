-- migrate:up
CREATE TABLE tag_bunches (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    tag_id INT NOT NULL,
    product_id INT NOT NULL,
    CONSTRAINT fk_tag_bunches_tag_id FOREIGN KEY (tag_id) REFERENCES tags (id) ON DELETE CASCADE,
    CONSTRAINT fk_tag_bunches_product_id FOREIGN KEY (product_id) REFERENCES products (id)
);

-- migrate:down
DROP TABLE tag_bunches;