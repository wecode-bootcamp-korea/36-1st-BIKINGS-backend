const {DataSource} = require('typeorm');

const myDataSource = new DataSource({
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE
});

myDataSource.initialize()
.then(() => {
                console.log("Data source has been initialized!");
            })
            .catch((err) => {
                console.log("Error occured during data intialization", err)
                myDataSource.destroy();
            });

module.exports= {
    myDataSource
}