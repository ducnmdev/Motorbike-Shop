import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function CreateAccessory() {

    const [tenPhuKien, setTenPhuKien] = useState('')
    const [gia, setGia] = useState(0)
    const [soLuong, setSoLuong] = useState(0)
    const [sanXuatBoi, setSanXuatBoi] = useState('')
    const [tinhNang, setTinhNang] = useState('')
    const [imgPhuKien, setImgPhuKien] = useState(null)

    const location = useLocation()
    const { item } = location.state || {}
    const { isEdit } = location.state || false
    console.log(item)

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Tạo đối tượng FormData để chứa dữ liệu
        const formData = new FormData();

        if (imgPhuKien) {
            formData.append('imgPhuKien', imgPhuKien);
        }
        formData.append('tenPhuKien', tenPhuKien);
        formData.append('tinhNang', tinhNang);
        formData.append('gia', gia);
        formData.append('soLuong', soLuong);
        formData.append('sanXuatBoi', sanXuatBoi);

        // console.log(phienBan);

        try {
            const response = await axios.post('http://localhost:5000/api/v1/phu-kien/create', formData, {
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
            <h3 className='text-[#de0000] text-center'>{isEdit ? 'Sửa phụ kiện' : 'Thêm phụ kiện'}</h3>
            <div className="mb-2">
                <label className="block mb-2 text-sm font-medium dark:text-white">Tên phụ kiện <span className='text-[#de0000]'>*</span></label>
                <input
                    className="bg-gray-50 border border-gray-300 text-sm rounded-sm w-full p-2.5"
                    type="text"
                    name="tenPhuKien"
                    value={tenPhuKien || item?.tenPhuKien}
                    placeholder='Nhập tên phụ kiện...'
                    onChange={(e) => setTenPhuKien(e.target.value)}
                />
            </div>

            <div className="mb-2">
                <label className="block mb-2 text-sm font-medium dark:text-white">Tính năng <span className='text-[#de0000]'>*</span></label>
                <input
                    className="bg-gray-50 border border-gray-300 text-sm rounded-sm w-full p-2.5"
                    type="text"
                    name="tinhNang"
                    value={tinhNang || item?.tinhNang}
                    placeholder='Nhập tính năng...'
                    onChange={(e) => setTinhNang(e.target.value)}
                />
            </div>

            <div className="mb-2">
                <label className="block mb-2 text-sm font-medium dark:text-white">Giá <span className='text-[#de0000]'>*</span></label>
                <input
                    className="bg-gray-50 border border-gray-300 text-sm rounded-sm w-full p-2.5"
                    type="number"
                    name="gia"
                    value={gia || item?.gia}
                    onChange={(e) => setGia(e.target.value)}
                />
            </div>

            <div className="mb-2">
                <label className="block mb-2 text-sm font-medium dark:text-white">Số lượng <span className='text-[#de0000]'>*</span></label>
                <input
                    className="bg-gray-50 border border-gray-300 text-sm rounded-sm w-full p-2.5"
                    type="number"
                    name="soLuong"
                    value={soLuong || item?.soLuong}
                    onChange={(e) => setSoLuong(e.target.value)}
                />
            </div>

            <div className="mb-2">
                <label className="block mb-2 text-sm font-medium dark:text-white">Sản xuất bởi <span className='text-[#de0000]'>*</span></label>
                <input
                    className="bg-gray-50 border border-gray-300 text-sm rounded-sm w-full p-2.5"
                    type="text"
                    name="sanXuatBoi"
                    value={sanXuatBoi || item?.sanXuatBoi}
                    placeholder='Nhập nhà sản xuất...'
                    onChange={(e) => setSanXuatBoi(e.target.value)}
                />
            </div>



            {

                    // tìm chatgpt làm sao để khi đổ dữ liệu qua state thì cái dưới này nó nhận được value

            }



            <div className="mb-2">
                <label className="block mb-2 text-sm font-medium dark:text-white">Hình ảnh phụ kiện <span className='text-[#de0000]'>*</span></label>
                <input
                    type="file"
                    name="banner"
                    accept="image/*"
                    className="bg-gray-50 border border-gray-300 text-sm rounded-sm w-full p-2.5"
                    onChange={(e) => { setImgPhuKien(e.target.files[0]) }}
                />
                {(imgPhuKien && (
                    <div className="mt-2 flex flex-wrap">
                        <div className="flex items-center mb-2">
                            <img
                                src={URL.createObjectURL(imgPhuKien)} // Tạo URL tạm thời cho hình ảnh
                                alt={imgPhuKien.name}
                                className="h-36 w-36 m-1 object-cover rounded-md"
                            />
                        </div>
                    </div>
                )) || (item?.imgPhuKien && <div className="mt-2 flex flex-wrap">
                    <div className="flex items-center mb-2">
                        <img
                            src={`http://localhost:5000/uploads/${item?.imgPhuKien}`}
                            alt={item?.imgPhuKien.name}
                            className="h-36 w-36 m-1 object-cover rounded-md"
                        />
                    </div>
                </div>
                    )}
            </div>

            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-sm text-sm w-full px-5 py-2.5 mt-4">
                {isEdit ? 'Sửa phụ kiện' : 'Thêm phụ kiện'}
            </button>
        </form>
    );
}

export default CreateAccessory;
