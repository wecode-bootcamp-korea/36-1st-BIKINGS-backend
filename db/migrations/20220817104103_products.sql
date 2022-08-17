-- migrate:up
CREATE TABLE products (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    cover_image_url VARCHAR(2038) NULL,
    detail_image_url VARCHAR(2038) NULL
);

-- migrate:down
DROP TABLE products;