export default () => ({
    port: process.env.PORT,
    mongo_connect: process.env.MONGO_CONNECTION,
    secret_jwt: process.env.SECRET,
    expire_jwt: process.env.EXPIRE_JWT
});
