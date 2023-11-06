const jwt = {
    ttl: process.env.JWT_TTL,
    refreshTtl: process.env.JWT_REFRESH_TTL,
    secret: process.env.JWT_SECRET,
};

module.exports = jwt;
