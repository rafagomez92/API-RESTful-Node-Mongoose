function methodType(req, res, next) {
    console.log('Method Type: ', req.method);
    next();
};

module.exports = methodType;