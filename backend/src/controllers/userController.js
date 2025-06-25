const User = require('../models/User')
const jwt = require('jsonwebtoken');

class UserController {

    // [GET] /account/profile
    async getUserInfo(req, res, next) {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: 'Chưa đăng nhập hoặc token không tồn tại' });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // decoded chứa thông tin user từ payload JWT
            const user = await User.findById(decoded.id).select('-password'); // bỏ password
            if (!user) {
                return res.status(404).json({ message: 'Không tìm thấy người dùng' });
            }
            res.status(200).json({ user });
        } catch (err) {
            return res.status(401).json({ message: 'Token không hợp lệ hoặc đã hết hạn' });
        }
    }
}

module.exports = new UserController;