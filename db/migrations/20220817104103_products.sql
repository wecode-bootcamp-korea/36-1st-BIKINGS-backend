-- migrate:up
CREATE TABLE products (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    cover_image_url VARCHAR(2083) NULL,
    detail_image_url VARCHAR(2083) NULL,
    stock INT NOT NULL DEFAULT 0,
    price DECIMAL(10,2) NOT NULL
);

-- migrate:down
DROP TABLE products;