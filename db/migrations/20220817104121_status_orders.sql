-- migrate:up
CREATE TABLE status_orders (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL 
);

-- migrate:down
DROP TABLE status_orders;