-- migrate:up
CREATE TABLE status (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL 
);

-- migrate:down
DROP TABLE status;