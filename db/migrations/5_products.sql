-- migrate:up
CREATE TABLE products(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    image VARCHAR(2038) NULL,
    tag_bunch_id INT NOT NULL,
    CONSTRAINT fk_tag_bunch_id FOREIGN KEY (tag_bunch_id) REFERENCES tag_bunches (id)
);

-- migrate:down
DROP TABLE products;
