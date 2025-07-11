const Order = require('../models/Order')
const puppeteer = require("puppeteer");

class OrderController {

    // [POST] /checkout
    addNewOrder(req, res, next) {
        const order = req.body
        const newOrder = new Order({
            userId: order.userId,
            productId: order.productId,
            productType: order.productType,
            tenSanPham: order.tenSanPham,
            phienBan: order.phienBan,
            mauSac: order.mauSac,
            soLuong: order.soLuong,
            gia: order.tongTien,
            imgXe: order.imgXe,
            tongTien: order.tongTien,
            thongTinNguoiMua: {
                hoTen: order.thongTinNguoiMua.hoTen,
                soDienThoai: order.thongTinNguoiMua.soDienThoai,
                diaChi: order.thongTinNguoiMua.diaChi
            },
            thanhToan: {
                hinhThuc: order.thanhToan.hinhThuc,
                daThanhtoan: order.thanhToan.daThanhtoan
            },
            trangThai: order.trangThai
        })

        newOrder.save()
            .then(() => res.status(201).json({ message: 'Đặt hàng thành công!' }))
            .catch(err => {
                console.error('Lỗi khi lưu đơn hàng:', err);
                res.status(500).json({ error: 'Đặt hàng thất bại!' });
            });
    };

    // [GET] /my-orders
    async getUserOrder(req, res, next) {
        try {
            const userId = req.user.id;
            const orders = await Order.find({ userId }).sort({ createdAt: -1 });
            res.status(200).json(orders);
        } catch (err) {
            res.status(500).json({ message: 'Lỗi khi lấy đơn hàng', error: err.message });
        }
    }

    // [GET] order/motorcycle/:id
    getOrderDetail(req, res, next) {
        const { id } = req.params;
        Order.findOne({ _id: id })
            .then(order => {
                if (!order) {
                    return res.status(404).json({ message: 'Order not found' });
                }
                res.status(200).json(order);
            })
            .catch(error => res.status(500).json({ message: error.message }));

    }

    generateInvoicePDF = async (req, res, next) => {
        const { id } = req.params;

        try {
            const order = await Order.findById(id);
            if (!order) {
                return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
            }

            const html = `
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; padding: 30px; }
            h1 { text-align: center; color: red; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #999; padding: 8px; text-align: left; }
            .right { text-align: right; }
          </style>
        </head>
        <body>
          <h1>HÓA ĐƠN MUA XE</h1>
          <p><strong>Khách hàng:</strong> ${order.thongTinNguoiMua.hoTen}</p>
          <p><strong>SĐT:</strong> ${order.thongTinNguoiMua.soDienThoai}</p>
          <p><strong>Địa chỉ:</strong> ${order.thongTinNguoiMua.diaChi}</p>
          <p><strong>Ngày tạo:</strong> ${new Date(order.createdAt).toLocaleString('vi-VN')}</p>

          <table>
            <tr>
              <th>Sản phẩm</th><th>Giá tiền</th><th>Số lượng</th><th>Thành tiền</th>
            </tr>
            <tr>
              <td>${order.tenSanPham}</td>
              <td class="right">${order.tongTien.toLocaleString('vi-VN')} ₫</td>
              <td class="right">${order.soLuong || 1}</td>
              <td class="right">${order.tongTien.toLocaleString('vi-VN')} ₫</td>
            </tr>
          </table>

          <p class="right"><strong>Tổng tiền: <span style="color: red;">${order.tongTien.toLocaleString('vi-VN')} ₫</span></strong></p>
          <p><strong>Phương thức thanh toán:</strong> ${order.thanhToan.hinhThuc}</p>
          <p><strong>Trạng thái:</strong> ${order.trangThai}</p>
        </body>
      </html>
      `;

            const browser = await puppeteer.launch({ headless: 'new' });
            const page = await browser.newPage();
            await page.setContent(html, { waitUntil: 'networkidle0' });

            const pdfBuffer = await page.pdf({ format: 'A4' });
            await browser.close();

            res.writeHead(200, {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename=hoa-don-${id}.pdf`,
                'Content-Length': pdfBuffer.length,
            });

            res.end(pdfBuffer); // dùng end, không dùng send
        } catch (error) {
            console.error('Lỗi tạo PDF:', error);
            res.status(500).json({ message: 'Lỗi khi tạo hóa đơn PDF', error: error.message });
        }
    };

}

module.exports = new OrderController;