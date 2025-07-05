const User = require('../models/User')
const bcrypt = require('bcryptjs');

class UserController {

    // [GET] /account/profile
    async getUserInfo(req, res) {
        if (!req.user) {
            return res.status(401).json({ message: 'Chưa đăng nhập hoặc token không hợp lệ' });
        }

        try {
            const user = await User.findById(req.user.id).select('-password');
            if (!user) {
                return res.status(404).json({ message: 'Không tìm thấy người dùng' });
            }
            res.status(200).json({ user });
        } catch (err) {
            res.status(500).json({ message: 'Token không hợp lệ hoặc đã hết hạn' });
        }
    }

    // [PUT] /account/updateAccountInfo
    async updateAccountInfo(req, res) {
        if (!req.user) {
            return res.status(401).json({ message: 'Chưa đăng nhập hoặc token không hợp lệ' });
        }

        try {
            const { email, fullName, phoneNumber, address } = req.body;

            const updatedUser = await User.findByIdAndUpdate(
                req.user.id,
                {
                    email,
                    fullName,
                    phoneNumber,
                    address
                },
                { new: true }
            );

            if (!updatedUser) {
                return res.status(404).json({ message: 'Không tìm thấy người dùng' });
            }

            res.status(200).json({ message: 'Cập nhật thành công', user: updatedUser });
        } catch (error) {
            console.error('Lỗi cập nhật thông tin người dùng:', error);
            res.status(500).json({ message: 'Đã xảy ra lỗi server' });
        }
    }

    // [PATCH] /account/settings
    async updatePassword(req, res) {
        try {
            const { password, newPassword } = req.body;
            if (!req.user) {
                return res.status(401).json({ message: 'Chưa đăng nhập hoặc token không hợp lệ' });
            }

            const user = await User.findById(req.user.id);
            if (!user) {
                return res.status(404).json({ message: 'Không tìm thấy người dùng' });
            }

            // Kiểm tra mật khẩu cũ có đúng không
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Mật khẩu hiện tại không đúng' });
            }

            // Băm mật khẩu mới
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            // Cập nhật mật khẩu
            user.password = hashedPassword;
            await user.save();

            return res.status(200).json({ message: 'Đổi mật khẩu thành công' });
        }
        catch (error) {
            console.error('Lỗi đổi mật khẩu:', error);
            return res.status(500).json({ message: 'Lỗi máy chủ', error: error.message });
        }
    }
}

module.exports = new UserController;

