import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function CreateMotorcycle() {

    const [tenXe, setTenXe] = useState('')
    const [giaChiTu, setGiaChiTu] = useState(0)
    const [banner, setBanner] = useState(null)
    const [imgTinhNang, setImgTinhNang] = useState(null)
    const [imgThietKe, setImgThietKe] = useState(null)
    const [imgDongCo, setImgDongCo] = useState(null)
    const [imgCongNghe, setImgCongNghe] = useState(null)
    const [imgTienIchAnToan, setImgTienIchAnToan] = useState(null)
    const [tenTinhNang, setTenTinhNang] = useState('')
    const [noiDungTN, setNoiDungTN] = useState('')
    const [thietKe, setThietKe] = useState('')
    const [dongCo, setDongCo] = useState('')
    const [congNghe, setCongNghe] = useState('')
    const [tienIchAnToan, setTienIchAnToan] = useState('')
    const [khoiLuongBanThan, setKhoiLuongBanThan] = useState('')
    const [daiRongCao, setDaiRongCao] = useState('')
    const [khoangCachTrucBanhXe, setKhoangCachTrucBanhXe] = useState('')
    const [doCaoYen, setDoCaoYen] = useState('')
    const [khoangSangGamXe, setKhoangSangGamXe] = useState('')
    const [dungTichBinhXang, setDungTichBinhXang] = useState('')
    const [kichCoLopTruocSau, setKichCoLopTruocSau] = useState('')
    const [phuocTruoc, setPhuocTruoc] = useState('')
    const [phuocSau, setPhuocSau] = useState('')
    const [loaiDongCo, setLoaiDongCo] = useState('')
    const [congXuatToiDa, setCongXuatToiDa] = useState('')
    const [dungTichNhotMay, setDungTichNhotMay] = useState('')
    const [mucTieuThuNhienLieu, setMucTieuThuNhienLieu] = useState('')
    const [hopSo, setHopSo] = useState('')
    const [heThongKhoiDong, setHeThongKhoiDong] = useState('')
    const [momentCucDai, setMomentCucDai] = useState('')
    const [dungTichXyLanh, setDungTichXyLanh] = useState('')
    const [duongKinhxHanhTrinhPitTong, setDuongKinhxHanhTrinhPitTong] = useState('')
    const [tySoNen, setTySoNen] = useState('')
    const [libImg, setLibImg] = useState([])
    const [kieuXe, setKieuXe] = useState("")

    const [phienBan, setPhienBan] = useState([
        {
            tenPhienBan: '',
            mauSac: [
                { tenMau: '', hex: [''], imgXe: null, gia: 0, soLuong: 0 }
            ],
        },
    ]);

    const location = useLocation()
    const { item } = location.state || {}
    const { isEdit } = location.state || false
    // console.log(item);
    

    useEffect(() => {
        if (isEdit && item) {
            setTenXe(item.tenXe || '');
            setGiaChiTu(item.giaChiTu || 0);
            setBanner(item.banner || null);
            setImgTinhNang(item.imgTinhNang || null);
            setImgThietKe(item.imgThietKe || null);
            setImgDongCo(item.imgDongCo || null);
            setImgCongNghe(item.imgCongNghe || null);
            setImgTienIchAnToan(item.imgTienIchAnToan || null);
            setTenTinhNang(item.tenTinhNang || '');
            setNoiDungTN(item.noiDungTN || '');
            setThietKe(item.thietKe || '');
            setDongCo(item.dongCo || '');
            setCongNghe(item.congNghe || '');
            setTienIchAnToan(item.tienIchAnToan || '');
            setKhoiLuongBanThan(item.khoiLuongBanThan || '');
            setDaiRongCao(item.daiRongCao || '');
            setKhoangCachTrucBanhXe(item.khoangCachTrucBanhXe || '');
            setDoCaoYen(item.doCaoYen || '');
            setKhoangSangGamXe(item.khoangSangGamXe || '');
            setDungTichBinhXang(item.dungTichBinhXang || '');
            setKichCoLopTruocSau(item.kichCoLopTruocSau || '');
            setPhuocTruoc(item.phuocTruoc || '');
            setPhuocSau(item.phuocSau || '');
            setLoaiDongCo(item.loaiDongCo || '');
            setCongXuatToiDa(item.congXuatToiDa || '');
            setDungTichNhotMay(item.dungTichNhotMay || '');
            setMucTieuThuNhienLieu(item.mucTieuThuNhienLieu || '');
            setHopSo(item.hopSo || '');
            setHeThongKhoiDong(item.heThongKhoiDong || '');
            setMomentCucDai(item.momentCucDai || '');
            setDungTichXyLanh(item.dungTichXyLanh || '');
            setDuongKinhxHanhTrinhPitTong(item.duongKinhxHanhTrinhPitTong || '');
            setTySoNen(item.tySoNen || '');
            setLibImg(item.libImg || []);
            setKieuXe(item.kieuXe || '');
            setPhienBan(item.phienBan || [
                {
                    tenPhienBan: '',
                    mauSac: [{ tenMau: '', hex: [''], imgXe: null, gia: 0, soLuong: 0 }]
                }
            ]);
        }
    }, [isEdit, item]);


    const handleAddLibImg = (e) => {
        const selectedFiles = Array.from(e.target.files)
        const newFiles = selectedFiles.filter(file => !libImg.some(img => img.name === file.name));
        setLibImg((prevImgs) => {
            return (
                [...prevImgs, ...newFiles]
            )
        })
    }

    const handleAddPhienBan = () => {
        setPhienBan([...phienBan, { tenPhienBan: '', mauSac: [{ tenMau: '', hex: [''], imgXe: '', gia: 0, soLuong: 0 }] }]);
    };

    const handleAddMauSac = (index) => {
        const newPhienBan = [...phienBan];
        newPhienBan[index].mauSac.push({ tenMau: '', hex: [''], imgXe: '', gia: 0, soLuong: 0 });
        setPhienBan(newPhienBan);
    };

    const handleAddHex = (phienBanIndex, mauSacIndex) => {
        const newPhienBan = [...phienBan];
        newPhienBan[phienBanIndex].mauSac[mauSacIndex].hex.push('');
        setPhienBan(newPhienBan);
    };

    const handlePhienBanChange = (index, field, value) => {
        const newPhienBan = [...phienBan];
        newPhienBan[index][field] = value;
        setPhienBan(newPhienBan);
    };

    const handleMauSacChange = (phienBanIndex, mauSacIndex, field, value) => {
        const newPhienBan = [...phienBan];
        newPhienBan[phienBanIndex].mauSac[mauSacIndex][field] = value;
        setPhienBan(newPhienBan);
    };

    const handleImgChange = (phienBanIndex, mauSacIndex, field, file) => {
        const newPhienBan = [...phienBan];
        newPhienBan[phienBanIndex].mauSac[mauSacIndex][field] = file;
        setPhienBan(newPhienBan);
    };

    const handleHexChange = (phienBanIndex, mauSacIndex, hexIndex, value) => {
        const newPhienBan = [...phienBan];
        newPhienBan[phienBanIndex].mauSac[mauSacIndex].hex[hexIndex] = value;
        setPhienBan(newPhienBan);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Tạo đối tượng FormData để chứa dữ liệu
        const formData = new FormData();

        phienBan.forEach((pb) => {
            pb.mauSac.forEach((mau) => {
                if (mau.imgXe) {
                    formData.append('imgXe', mau.imgXe);
                }
            });
        });

        libImg.forEach((img) => {
            formData.append('libImg', img)
        })
        if (banner) {
            formData.append('banner', banner);
        }
        if (imgTinhNang) {
            formData.append('imgTinhNang', imgTinhNang);
        }
        if (imgThietKe) {
            formData.append('imgThietKe', imgThietKe);
        }
        if (imgCongNghe) {
            formData.append('imgCongNghe', imgCongNghe);
        }
        if (imgDongCo) {
            formData.append('imgDongCo', imgDongCo);
        }
        if (imgTienIchAnToan) {
            formData.append('imgTienIchAnToan', imgTienIchAnToan);
        }
        formData.append('kieuXe', kieuXe);
        formData.append('tenXe', tenXe);
        formData.append('giaChiTu', giaChiTu);
        formData.append('tenTinhNang', tenTinhNang);
        formData.append('noiDungTN', noiDungTN);
        formData.append('thietKe', thietKe);
        formData.append('dongCo', dongCo);
        formData.append('congNghe', congNghe);
        formData.append('tienIchAnToan', tienIchAnToan);
        formData.append('khoiLuongBanThan', khoiLuongBanThan);
        formData.append('daiRongCao', daiRongCao);
        formData.append('khoangCachTrucBanhXe', khoangCachTrucBanhXe);
        formData.append('doCaoYen', doCaoYen);
        formData.append('khoangSangGamXe', khoangSangGamXe);
        formData.append('dungTichBinhXang', dungTichBinhXang);
        formData.append('kichCoLopTruocSau', kichCoLopTruocSau);
        formData.append('phuocTruoc', phuocTruoc);
        formData.append('phuocSau', phuocSau);
        formData.append('loaiDongCo', loaiDongCo);
        formData.append('congXuatToiDa', congXuatToiDa);
        formData.append('dungTichNhotMay', dungTichNhotMay);
        formData.append('mucTieuThuNhienLieu', mucTieuThuNhienLieu);
        formData.append('hopSo', hopSo);
        formData.append('heThongKhoiDong', heThongKhoiDong);
        formData.append('momentCucDai', momentCucDai);
        formData.append('dungTichXyLanh', dungTichXyLanh);
        formData.append('duongKinhxHanhTrinhPitTong', duongKinhxHanhTrinhPitTong);
        formData.append('tySoNen', tySoNen);
        formData.append('phienBan', JSON.stringify(phienBan))

        if (isEdit) {
            await axios.patch(
                `http://localhost:5000/api/v1/admin/update-motorcycle/${item._id}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
                alert('Sửa thành công!')
        } else {
            try {
                // const response = 
                await axios.post('http://localhost:5000/api/v1/xe-may/create', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                alert('Thêm thành công!')
                // console.log(response.data);
            } catch (error) {
                console.error('Error uploading motorcycle data', error);
            }
        }


    };

    return (
        <form onSubmit={handleSubmit} className="w-1/2 mx-auto p-4 border-1 border-neutral-200 rounded-md overflow-y-auto h-screen">
            <h3 className='text-[#de0000] text-center'>{isEdit ? 'Sửa xe máy' : 'Thêm xe máy'}</h3>
            <div className="mb-2">
                <label className="block mb-2 text-sm font-medium dark:text-white">Banner <span className='text-[#de0000]'>*</span></label>
                <input
                    type="file"
                    name="banner"
                    accept="image/*"
                    className="bg-gray-50 border border-gray-300 text-sm rounded-sm w-full p-2.5"
                    onChange={(e) => { setBanner(e.target.files[0]) }}
                />
                {banner && (
                    <div className="mt-2 flex flex-wrap">
                        <div className="flex items-center mb-2">
                            <img
                                src={
                                    typeof banner === 'string'
                                        ? `http://localhost:5000/uploads/${banner}`
                                        : URL.createObjectURL(banner)
                                }
                                alt={banner.name}
                                className="h-36 w-36 m-1 object-cover rounded-md"
                            />
                        </div>
                    </div>
                )}
            </div>

            <div className="mb-2">
                <label className="block mb-2 text-sm font-medium dark:text-white">Tên xe <span className='text-[#de0000]'>*</span></label>
                <input
                    className="bg-gray-50 border border-gray-300 text-sm rounded-sm w-full p-2.5"
                    type="text"
                    name="tenXe"
                    value={tenXe}
                    placeholder='Nhập tên xe...'
                    onChange={(e) => setTenXe(e.target.value)}
                />
            </div>

            <div className="mb-2">
                <label className="block mb-2 text-sm font-medium dark:text-white">Giá chỉ từ <span className='text-[#de0000]'>*</span></label>
                <input
                    className="bg-gray-50 border border-gray-300 text-sm rounded-sm w-full p-2.5"
                    type="number"
                    name="giaChiTu"
                    value={giaChiTu}
                    onChange={(e) => setGiaChiTu(e.target.value)}
                />
            </div>

            <div className="mb-2">
                <label className="block mb-2 text-sm font-medium dark:text-white">
                    Kiểu xe <span className='text-[#de0000]'>*</span>
                </label>
                <select
                    className="bg-gray-50 border border-gray-300 text-sm rounded-sm w-full p-2.5"
                    name="kieuXe"
                    value={kieuXe}
                    onChange={(e) => setKieuXe(e.target.value)}
                >
                    <option value="xe-tay-ga">Xe tay ga</option>
                    <option value="xe-so">Xe số</option>
                    <option value="xe-con-tay">Xe côn tay</option>
                    <option value="xe-phan-khoi-lon">Xe phân khối lớn</option>
                </select>
            </div>


            {phienBan.map((pb, index) => (
                <div key={index} className="mb-2">
                    <h3 className="text-base font-medium text-[#de0000]">Phiên bản {index + 1}</h3>

                    <div className="mb-2">
                        <label className="block mb-2 text-sm font-medium dark:text-white">Tên phiên bản <span className='text-[#de0000]'>*</span></label>
                        <input
                            className="bg-gray-50 border border-gray-300 text-sm rounded-sm w-full p-2.5"
                            type="text"
                            name={`phienBan[${index}].tenPhienBan`}
                            value={pb.tenPhienBan}
                            placeholder='Nhập tên phiên bản...'
                            onChange={(e) => handlePhienBanChange(index, 'tenPhienBan', e.target.value)}
                        />
                    </div>

                    {pb.mauSac.map((ms, msIndex) => (
                        <div key={msIndex} className="mb-2">
                            <h4 className="text-base font-medium text-[#de0000]">Màu sắc {msIndex + 1}</h4>

                            <div className="mb-2">
                                <label className="block text-sm font-medium">Tên màu <span className='text-[#de0000]'>*</span></label>
                                <input
                                    type="text"
                                    name={`phienBan[${index}].mauSac[${msIndex}].tenMau`}
                                    value={ms.tenMau}
                                    onChange={(e) => handleMauSacChange(index, msIndex, 'tenMau', e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-sm rounded-sm w-full p-2.5"
                                    placeholder='Nhập tên màu sắc...'
                                />
                            </div>

                            {ms.hex.map((hex, hexIndex) => (
                                <div key={hexIndex} className="mb-2">
                                    <label className="block text-sm font-medium">Mã màu (hex) <span className='text-[#de0000]'>*</span></label>
                                    <input
                                        type="text"
                                        name={`phienBan[${index}].mauSac[${msIndex}].hex[${hexIndex}]`}
                                        value={hex}
                                        onChange={(e) => handleHexChange(index, msIndex, hexIndex, e.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-sm rounded-sm w-full p-2.5"
                                        placeholder='Nhập mã màu...'
                                    />
                                </div>
                            ))}

                            <button type="button" onClick={() => handleAddHex(index, msIndex)} className="text-blue-500 mb-2">
                                + Thêm mã màu (hex)
                            </button>

                            <div className="mb-2">
                                <label className="block text-sm font-medium">Ảnh xe <span className='text-[#de0000]'>*</span></label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    name={`phienBan[${index}].mauSac[${msIndex}].imgXe`}
                                    onChange={(e) => handleImgChange(index, msIndex, 'imgXe', e.target.files[0])}
                                    className="bg-gray-50 border border-gray-300 text-sm rounded-sm w-full p-2.5"
                                />
                                {phienBan[index].mauSac[msIndex].imgXe && (
                                    <div className="mt-2 flex flex-wrap">
                                        <div className="flex items-center mb-2">
                                            <img
                                                src={
                                                    typeof phienBan[index].mauSac[msIndex].imgXe === 'string'
                                                        ? `http://localhost:5000/uploads/${phienBan[index].mauSac[msIndex].imgXe}`
                                                        : URL.createObjectURL(phienBan[index].mauSac[msIndex].imgXe)
                                                }
                                                alt={phienBan[index].mauSac[msIndex].imgXe.name}
                                                className="h-36 w-36 m-1 object-cover rounded-md"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="mb-2">
                                <label className="block text-sm font-medium">Giá <span className='text-[#de0000]'>*</span></label>
                                <input
                                    type="number"
                                    name={`phienBan[${index}].mauSac[${msIndex}].gia`}
                                    value={ms.gia}
                                    onChange={(e) => handleMauSacChange(index, msIndex, 'gia', e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-sm rounded-sm w-full p-2.5"
                                />
                            </div>

                            <div className="mb-2">
                                <label className="block text-sm font-medium">Số lượng <span className='text-[#de0000]'>*</span></label>
                                <input
                                    type="number"
                                    name={`phienBan[${index}].mauSac[${msIndex}].soLuong`}
                                    value={ms.soLuong}
                                    onChange={(e) => handleMauSacChange(index, msIndex, 'soLuong', e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-sm rounded-sm w-full p-2.5"
                                />
                            </div>
                        </div>
                    ))}

                    <button type="button" onClick={() => handleAddMauSac(index)} className="text-blue-500">
                        + Thêm màu sắc
                    </button>
                </div>
            ))}

            <button type="button" onClick={handleAddPhienBan} className="text-blue-500 mb-3">
                + Thêm phiên bản
            </button>

            <br />

            <div className="mb-2">
                <label className="block mb-2 text-sm font-medium dark:text-white">Tính năng nổi bật</label>
                <input
                    type="text"
                    name="tenTinhNang"
                    value={tenTinhNang}
                    className="bg-gray-50 border border-gray-300 text-sm rounded-sm w-full p-2.5"
                    placeholder='Nhập tên tính năng nổi bật...'
                    onChange={(e) => setTenTinhNang(e.target.value)}
                />
            </div>

            <div className="mb-2">
                <label className="block mb-2 text-sm font-medium dark:text-white">Nội dung tính năng</label>
                <input
                    type="text"
                    name="noiDungTN"
                    value={noiDungTN}
                    className="bg-gray-50 border border-gray-300 text-sm rounded-sm w-full p-2.5"
                    placeholder='Nhập nội dung tính năng...'
                    onChange={(e) => setNoiDungTN(e.target.value)}
                />
            </div>

            <div className="mb-2">
                <label className="block mb-2 text-sm font-medium dark:text-white">Ảnh tính năng</label>
                <input
                    type="file"
                    name="imgTinhNang"
                    accept="image/*"
                    className="bg-gray-50 border border-gray-300 text-sm rounded-sm w-full p-2.5"
                    onChange={(e) => { setImgTinhNang(e.target.files[0]) }}
                />
                {imgTinhNang && (
                    <div className="mt-2 flex flex-wrap">
                        <div className="flex items-center mb-2">
                            <img
                                src={
                                    typeof imgTinhNang === 'string'
                                        ? `http://localhost:5000/uploads/${imgTinhNang}`
                                        : URL.createObjectURL(imgTinhNang)
                                }
                                alt={imgTinhNang.name}
                                className="h-36 w-36 m-1 object-cover rounded-md"
                            />
                        </div>
                    </div>
                )}
            </div>

            <div className="mb-2">
                <label className="block mb-2 text-sm font-medium dark:text-white">Thiết kế</label>
                <input
                    type="text"
                    name="thietKe"
                    value={thietKe}
                    className="bg-gray-50 border border-gray-300 text-sm rounded-sm w-full p-2.5"
                    placeholder='Nhập thiết kế...'
                    onChange={(e) => setThietKe(e.target.value)}
                />
            </div>

            <div className="mb-2">
                <label className="block mb-2 text-sm font-medium dark:text-white">Ảnh thiết kế</label>
                <input
                    type="file"
                    name="imgThietKe"
                    accept="image/*"
                    className="bg-gray-50 border border-gray-300 text-sm rounded-sm w-full p-2.5"
                    onChange={(e) => { setImgThietKe(e.target.files[0]) }}
                />
                {imgThietKe && (
                    <div className="mt-2 flex flex-wrap">
                        <div className="flex items-center mb-2">
                            <img
                                src={
                                    typeof imgThietKe === 'string'
                                        ? `http://localhost:5000/uploads/${imgThietKe}`
                                        : URL.createObjectURL(imgThietKe)
                                }
                                alt={imgThietKe.name}
                                className="h-36 w-36 m-1 object-cover rounded-md"
                            />
                        </div>
                    </div>
                )}

            </div>

            <div className="mb-2">
                <label className="block mb-2 text-sm font-medium dark:text-white">Động cơ</label>
                <input
                    type="text"
                    name="dongCo"
                    value={dongCo}
                    className="bg-gray-50 border border-gray-300 text-sm rounded-sm w-full p-2.5"
                    placeholder='Nhập động cơ...'
                    onChange={(e) => setDongCo(e.target.value)}
                />
            </div>

            <div className="mb-2">
                <label className="block mb-2 text-sm font-medium dark:text-white">Ảnh động cơ</label>
                <input
                    type="file"
                    name="imgDongCo"
                    accept="image/*"
                    className="bg-gray-50 border border-gray-300 text-sm rounded-sm w-full p-2.5"
                    onChange={(e) => { setImgDongCo(e.target.files[0]) }}
                />
                {imgDongCo && (
                    <div className="mt-2 flex flex-wrap">
                        <div className="flex items-center mb-2">
                            <img
                                src={
                                    typeof imgDongCo === 'string'
                                        ? `http://localhost:5000/uploads/${imgDongCo}`
                                        : URL.createObjectURL(imgDongCo)
                                }
                                alt={imgDongCo.name}
                                className="h-36 w-36 m-1 object-cover rounded-md"
                            />
                        </div>
                    </div>
                )}

            </div>

            <div className="mb-2">
                <label className="block mb-2 text-sm font-medium dark:text-white">Công nghệ</label>
                <input
                    type="text"
                    name="congNghe"
                    value={congNghe}
                    className="bg-gray-50 border border-gray-300 text-sm rounded-sm w-full p-2.5"
                    placeholder='Nhập công nghệ...'
                    onChange={(e) => setCongNghe(e.target.value)}
                />
            </div>

            <div className="mb-2">
                <label className="block mb-2 text-sm font-medium dark:text-white">Ảnh công nghệ</label>
                <input
                    type="file"
                    name="imgCongNghe"
                    accept="image/*"
                    className="bg-gray-50 border border-gray-300 text-sm rounded-sm w-full p-2.5"
                    onChange={(e) => { setImgCongNghe(e.target.files[0]) }}
                />
                {imgCongNghe && (
                    <div className="mt-2 flex flex-wrap">
                        <div className="flex items-center mb-2">
                            <img
                                src={
                                    typeof imgCongNghe === 'string'
                                        ? `http://localhost:5000/uploads/${imgCongNghe}`
                                        : URL.createObjectURL(imgCongNghe)
                                }
                                alt={imgCongNghe.name}
                                className="h-36 w-36 m-1 object-cover rounded-md"
                            />
                        </div>
                    </div>
                )}

            </div>

            <div className="mb-2">
                <label className="block mb-2 text-sm font-medium dark:text-white">Tiện ích & An toàn</label>
                <input
                    type="text"
                    name="tienIchAnToan"
                    value={tienIchAnToan}
                    className="bg-gray-50 border border-gray-300 text-sm rounded-sm w-full p-2.5"
                    placeholder='Nhập tiện ích & an toàn...'
                    onChange={(e) => setTienIchAnToan(e.target.value)}
                />
            </div>

            <div className="mb-2">
                <label className="block mb-2 text-sm font-medium dark:text-white">Ảnh Tiện ích & An toàn</label>
                <input
                    type="file"
                    name="imgTienIchAnToan"
                    accept="image/*"
                    className="bg-gray-50 border border-gray-300 text-sm rounded-sm w-full p-2.5"
                    onChange={(e) => { setImgTienIchAnToan(e.target.files[0]) }}
                />
                {imgTienIchAnToan && (
                    <div className="mt-2 flex flex-wrap">
                        <div className="flex items-center mb-2">
                            <img
                                src={
                                    typeof imgTienIchAnToan === 'string'
                                        ? `http://localhost:5000/uploads/${imgTienIchAnToan}`
                                        : URL.createObjectURL(imgTienIchAnToan)

                                }
                                alt={imgTienIchAnToan.name}
                                className="h-36 w-36 m-1 object-cover rounded-md"
                            />
                        </div>
                    </div>
                )}

            </div>

            <div className="mb-2">
                <label className="block mb-2 text-sm font-medium dark:text-white">Khối lượng bản thân</label>
                <input
                    type="text"
                    name="khoiLuongBanThan"
                    value={khoiLuongBanThan}
                    className="bg-gray-50 border border-gray-300 text-sm rounded-sm w-full p-2.5"
                    placeholder='Nhập khối lượng bản thân...'
                    onChange={(e) => setKhoiLuongBanThan(e.target.value)}
                />
            </div>

            <div className="mb-2">
                <label className="block mb-2 text-sm font-medium dark:text-white">Dài rộng cao</label>
                <input
                    type="text"
                    name="daiRongCao"
                    value={daiRongCao}
                    className="bg-gray-50 border border-gray-300 text-sm rounded-sm w-full p-2.5"
                    placeholder='Nhập dài rộng cao...'
                    onChange={(e) => setDaiRongCao(e.target.value)}
                />
            </div>

            <div className="mb-2">
                <label className="block mb-2 text-sm font-medium dark:text-white">Khoảng cách trục bánh xe</label>
                <input
                    type="text"
                    name="khoangCachTrucBanhXe"
                    value={khoangCachTrucBanhXe}
                    className="bg-gray-50 border border-gray-300 text-sm rounded-sm w-full p-2.5"
                    placeholder='Nhập khoảng cách trục bánh xe...'
                    onChange={(e) => setKhoangCachTrucBanhXe(e.target.value)}
                />
            </div>

            <div className="mb-2">
                <label className="block mb-2 text-sm font-medium dark:text-white">Độ cao yên</label>
                <input
                    type="text"
                    name="doCaoYen"
                    value={doCaoYen}
                    className="bg-gray-50 border border-gray-300 text-sm rounded-sm w-full p-2.5"
                    placeholder='Nhập độ cao yên...'
                    onChange={(e) => setDoCaoYen(e.target.value)}
                />
            </div>

            <div className="mb-2">
                <label className="block mb-2 text-sm font-medium dark:text-white">Khoảng sáng gầm xe</label>
                <input
                    type="text"
                    name="khoangSangGamXe"
                    value={khoangSangGamXe}
                    className="bg-gray-50 border border-gray-300 text-sm rounded-sm w-full p-2.5"
                    placeholder='Nhập khoảng sáng gầm xe...'
                    onChange={(e) => setKhoangSangGamXe(e.target.value)}
                />
            </div>

            <div className="mb-2">
                <label className="block mb-2 text-sm font-medium dark:text-white">Dung tích bình xăng</label>
                <input
                    type="text"
                    name="dungTichBinhXang"
                    value={dungTichBinhXang}
                    className="bg-gray-50 border border-gray-300 text-sm rounded-sm w-full p-2.5"
                    placeholder='Nhập dung tích bình xăng...'
                    onChange={(e) => setDungTichBinhXang(e.target.value)}
                />
            </div>

            <div className="mb-2">
                <label className="block mb-2 text-sm font-medium dark:text-white">Kích thước lốp trước và sau</label>
                <input
                    type="text"
                    name="kichCoLopTruocSau"
                    value={kichCoLopTruocSau}
                    className="bg-gray-50 border border-gray-300 text-sm rounded-sm w-full p-2.5"
                    placeholder='Nhập kích thước lốp trước và sau...'
                    onChange={(e) => setKichCoLopTruocSau(e.target.value)}
                />
            </div>

            <div className="mb-2">
                <label className="block mb-2 text-sm font-medium dark:text-white">Phuộc trước</label>
                <input
                    type="text"
                    name="phuocTruoc"
                    value={phuocTruoc}
                    className="bg-gray-50 border border-gray-300 text-sm rounded-sm w-full p-2.5"
                    placeholder='Nhập phuộc trước...'
                    onChange={(e) => setPhuocTruoc(e.target.value)}
                />
            </div>

            <div className="mb-2">
                <label className="block mb-2 text-sm font-medium dark:text-white">Phuộc sau</label>
                <input
                    type="text"
                    name="phuocSau"
                    value={phuocSau}
                    className="bg-gray-50 border border-gray-300 text-sm rounded-sm w-full p-2.5"
                    placeholder='Nhập phuộc sau...'
                    onChange={(e) => setPhuocSau(e.target.value)}
                />
            </div>

            <div className="mb-2">
                <label className="block mb-2 text-sm font-medium dark:text-white">Loại động cơ</label>
                <input
                    type="text"
                    name="loaiDongCo"
                    value={loaiDongCo}
                    className="bg-gray-50 border border-gray-300 text-sm rounded-sm w-full p-2.5"
                    placeholder='Nhập loại động cơ...'
                    onChange={(e) => setLoaiDongCo(e.target.value)}
                />
            </div>

            <div className="mb-2">
                <label className="block mb-2 text-sm font-medium dark:text-white">Công xuất tối đa</label>
                <input
                    type="text"
                    name="congXuatToiDa"
                    value={congXuatToiDa}
                    className="bg-gray-50 border border-gray-300 text-sm rounded-sm w-full p-2.5"
                    placeholder='Nhập công xuất tối đa...'
                    onChange={(e) => setCongXuatToiDa(e.target.value)}
                />
            </div>

            <div className="mb-2">
                <label className="block mb-2 text-sm font-medium dark:text-white">Dung tích nhớt máy</label>
                <input
                    type="text"
                    name="dungTichNhotMay"
                    value={dungTichNhotMay}
                    className="bg-gray-50 border border-gray-300 text-sm rounded-sm w-full p-2.5"
                    placeholder='Nhập dung tích nhớt máy...'
                    onChange={(e) => setDungTichNhotMay(e.target.value)}
                />
            </div>

            <div className="mb-2">
                <label className="block mb-2 text-sm font-medium dark:text-white">Mức tiêu phụ nhiên liệu</label>
                <input
                    type="text"
                    name="mucTieuThuNhienLieu"
                    value={mucTieuThuNhienLieu}
                    className="bg-gray-50 border border-gray-300 text-sm rounded-sm w-full p-2.5"
                    placeholder='Nhập mức thiêu thụ nhiên liệu...'
                    onChange={(e) => setMucTieuThuNhienLieu(e.target.value)}
                />
            </div>

            <div className="mb-2">
                <label className="block mb-2 text-sm font-medium dark:text-white">Hộp số</label>
                <input
                    type="text"
                    name="hopSo"
                    value={hopSo}
                    className="bg-gray-50 border border-gray-300 text-sm rounded-sm w-full p-2.5"
                    placeholder='Nhập hộp số...'
                    onChange={(e) => setHopSo(e.target.value)}
                />
            </div>

            <div className="mb-2">
                <label className="block mb-2 text-sm font-medium dark:text-white">Hệ thống khởi động</label>
                <input
                    type="text"
                    name="heThongKhoiDong"
                    value={heThongKhoiDong}
                    className="bg-gray-50 border border-gray-300 text-sm rounded-sm w-full p-2.5"
                    placeholder='Nhập hệ thống khởi động...'
                    onChange={(e) => setHeThongKhoiDong(e.target.value)}
                />
            </div>

            <div className="mb-2">
                <label className="block mb-2 text-sm font-medium dark:text-white">Moment cực đại</label>
                <input
                    type="text"
                    name="momentCucDai"
                    value={momentCucDai}
                    className="bg-gray-50 border border-gray-300 text-sm rounded-sm w-full p-2.5"
                    placeholder='Nhập moment cực đại...'
                    onChange={(e) => setMomentCucDai(e.target.value)}
                />
            </div>

            <div className="mb-2">
                <label className="block mb-2 text-sm font-medium dark:text-white">Dung tích xy lanh</label>
                <input
                    type="text"
                    name="dungTichXyLanh"
                    value={dungTichXyLanh}
                    className="bg-gray-50 border border-gray-300 text-sm rounded-sm w-full p-2.5"
                    placeholder='Nhập dung tích xy lanh...'
                    onChange={(e) => setDungTichXyLanh(e.target.value)}
                />
            </div>

            <div className="mb-2">
                <label className="block mb-2 text-sm font-medium dark:text-white">Đường kính x Hành trình pít tông</label>
                <input
                    type="text"
                    name="duongKinhxHanhTrinhPitTong"
                    value={duongKinhxHanhTrinhPitTong}
                    className="bg-gray-50 border border-gray-300 text-sm rounded-sm w-full p-2.5"
                    placeholder='Nhập đường kính x Hành trình pít tông...'
                    onChange={(e) => setDuongKinhxHanhTrinhPitTong(e.target.value)}
                />
            </div>

            <div className="mb-2">
                <label className="block mb-2 text-sm font-medium dark:text-white">Tỷ số nén</label>
                <input
                    type="text"
                    name="tySoNen"
                    value={tySoNen}
                    className="bg-gray-50 border border-gray-300 text-sm rounded-sm w-full p-2.5"
                    placeholder='Nhập tỷ số nén...'
                    onChange={(e) => setTySoNen(e.target.value)}
                />
            </div>


            <div className="mb-2">
                <label className="block mb-2 text-sm font-medium dark:text-white">Thư viện ảnh</label>
                <input
                    type="file"
                    name="banner"
                    accept="image/*"
                    multiple
                    className="bg-gray-50 border border-gray-300 text-sm rounded-sm w-full p-2.5"
                    onChange={handleAddLibImg}
                />
                <div className="mt-2 flex flex-wrap">
                    {libImg.map((img, index) => (
                        <div key={index} className="flex items-center mb-2">
                            <img
                                src={
                                    typeof img === 'string'
                                        ? `http://localhost:5000/uploads/${img}`
                                        : URL.createObjectURL(img)

                                }
                                alt={img.name}
                                className="h-36 w-36 m-1 object-cover rounded-md"
                            />
                        </div>
                    ))}
                </div>
            </div>

            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-sm text-sm w-full px-5 py-2.5 mt-4">
                {isEdit ? 'Sửa xe máy' : 'Thêm xe máy'}
            </button>
        </form>
    );
}

export default CreateMotorcycle;
