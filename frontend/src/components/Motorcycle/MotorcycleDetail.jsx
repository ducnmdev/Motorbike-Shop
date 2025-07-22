import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { OrderContext } from '../../contexts/OrderContext';
import { AuthContext } from '../../contexts/AuthContext.jsx'
import axios from 'axios'


function MotorcycleDetail({ getTenXe }) {

    const { isLoggedIn } = useContext(AuthContext)

    const navigate = useNavigate();
    const { slug } = useParams();
    const [motorcycle, setMotorcycle] = useState(null)
    const [color, setColor] = useState(1)
    const [gia, setGia] = useState(-1)
    const [soLuong, setSoLuong] = useState(-1)
    const [imgXe, setImgXe] = useState("")
    const [showTSKT, setShowTSKT] = useState(false)
    const [displayStyle, setDisplayStyle] = useState('none')

    const { setOrder } = useContext(OrderContext);

    const handleChangeInfo = (index, msIndex) => {
        setGia(motorcycle.phienBan[index].mauSac[msIndex].gia.toLocaleString('vi-VN'))
        setImgXe(`http://localhost:5000/uploads/${motorcycle.phienBan[index].mauSac[msIndex].imgXe}`)
        setSoLuong(motorcycle.phienBan[index].mauSac[msIndex].soLuong)

        setOrder(prev => ({
            ...prev,
            imgXe: motorcycle.phienBan[index].mauSac[msIndex].imgXe,
            tongTien: motorcycle.phienBan[index].mauSac[msIndex].gia,
            phienBan: motorcycle.phienBan[index].tenPhienBan,
            mauSac: motorcycle.phienBan[index].mauSac[msIndex].tenMau
        }));
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response =
                    await axios.get('http://localhost:5000/api/v1/user/account/profile', {
                        withCredentials: true // bắt buộc
                    });
                setOrder(prev => ({
                    ...prev,
                    userId: response.data.user._id,
                    thongTinNguoiMua: {
                        hoTen: response.data.user.fullName,
                        soDienThoai: response.data.user.phoneNumber,
                        diaChi: response.data.user.address
                    }
                }))
            } catch (error) {
                // console.error('Error create User data', error);
            }
        }
        if (isLoggedIn) {
            fetchData();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoggedIn])


    useEffect(() => {
        if (showTSKT) {
            document.body.style.overflow = 'hidden'; // Ngăn cuộn bên ngoài
        } else {
            document.body.style.overflow = 'auto'; // Khôi phục cuộn bên ngoài
        }
        return () => {
            document.body.style.overflow = 'auto'; // Đảm bảo khôi phục khi component unmount
        };
    }, [showTSKT]);

    useEffect(() => {
        if (showTSKT) {
            setDisplayStyle('block')
        } else {
            setTimeout(() => {
                setDisplayStyle('none');
            }, 500);
        }
    }, [showTSKT])

    useEffect(() => {
        const fetchMotorcycle = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/v1/xe-may/${slug}`);
                setMotorcycle(response.data);
                setOrder(prev => ({
                    ...prev,
                    productId: response.data._id,
                    tenSanPham: response.data.tenXe,
                    phienBan: response.data.phienBan[0].tenPhienBan,
                    mauSac: response.data.phienBan[0].mauSac[0].tenMau,
                    soLuong: 1,
                    imgXe: response.data.phienBan[0].mauSac[0].imgXe,
                    tongTien: response.data.phienBan[0].mauSac[0].gia,
                }));
                if (getTenXe) {
                    getTenXe(response.data.tenXe);
                }
                // console.log(response.data)
                // return response.data;
            } catch (error) {
                console.error("Error fetching motorcycles:", error);
                throw error;
            }
        };

        fetchMotorcycle()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleAddOrder = () => {
        if (!isLoggedIn) {
            navigate('/dang-nhap')
        } else {
            navigate('/dat-hang')
        }
    }

    if (!motorcycle) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="w-12 h-12 border-4 border-[#de0000] border-t-transparent rounded-full animate-spin"></div>
            </div>
        )
    }

    return (

        <>
            {motorcycle ? (
                <section className='w-full mt-[72px] overflow-hidden'>
                    <div className='relative w-full'>
                        <button className="w-full h-auto p-0">
                            <img className='w-full h-auto object-cover'
                                src={`http://localhost:5000/uploads/${motorcycle.banner}`}
                                alt='Banner' />
                        </button>
                    </div>
                </section>
            ) : null}

            <div className='sticky top-[70px] left-0 z-[100] bg-[#fff] px-[20px] border-t-[1px] border-t-[#5f5f5f] border-opacity-[0.1] mx-auto w-full'>
                <div className='flex justify-center h-[50px] bg-[#fff]'>
                    {motorcycle ? (
                        <div className='flex items-center px-[10px]'>
                            <a href='#bang-gia-mau-sac' className={`font-vietnam no-underline py-[10px] text-[#393939] leading-[26px]
                            ${color === 1 ? '!font-bold !border-b-[5px] !border-[#de0000] !text-[#de0000]' : ''}`}
                                onClick={() => setColor(1)}>
                                Giá & Màu sắc
                            </a>
                        </div>
                    ) : null}
                    {motorcycle && motorcycle.tenTinhNang ? (
                        <div className='flex items-center px-[10px]'>
                            <a href='#tinh-nang-noi-bat' className={`font-vietnam no-underline py-[10px] text-[#393939] leading-[26px]
                            ${color === 2 ? '!font-bold !border-b-[5px] !border-[#de0000] !text-[#de0000]' : ''}`}
                                onClick={() => setColor(2)}>
                                Tính năng nổi bật
                            </a>
                        </div>
                    ) : null}
                    {motorcycle && motorcycle.thietKe ? (
                        <div className='flex items-center px-[10px]'>
                            <a href='#thiet-ke' className={`font-vietnam no-underline py-[10px] text-[#393939] leading-[26px]
                            ${color === 3 ? '!font-bold !border-b-[5px] !border-[#de0000] !text-[#de0000]' : ''}`}
                                onClick={() => setColor(3)}>
                                Thiết kế
                            </a>
                        </div>
                    ) : null}
                    {motorcycle && motorcycle.dongCo ? (
                        <div className='flex items-center px-[10px]'>
                            <a href='#dong-co' className={`font-vietnam no-underline py-[10px] text-[#393939] leading-[26px]
                            ${color === 4 ? '!font-bold !border-b-[5px] !border-[#de0000] !text-[#de0000]' : ''}`}
                                onClick={() => setColor(4)}>
                                Động cơ
                            </a>
                        </div>
                    ) : null}
                    {motorcycle && motorcycle.congNghe ? (
                        <div className='flex items-center px-[10px]'>
                            <a href='#cong-nghe' className={`font-vietnam no-underline py-[10px] text-[#393939] leading-[26px]
                            ${color === 5 ? '!font-bold !border-b-[5px] !border-[#de0000] !text-[#de0000]' : ''}`}
                                onClick={() => setColor(5)}>
                                Công nghệ
                            </a>
                        </div>
                    ) : null}
                    {motorcycle && motorcycle.tienIchAnToan ? (
                        <div className='flex items-center px-[10px]'>
                            <a href='#tien-ich-an-toan' className={`font-vietnam no-underline py-[10px] text-[#393939] leading-[26px]
                            ${color === 6 ? '!font-bold !border-b-[6px] !border-[#de0000] !text-[#de0000]' : ''}`}
                                onClick={() => setColor(6)}>
                                Tiện ích & An toàn
                            </a>
                        </div>
                    ) : null}
                    {motorcycle && motorcycle.libImg ? (
                        <div className='flex items-center px-[10px]'>
                            <a href='#thu-vien-anh' className={`font-vietnam no-underline py-[10px] text-[#393939] leading-[26px]
                            ${color === 7 ? '!font-bold !border-b-[5px] !border-[#de0000] !text-[#de0000]' : ''}`}
                                onClick={() => setColor(7)}>
                                Thư viện ảnh
                            </a>
                        </div>
                    ) : null}
                </div>
            </div>

            {motorcycle ? (
                <div id='bang-gia-mau-sac' className='flex scroll-mt-[120px] justify-center bg-custom-gradient'>
                    <div className='relative flex w-full max-w-[1390px] justify-between px-[20px] mx-auto'>
                        <div className='block w-[860px]'>
                            <div className='min-h-[400px]'>
                                <img className='w-full'
                                    src={imgXe === "" ? (`http://localhost:5000/uploads/${motorcycle.phienBan[0].mauSac[0].imgXe}`) : imgXe}
                                    alt="" />
                            </div>
                            <div className='font-vietnam text-[#5f5f5f] mb-[80px]'>
                                <p className='mb-[5px] text-[16px] leading-[26px]'>Giá bán lẻ đề xuất</p>
                                <h2 className='text-[30px] font-bold leading-[40px]'>
                                    {gia === -1 ? motorcycle.phienBan[0].mauSac[0].gia.toLocaleString('vi-VN') : gia}
                                    <span className='text-[16px] font-normal leading-[18px]'>
                                        &nbsp;VND
                                    </span>
                                </h2>
                            </div>
                        </div>
                        <div className='w-[330px] py-[50px]'>
                            <h3 className='font-vietnam text-[#de0000] font-extrabold italic text-[28px] leading-[42px] uppercase mb-[15px]'>Bảng giá & Màu sắc</h3>
                            <div className='border-t-[1px] border-[#f6f6f6]'>
                                {motorcycle.phienBan.map((pb, index) => (
                                    <div key={index} className='border-b-[1px] border-b-[#5f5f5f] border-opacity-[0.3]'>
                                        <div className='p-0'>
                                            <div className='flex justify-between items-center py-3 cursor-pointer'>
                                                <span className='font-vietnam font-bold text-[#5f5f5f] text-[16px] leading-[26px]'>
                                                    {pb.tenPhienBan}
                                                </span>
                                                {/* <svg className="icon_minus show" width="12" height="3" viewBox="0 0 12 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M1 1.37891H11" stroke="#393939" strokeWidth="2" strokeLinecap="round"></path>
                                                </svg> */}
                                            </div>
                                        </div>
                                        <div className='block h-auto'>
                                            <div className='flex flex-wrap justify-start items-center pl-0 pt-2 gap-[18px]'>
                                                {pb.mauSac.map((ms, msIndex) => (
                                                    <div key={msIndex} className='cursor-pointer'>
                                                        <div className='flex w-[90px]'>
                                                            {ms.hex.map((hex, hexIndex) => (
                                                                <div
                                                                    key={hexIndex}
                                                                    style={{ backgroundColor: hex }}
                                                                    className='block w-[30px] h-[30px]'
                                                                    onClick={() => handleChangeInfo(index, msIndex)}
                                                                ></div>
                                                            ))}
                                                        </div>
                                                        <div className='font-vietnam font-normal text-[14px] text-nowrap mt-[5px] leading-[26px] text-[#5f5f5f]'>
                                                            {ms.tenMau}
                                                        </div>
                                                    </div>
                                                ))}

                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className='flex mt-[20px]'>
                                <div className='font-vietnam font-bold text-[#5f5f5f] text-[20px] leading-[26px]'>Số lượng:</div>
                                <span className='font-vietnam font-bold text-[#5f5f5f] text-[20px] leading-[26px]'>
                                    &nbsp;{soLuong === -1 ? motorcycle.phienBan[0].mauSac[0].soLuong : soLuong}
                                </span>
                            </div>
                            <button className={`bg-[#de0000] mt-5 w-[330px] rounded-sm ${(soLuong || motorcycle.phienBan[0].mauSac[0].soLuong) === 0 ? 'bg-[#ffcccc]' : ''}`}
                                disabled={(soLuong || motorcycle.phienBan[0].mauSac[0].soLuong) === 0}
                            // onClick={handleAddOrder}
                            >
                                <div onClick={handleAddOrder} className='font-vietnam text-white font-semibold p-[12px]'>
                                    Đặt hàng
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            ) : null}

            {motorcycle && motorcycle.tenTinhNang ? (
                <div id='tinh-nang-noi-bat' className='flex scroll-mt-[120px]'>
                    <div className='w-[65%]'>
                        <div className='relative h-full'>
                            <div className='relative flex w-full h-full justify-center items-center overflow-hidden'>
                                <img
                                    className='min-h-full min-w-full w-auto h-auto object-cover'
                                    src={`http://localhost:5000/uploads/${motorcycle.imgTinhNang}`}
                                    alt=''
                                />
                            </div>
                        </div>
                    </div>
                    <div className='w-[35%] bg-[#de0000] pt-[64px] pb-[40px]'>
                        <div className='pb-[25px]'>
                            <h2 className='pl-[35px] text-[28px] font-vietnam text-white font-extrabold italic uppercase'>
                                Tính năng nổi bật
                            </h2>
                        </div>
                        <div className='pl-[35px] overflow-auto max-h-[430px] pr-[147px]'>
                            <h4 className='font-vietnam text-white text-[22px] font-extrabold mb-[20px] leading-[30px]'>
                                {motorcycle.tenTinhNang}
                            </h4>
                            <p className='font-vietnam text-white text-[16px] leading-[26px] '>
                                {motorcycle.noiDungTN}
                            </p>
                        </div>
                    </div>
                </div>
            ) : null}

            {motorcycle ? (
                <div id='thiet-ke' className='flex scroll-mt-[120px]'>
                    <div className='w-[35%] bg-neutral-100 pt-[64px] pb-[40px]'>
                        <div className='pb-[25px] pl-[147px]'>
                            <h2 className='text-[28px] font-vietnam text-[#de0000] font-extrabold italic uppercase'>
                                Thiết kế
                            </h2>
                        </div>
                        <div className='pr-[35px] overflow-auto max-h-[430px] pl-[147px]'>
                            <p className='font-vietnam text-[16px] leading-[26px] '>
                                {motorcycle.thietKe}
                            </p>
                        </div>
                    </div>
                    <div className='w-[65%]'>
                        <div className='relative h-full'>
                            <div className='relative flex w-full h-full justify-center items-center overflow-hidden'>
                                <img
                                    className='min-h-full min-w-full w-auto h-auto object-cover'
                                    src={`http://localhost:5000/uploads/${motorcycle.imgThietKe}`}
                                    alt="huh" />
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}

            {motorcycle && motorcycle.dongCo && motorcycle.congNghe && motorcycle.tienIchAnToan ? (
                <>
                    <div id='dong-co' className='flex scroll-mt-[120px]'>
                        <div className='w-[65%]'>
                            <div className='relative h-full'>
                                <div className='relative flex w-full h-full justify-center items-center overflow-hidden'>
                                    <img
                                        className='min-h-full min-w-full w-auto h-auto object-cover'
                                        src={`http://localhost:5000/uploads/${motorcycle.imgDongCo}`}
                                        alt="huh" />
                                </div>
                            </div>
                        </div>
                        <div className='w-[35%] bg-[#de0000] pt-[64px] pb-[40px]'>
                            <div className='pb-[25px]'>
                                <h2 className='pl-[35px] text-[28px] font-vietnam text-white font-extrabold italic uppercase'>
                                    Động cơ
                                </h2>
                            </div>
                            <div className='pl-[35px] overflow-auto max-h-[430px] pr-[147px]'>
                                <p className='font-vietnam text-white text-[16px] leading-[26px] '>
                                    {motorcycle.dongCo}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div id='cong-nghe' className='flex scroll-mt-[120px]'>
                        <div className='w-[35%] bg-neutral-100 pt-[64px] pb-[40px]'>
                            <div className='pb-[25px] pl-[147px]'>
                                <h2 className='text-[28px] font-vietnam text-[#de0000] font-extrabold italic uppercase'>
                                    Công nghệ
                                </h2>
                            </div>
                            <div className='pr-[35px] overflow-auto max-h-[430px] pl-[147px]'>
                                <p className='font-vietnam text-[16px] leading-[26px] '>
                                    {motorcycle.congNghe}
                                </p>
                            </div>
                        </div>
                        <div className='w-[65%]'>
                            <div className='relative h-full'>
                                <div className='relative flex w-full h-full justify-center items-center overflow-hidden'>
                                    <img
                                        className='min-h-full min-w-full w-auto h-auto object-cover'
                                        src={`http://localhost:5000/uploads/${motorcycle.imgCongNghe}`}
                                        alt="huh" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id='tien-ich-an-toan' className='flex scroll-mt-[120px]'>
                        <div className='w-[65%]'>
                            <div className='relative h-full'>
                                <div className='relative flex w-full h-full justify-center items-center overflow-hidden'>
                                    <img
                                        className='min-h-full min-w-full w-auto h-auto object-cover'
                                        src={`http://localhost:5000/uploads/${motorcycle.imgTienIchAnToan}`}
                                        alt="huh" />
                                </div>
                            </div>
                        </div>
                        <div className='w-[35%] bg-[#de0000] pt-[64px] pb-[40px]'>
                            <div className='pb-[25px]'>
                                <h2 className='pl-[35px] text-[28px] font-vietnam text-white font-extrabold italic uppercase'>
                                    Tiện ích & An toàn
                                </h2>
                            </div>
                            <div className='pl-[35px] overflow-auto max-h-[430px] pr-[147px]'>
                                <p className='font-vietnam text-white text-[16px] leading-[26px] '>
                                    {motorcycle.tienIchAnToan}
                                </p>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}

            {motorcycle && motorcycle.dongCo && !motorcycle.congNghe ? (
                <>
                    <div id='dong-co' className='flex scroll-mt-[120px]'>
                        <div className='w-[65%]'>
                            <div className='relative h-full'>
                                <div className='relative flex w-full h-full justify-center items-center overflow-hidden'>
                                    <img
                                        className='min-h-full min-w-full w-auto h-auto object-cover'
                                        src={`http://localhost:5000/uploads/${motorcycle.imgDongCo}`}
                                        alt="huh" />
                                </div>
                            </div>
                        </div>
                        <div className='w-[35%] bg-[#de0000] pt-[64px] pb-[40px]'>
                            <div className='pb-[25px]'>
                                <h2 className='pl-[35px] text-[28px] font-vietnam text-white font-extrabold italic uppercase'>
                                    Động cơ
                                </h2>
                            </div>
                            <div className='pl-[35px] overflow-auto max-h-[430px] pr-[147px]'>
                                <p className='font-vietnam text-white text-[16px] leading-[26px] '>
                                    {motorcycle.dongCo}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div id='tien-ich-an-toan' className='flex scroll-mt-[120px]'>
                        <div className='w-[35%] bg-neutral-100 pt-[64px] pb-[40px]'>
                            <div className='pb-[25px] pl-[147px]'>
                                <h2 className='text-[28px] font-vietnam text-[#de0000] font-extrabold italic uppercase'>
                                    Tiện ích & An toàn
                                </h2>
                            </div>
                            <div className='pr-[35px] overflow-auto max-h-[430px] pl-[147px]'>
                                <p className='font-vietnam text-[16px] leading-[26px] '>
                                    {motorcycle.tienIchAnToan}
                                </p>
                            </div>
                        </div>
                        <div className='w-[65%]'>
                            <div className='relative h-full'>
                                <div className='relative flex w-full h-full justify-center items-center overflow-hidden'>
                                    <img
                                        className='min-h-full min-w-full w-auto h-auto object-cover'
                                        src={`http://localhost:5000/uploads/${motorcycle.imgTienIchAnToan}`}
                                        alt="huh" />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}

            {motorcycle && !motorcycle.dongCo && motorcycle.congNghe ? (
                <>
                    <div id='cong-nghe' className='flex scroll-mt-[120px]'>
                        <div className='w-[65%]'>
                            <div className='relative h-full'>
                                <div className='relative flex w-full h-full justify-center items-center overflow-hidden'>
                                    <img
                                        className='min-h-full min-w-full w-auto h-auto object-cover'
                                        src={`http://localhost:5000/uploads/${motorcycle.imgCongNghe}`}
                                        alt="huh" />
                                </div>
                            </div>
                        </div>
                        <div className='w-[35%] bg-[#de0000] pt-[64px] pb-[40px]'>
                            <div className='pb-[25px]'>
                                <h2 className='pl-[35px] text-[28px] font-vietnam text-white font-extrabold italic uppercase'>
                                    Công nghệ
                                </h2>
                            </div>
                            <div className='pl-[35px] overflow-auto max-h-[430px] pr-[147px]'>
                                <p className='font-vietnam text-white text-[16px] leading-[26px] '>
                                    {motorcycle.congNghe}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div id='tien-ich-an-toan' className='flex scroll-mt-[120px]'>
                        <div className='w-[35%] bg-neutral-100 pt-[64px] pb-[40px]'>
                            <div className='pb-[25px] pl-[147px]'>
                                <h2 className='text-[28px] font-vietnam text-[#de0000] font-extrabold italic uppercase'>
                                    Tiện ích & An toàn
                                </h2>
                            </div>
                            <div className='pr-[35px] overflow-auto max-h-[430px] pl-[147px]'>
                                <p className='font-vietnam text-[16px] leading-[26px] '>
                                    {motorcycle.tienIchAnToan}
                                </p>
                            </div>
                        </div>
                        <div className='w-[65%]'>
                            <div className='relative h-full'>
                                <div className='relative flex w-full h-full justify-center items-center overflow-hidden'>
                                    <img
                                        className='min-h-full min-w-full w-auto h-auto object-cover'
                                        src={`http://localhost:5000/uploads/${motorcycle.imgTienIchAnToan}`}
                                        alt="huh" />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}

            {motorcycle && !motorcycle.dongCo && !motorcycle.congNghe ? (
                <div id='tien-ich-an-toan' className='flex scroll-mt-[120px]'>
                    <div className='w-[65%]'>
                        <div className='relative h-full'>
                            <div className='relative flex w-full h-full justify-center items-center overflow-hidden'>
                                <img
                                    className='min-h-full min-w-full w-auto h-auto object-cover'
                                    src={`http://localhost:5000/uploads/${motorcycle.imgTienIchAnToan}`}
                                    alt="huh" />
                            </div>
                        </div>
                    </div>
                    <div className='w-[35%] bg-[#de0000] pt-[64px] pb-[40px]'>
                        <div className='pb-[25px]'>
                            <h2 className='pl-[35px] text-[28px] font-vietnam text-white font-extrabold italic uppercase'>
                                Tiện ích & An toàn
                            </h2>
                        </div>
                        <div className='pl-[35px] overflow-auto max-h-[430px] pr-[147px]'>
                            <p className='font-vietnam text-white text-[16px] leading-[26px] '>
                                {motorcycle.tienIchAnToan}
                            </p>
                        </div>
                    </div>
                </div>
            ) : null}

            <div className='flex justify-center w-full my-4'>
                <button onClick={() => setShowTSKT(true)} className='flex justify-center items-center max-w-[482px] h-[45px] font-vietnam font-semibold text-[16px] border-2 border-black transition-colors hover:text-[#de0000] hover:!border-[#de0000]'>
                    <div className='w-full flex justify-center items-center py-2 px-24'>
                        THÔNG SỐ KỸ THUẬT
                    </div>
                </button>
            </div>

            <div
                style={{ opacity: showTSKT ? 1 : 0, display: showTSKT ? displayStyle : displayStyle }}
                className="fixed top-0 background: bg-[#000000] bg-opacity-[0.8] w-full h-full z-[10001] overflow-hidden transition-all duration-500 max-w-[100vw]">
                <div
                    style={{ transform: showTSKT ? 'translateX(0%)' : 'translateX(100%)' }}
                    className="absolute w-[710px] top-0 right-0 h-full bg-white overflow-y-auto transition-transform duration-500">

                    <div className="font-vietnam mt-[50px] text-[20px] text-[#393939] pl-[50px]">
                        Thông số kỹ thuật
                    </div>

                    <div className='absolute flex items-center justify-center bg-[#de0000] cursor-pointer h-[50px] w-[50px] top-0 right-0'
                        onClick={() => setShowTSKT(false)}>
                        <p className='m-0 text-white font-vietnam text-[32px]'>X</p>
                    </div>

                    <div className='pt-[30px] pb-[60px] px-[50px]'>
                        {motorcycle && motorcycle.khoiLuongBanThan ? (
                            <div className='row tskt col-12 m-0 p-0'>
                                <div className='col-6 py-[10px] px-[20px] font-vietnam text-[16px] text-[#393939] self-center'>
                                    Khối lượng bản thân
                                </div>
                                <div className='col-6 py-[10px] px-[20px] font-vietnam font-bold text-[16px] text-[#393939]'>
                                    <p className='my-0'>{motorcycle.khoiLuongBanThan}</p>
                                </div>
                            </div>
                        ) : null}
                        {motorcycle && motorcycle.daiRongCao ? (
                            <div className='row tskt col-12 m-0 p-0'>
                                <div className='col-6 py-[10px] px-[20px] font-vietnam text-[16px] text-[#393939] self-center'>
                                    Dài x Rộng x Cao
                                </div>
                                <div className='col-6 py-[10px] px-[20px] font-vietnam font-bold text-[16px] text-[#393939]'>
                                    <p className='my-0'>{motorcycle.daiRongCao}</p>
                                </div>
                            </div>
                        ) : null}
                        {motorcycle && motorcycle.khoangCachTrucBanhXe ? (
                            <div className='row tskt col-12 m-0 p-0'>
                                <div className='col-6 py-[10px] px-[20px] font-vietnam text-[16px] text-[#393939] self-center'>
                                    Khoảng cách trục bánh xe
                                </div>
                                <div className='col-6 py-[10px] px-[20px] font-vietnam font-bold text-[16px] text-[#393939]'>
                                    <p className='my-0'>{motorcycle.khoangCachTrucBanhXe}</p>
                                </div>
                            </div>
                        ) : null}
                        {motorcycle && motorcycle.doCaoYen ? (
                            <div className='row tskt col-12 m-0 p-0'>
                                <div className='col-6 py-[10px] px-[20px] font-vietnam text-[16px] text-[#393939] self-center'>
                                    Độ cao yên
                                </div>
                                <div className='col-6 py-[10px] px-[20px] font-vietnam font-bold text-[16px] text-[#393939]'>
                                    <p className='my-0'>{motorcycle.doCaoYen}</p>
                                </div>
                            </div>
                        ) : null}
                        {motorcycle && motorcycle.khoangSangGamXe ? (
                            <div className='row tskt col-12 m-0 p-0'>
                                <div className='col-6 py-[10px] px-[20px] font-vietnam text-[16px] text-[#393939] self-center'>
                                    Khoảng sáng gầm xe
                                </div>
                                <div className='col-6 py-[10px] px-[20px] font-vietnam font-bold text-[16px] text-[#393939]'>
                                    <p className='my-0'>{motorcycle.khoangSangGamXe}</p>
                                </div>
                            </div>
                        ) : null}
                        {motorcycle && motorcycle.dungTichBinhXang ? (
                            <div className='row tskt col-12 m-0 p-0'>
                                <div className='col-6 py-[10px] px-[20px] font-vietnam text-[16px] text-[#393939] self-center'>
                                    Dung tích bình xăng
                                </div>
                                <div className='col-6 py-[10px] px-[20px] font-vietnam font-bold text-[16px] text-[#393939]'>
                                    <p className='my-0'>{motorcycle.dungTichBinhXang}</p>
                                </div>
                            </div>
                        ) : null}
                        {motorcycle && motorcycle.kichCoLopTruocSau ? (
                            <div className='row tskt col-12 m-0 p-0'>
                                <div className='col-6 py-[10px] px-[20px] font-vietnam text-[16px] text-[#393939] self-center'>
                                    Kích cỡ lốp trước/ sau                            </div>
                                <div className='col-6 py-[10px] px-[20px] font-vietnam font-bold text-[16px] text-[#393939]'>
                                    <p className='my-0'>{motorcycle.kichCoLopTruocSau}</p>
                                </div>
                            </div>
                        ) : null}
                        {motorcycle && motorcycle.phuocTruoc ? (
                            <div className='row tskt col-12 m-0 p-0'>
                                <div className='col-6 py-[10px] px-[20px] font-vietnam text-[16px] text-[#393939] self-center'>
                                    Phuộc trước                            </div>
                                <div className='col-6 py-[10px] px-[20px] font-vietnam font-bold text-[16px] text-[#393939]'>
                                    <p className='my-0'>{motorcycle.phuocTruoc}</p>
                                </div>
                            </div>
                        ) : null}
                        {motorcycle && motorcycle.phuocSau ? (
                            <div className='row tskt col-12 m-0 p-0'>
                                <div className='col-6 py-[10px] px-[20px] font-vietnam text-[16px] text-[#393939] self-center'>
                                    Phuộc sau
                                </div>
                                <div className='col-6 py-[10px] px-[20px] font-vietnam font-bold text-[16px] text-[#393939]'>
                                    <p className='my-0'>{motorcycle.phuocSau}</p>
                                </div>
                            </div>
                        ) : null}
                        {motorcycle && motorcycle.loaiDongCo ? (
                            <div className='row tskt col-12 m-0 p-0'>
                                <div className='col-6 py-[10px] px-[20px] font-vietnam text-[16px] text-[#393939] self-center'>
                                    Loại động cơ
                                </div>
                                <div className='col-6 py-[10px] px-[20px] font-vietnam font-bold text-[16px] text-[#393939]'>
                                    <p className='my-0'>{motorcycle.loaiDongCo}</p>
                                </div>
                            </div>
                        ) : null}
                        {motorcycle && motorcycle.congXuatToiDa ? (
                            <div className='row tskt col-12 m-0 p-0'>
                                <div className='col-6 py-[10px] px-[20px] font-vietnam text-[16px] text-[#393939] self-center'>
                                    Công suất tối đa
                                </div>
                                <div className='col-6 py-[10px] px-[20px] font-vietnam font-bold text-[16px] text-[#393939]'>
                                    <p className='my-0'>{motorcycle.congXuatToiDa}</p>
                                </div>
                            </div>
                        ) : null}
                        {motorcycle && motorcycle.dungTichNhotMay ? (
                            <div className='row tskt col-12 m-0 p-0'>
                                <div className='col-6 py-[10px] px-[20px] font-vietnam text-[16px] text-[#393939] self-center'>
                                    Dung tích nhớt máy
                                </div>
                                <div className='col-6 py-[10px] px-[20px] font-vietnam font-bold text-[16px] text-[#393939]'>
                                    <p className='my-0'>{motorcycle.dungTichNhotMay}</p>
                                </div>
                            </div>
                        ) : null}
                        {motorcycle && motorcycle.mucTieuThuNhienLieu ? (
                            <div className='row tskt col-12 m-0 p-0'>
                                <div className='col-6 py-[10px] px-[20px] font-vietnam text-[16px] text-[#393939] self-center'>
                                    Mức tiêu thụ nhiên liệu
                                </div>
                                <div className='col-6 py-[10px] px-[20px] font-vietnam font-bold text-[16px] text-[#393939]'>
                                    <p className='my-0'>{motorcycle.mucTieuThuNhienLieu}</p>
                                </div>
                            </div>
                        ) : null}
                        {motorcycle && motorcycle.hopSo ? (
                            <div className='row tskt col-12 m-0 p-0'>
                                <div className='col-6 py-[10px] px-[20px] font-vietnam text-[16px] text-[#393939] self-center'>
                                    Hộp Số
                                </div>
                                <div className='col-6 py-[10px] px-[20px] font-vietnam font-bold text-[16px] text-[#393939]'>
                                    <p className='my-0'>{motorcycle.hopSo}</p>
                                </div>
                            </div>
                        ) : null}
                        {motorcycle && motorcycle.heThongKhoiDong ? (
                            <div className='row tskt col-12 m-0 p-0'>
                                <div className='col-6 py-[10px] px-[20px] font-vietnam text-[16px] text-[#393939] self-center'>
                                    Hệ thống khởi động
                                </div>
                                <div className='col-6 py-[10px] px-[20px] font-vietnam font-bold text-[16px] text-[#393939]'>
                                    <p className='my-0'>{motorcycle.heThongKhoiDong}</p>
                                </div>
                            </div>
                        ) : null}
                        {motorcycle && motorcycle.momentCucDai ? (
                            <div className='row tskt col-12 m-0 p-0'>
                                <div className='col-6 py-[10px] px-[20px] font-vietnam text-[16px] text-[#393939] self-center'>
                                    Moment cực đại
                                </div>
                                <div className='col-6 py-[10px] px-[20px] font-vietnam font-bold text-[16px] text-[#393939]'>
                                    <p className='my-0'>{motorcycle.momentCucDai}</p>
                                </div>
                            </div>
                        ) : null}
                        {motorcycle && motorcycle.dungTichXyLanh ? (
                            <div className='row tskt col-12 m-0 p-0'>
                                <div className='col-6 py-[10px] px-[20px] font-vietnam text-[16px] text-[#393939] self-center'>
                                    Dung tích xy-lanh
                                </div>
                                <div className='col-6 py-[10px] px-[20px] font-vietnam font-bold text-[16px] text-[#393939]'>
                                    <p className='my-0'>{motorcycle.dungTichXyLanh}</p>
                                </div>
                            </div>
                        ) : null}
                        {motorcycle && motorcycle.duongKinhxHanhTrinhPitTong ? (
                            <div className='row tskt col-12 m-0 p-0'>
                                <div className='col-6 py-[10px] px-[20px] font-vietnam text-[16px] text-[#393939] self-center'>
                                    Đường kính x Hành trình pít tông
                                </div>
                                <div className='col-6 py-[10px] px-[20px] font-vietnam font-bold text-[16px] text-[#393939]'>
                                    <p className='my-0'>{motorcycle.duongKinhxHanhTrinhPitTong}</p>
                                </div>
                            </div>
                        ) : null}
                        {motorcycle && motorcycle.tySoNen ? (
                            <div className='row tskt col-12 m-0 p-0'>
                                <div className='col-6 py-[10px] px-[20px] font-vietnam text-[16px] text-[#393939] self-center'>
                                    Tỷ số nén
                                </div>
                                <div className='col-6 py-[10px] px-[20px] font-vietnam font-bold text-[16px] text-[#393939]'>
                                    <p className='my-0'>{motorcycle.tySoNen}</p>
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>

            <div id='thu-vien-anh' className='scroll-mt-[120px]'>
                <h3 className='max-w-[1390px] py-[25px] px-[20px] mx-auto font-vietnam font-extrabold italic text-[28px] uppercase leading-[42px] text-[#de0000]'>
                    Thư viện ảnh
                </h3>
                <div className='flex flex-wrap w-full min-h-[300px] overflow-hidden'>
                    {motorcycle ? (
                        motorcycle.libImg.map((img, index) => (
                            <div key={index} className='justify-center items-center w-[33%] min-h-[200px] p-[4px] cursor-pointer'>
                                <img className='w-full h-full object-cover'
                                    src={`http://localhost:5000/uploads/${img}`}
                                    alt="" />
                            </div>
                        ))
                    ) : null}
                </div>
            </div>

        </>

    )
}

export default MotorcycleDetail