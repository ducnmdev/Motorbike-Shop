const User = require('../models/User')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

class AuthController {

    // [GET] /check
    checkIsLoggin(req, res, next) {
        if (req.user) {
            res.json({ loggedIn: true, user: req.user });
        } else {
            res.json({ loggedIn: false });
        }
    };

    // [POST] /sigout
    signout(req, res, next) {
        res.clearCookie('jwt', {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'Lax',
        });
        res.status(200).json({ message: 'Đăng xuất thành công' });
    }

    // [POST] /dang-ky
    async create(req, res, next) {

        const { fullName, userName, email, phoneNumber, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            fullName,
            userName,
            email,
            phoneNumber,
            password: hashedPassword
        });
        newUser.save()
            .then(savedUser => {
                res.status(201).json({
                    message: 'User created successfully',
                    data: savedUser,
                });
            })
            .catch(error => {
                console.error('Error creating User:', error);
                res.status(500).json({
                    message: 'Error creating User',
                    error: error.message,
                });
            });
    }

    // [POST] /dang-nhap
    async login(req, res, next) {
        try {
            const { input, password } = req.body;

            if (!input || !password) {
                return res.status(400).json({ message: 'Vui lòng nhập đủ thông tin đăng nhập!' });
            }

            // Tìm người dùng theo userName hoặc email
            // $or trong MongoDB là một toán tử logic cho phép bạn tìm kiếm theo nhiều điều kiện thay thế,
            // tức là chỉ cần một trong các điều kiện đúng thì kết quả sẽ được trả về.
            const user = await User.findOne({
                $or: [
                    { userName: input },
                    { email: input }
                ]
            });

            if (!user) {
                return res.status(401).json({ message: 'Tài khoản không tồn tại' });
            }

            // So sánh mật khẩu
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Sai mật khẩu' });
            }

            // Tạo JWT
            // tạo payload có id=user._id
            const token = jwt.sign(
                { id: user._id, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: '1d' }
            );

            // Gửi token bằng cookie
            res.cookie('jwt', token, {
                httpOnly: true,
                maxAge: 1 * 24 * 60 * 60 * 1000, // 1 ngày
                secure: process.env.NODE_ENV !== 'development', // nếu k ở chế độ dev -> secure: true | sau này deploy lên thì thay sang NODE_ENV=production
                sameSite: 'Lax', // hoặc Strict 
            });

            // Thành công
            res.status(200).json({
                message: 'Đăng nhập thành công',
                user: {
                    id: user._id,
                    fullName: user.fullName,
                    userName: user.userName,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                    role: user.role
                }
            });

        } catch (error) {
            console.error('Error logging in:', error);
            res.status(500).json({
                message: 'Lỗi đăng nhập',
                error: error.message
            });
        }
    }
}

module.exports = new AuthController;