export default () => ({
    auth:{
        jwtSecret: process.env.JWT_SECRET || 'secret',
        jwtExpireAt: parseInt(process.env.JWT_EXPIRE) || 3600000
    }
})