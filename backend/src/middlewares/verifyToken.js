const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.cookies.jwt; // Giả sử bạn lưu token ở cookie tên 'jwt'
    if (!token) {
        req.user = null;
        return next();
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Lưu user vào request để dùng về sau
        next();
    } catch (err) {
        req.user = null;
        next();
    }
};

module.exports = verifyToken;
