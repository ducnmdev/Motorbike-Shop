import React, { useState } from 'react';
import axios from 'axios';

function CreateAccessory() {

    const [tenPhuTung, setTenPhuTung] = useState('')
    const [gia, setGia] = useState(0)
    const [soLuong, setSoLuong] = useState(0)
    const [chiTietPhuTung, setChiTietPhuTung] = useState('')
    const [imgPhuTung, setImgPhuTung] = useState(null)


    const handleSubmit = async (event) => {
        event.preventDefault();

        // Tạo đối tượng FormData để chứa dữ liệu
        const formData = new FormData();

        if (imgPhuTung) {
            formData.append('imgPhuTung', imgPhuTung);
        }
        formData.append('tenPhuTung', tenPhuTung);
        formData.append('soLuong', soLuong);
        formData.append('gia', gia);
        formData.append('chiTietPhuTung', chiTietPhuTung);

        // console.log(phienBan);

        try {
            const response = await axios.post('http://localhost:5000/api/v1/phu-tung/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error uploading Accessory data', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-1/2 mx-auto p-4 border-1 border-neutral-200 rounded-md overflow-y-auto h-screen">
            <h3 className='text-[#de0000] text-center'>Thêm phụ tùng</h3>
            <div className="mb-2">
                <label className="block mb-2 text-sm font-medium dark:text-white">Tên phụ tùng <span className='text-[#de0000]'>*</span></label>
                <input
                    className="bg-gray-50 border border-gray-300 text-sm rounded-sm w-full p-2.5"
                    type="text"
                    name="tenPhuTung"
                    value={tenPhuTung}
                    placeholder='Nhập tên phụ tùng...'
                    onChange={(e) => setTenPhuTung(e.target.value)}
                />
            </div>

            <div className="mb-2">
                <label className="block mb-2 text-sm font-medium dark:text-white">Giá <span className='text-[#de0000]'>*</span></label>
                <input
                    className="bg-gray-50 border border-gray-300 text-sm rounded-sm w-full p-2.5"
                    type="number"
                    name="gia"
                    value={gia}
                    onChange={(e) => setGia(e.target.value)}
                />
            </div>

            <div className="mb-2">
                <label className="block mb-2 text-sm font-medium dark:text-white">Số lượng <span className='text-[#de0000]'>*</span></label>
                <input
                    className="bg-gray-50 border border-gray-300 text-sm rounded-sm w-full p-2.5"
                    type="number"
                    name="soLuong"
                    value={soLuong}
                    onChange={(e) => setSoLuong(e.target.value)}
                />
            </div>

            <div className="mb-2">
                <label className="block mb-2 text-sm font-medium dark:text-white">Chi tiết phụ tùng <span className='text-[#de0000]'>*</span></label>
                <input
                    className="bg-gray-50 border border-gray-300 text-sm rounded-sm w-full p-2.5"
                    type="text"
                    name="chiTietPhuTung"
                    value={chiTietPhuTung}
                    placeholder='Nhập chi tiết phụ tùng...'
                    onChange={(e) => setChiTietPhuTung(e.target.value)}
                />
            </div>

            <div className="mb-2">
                <label className="block mb-2 text-sm font-medium dark:text-white">Hình ảnh phụ tùng <span className='text-[#de0000]'>*</span></label>
                <input
                    type="file"
                    name="banner"
                    accept="image/*"
                    className="bg-gray-50 border border-gray-300 text-sm rounded-sm w-full p-2.5"
                    onChange={(e) => { setImgPhuTung(e.target.files[0]) }}
                />
                {imgPhuTung && (
                    <div className="mt-2 flex flex-wrap">
                        <div className="flex items-center mb-2">
                            <img
                                src={URL.createObjectURL(imgPhuTung)} // Tạo URL tạm thời cho hình ảnh
                                alt={imgPhuTung.name}
                                className="h-36 w-36 m-1 object-cover rounded-md"
                            />
                        </div>
                    </div>
                )}
            </div>

            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-sm text-sm w-full px-5 py-2.5 mt-4">
                Thêm sản phẩm
            </button>
        </form>
    );
}

export default CreateAccessory;
