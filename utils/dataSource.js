const {DataSource} = require('typeorm');

const appDataSource = new DataSource({
    type: "mysql",
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE
});

appDataSource.initialize()
.then(() => {
                console.log("Data source has been initialized!");
            })
            .catch((err) => {
                console.log("Error occured during data intialization", err)
                appDataSource.destroy();
            });

module.exports= {
    appDataSource
}