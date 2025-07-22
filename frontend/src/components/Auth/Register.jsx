import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bg_register from '../../assets/images/banners/login_register/bg_login.png'
import axios from 'axios';
import {
    isValidEmail,
    isValidPassword,
    isValidPhoneNumber,
    doPasswordsMatch
} from '../../utils/validators.js';

function Register() {

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(true)
    const [type, setType] = useState('password')

    const [fullName, setFullName] = useState('')
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const ShowPassword = () => {
        const handleHidePassword = () => {
            setShowPassword(true)
            setType('password')
        }
        return (
            <button type='button' className="absolute right-2 top-1/2 -translate-y-1/2" aria-label="toggle-pwd-btn" onClick={handleHidePassword}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide-icon lucide lucide-eye">
                    <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0">
                    </path>
                    <circle cx="12" cy="12" r="3">
                    </circle>
                </svg>
            </button>
        )
    }
    const HidePassword = () => {
        const handleShowPassword = () => {
            setShowPassword(false)
            setType('text')
        }
        return (
            <button type='button' className="absolute right-2 top-1/2 -translate-y-1/2" aria-label="toggle-pwd-btn" onClick={handleShowPassword}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide-icon lucide lucide-eye-off">
                    <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49">
                    </path>
                    <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242">
                    </path>
                    <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143">
                    </path><path d="m2 2 20 20">
                    </path>
                </svg>
            </button>
        )
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!doPasswordsMatch(password, confirmPassword)) {
            alert("Mật khẩu không khớp!");
            return;
        }
        if (!isValidEmail(email)) {
            alert("Email không hợp lệ!");
            return;
        }
        if (!isValidPassword(password)) {
            alert("Mật khẩu không hợp lệ!");
            return;
        }
        if (!isValidPhoneNumber(phoneNumber)) {
            alert("Số điện thoại không hợp lệ!");
            return;
        }

        // không cần dùng formData nếu không phải lưu file, 
        // lưu ý key trong frontend phải đúng giống với cái được lưu trên schema
        // vd trong schema là fullName thì trên fe cũng phải là fullName, fullname là sai
        const userData = {
            fullName,
            userName,
            email,
            phoneNumber,
            password
        };

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/dang-ky`, userData);
            console.log(response.data);
            alert("Đăng ký thành công!")
            navigate('/dang-nhap')
        } catch (error) {
            console.error('Error create User data', error);
            alert("Tên đăng nhập, email hoặc số điện thoại đã tồn tại!")
        }
    }

    return (
        <main className='relative flex h-full w-full items-center justify-center overflow-y-auto text-sm font-medium sm:text-base'>
            {/* background */}
            <section className='fixed left-0 top-0 z-[5] h-full w-full bg-neutral-800 opacity-70'></section>
            <section className='fixed left-0 top-0 w-full h-full'>
                <img className='w-full h-full object-cover' src={bg_register} alt="bg_login" />
            </section>
            {/* background */}

            <section className='relative grid z-10 min-h-screen w-full overflow-hidden pt-36 pb-20 sm:px-4 md:w-4/5 md:px-0 lg:w-2/3 2xl:grid-cols-2'>
                <form
                    onSubmit={handleSubmit}
                    className='col-span-1 flex flex-col items-center justify-center gap-3 bg-neutral-50 px-8 py-16'
                    action="">
                    <h1 className='text-2xl font-bold uppercase tracking-[4px] md:text-4xl md:tracking-[8px] font-vietnam'>
                        Đăng ký</h1>
                    <div className='flex w-full flex-col gap-2'>
                        <input className='h-full w-full border-1 font-vietnam border-neutral-500 px-4 py-3 text-sm md:py-4 md:text-base'
                            name='fullName'
                            value={fullName}
                            onChange={e => setFullName(e.target.value)}
                            type="text" placeholder='Nhập tên người dùng' />
                    </div>
                    <div className='flex w-full flex-col gap-2'>
                        <input className='h-full w-full border-1 font-vietnam border-neutral-500 px-4 py-3 text-sm md:py-4 md:text-base'
                            name='userName'
                            value={userName}
                            onChange={e => setUserName(e.target.value)}
                            type="text" placeholder='Tên đăng nhập' />
                    </div>
                    <div className='flex w-full flex-col gap-2'>
                        <input className='h-full w-full border-1 font-vietnam border-neutral-500 px-4 py-3 text-sm md:py-4 md:text-base'
                            name='email'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            type="email" placeholder='Email' />
                    </div>
                    <div className='flex w-full flex-col gap-2'>
                        <input className='h-full w-full border-1 font-vietnam border-neutral-500 px-4 py-3 text-sm md:py-4 md:text-base'
                            name='phoneNumber'
                            value={phoneNumber}
                            onChange={e => setPhoneNumber(e.target.value)}
                            type="tel" placeholder='Số điện thoại' />
                    </div>
                    <div className='flex w-full flex-col gap-2'>
                        {/* svg có absolute sử dụng vị trí của div có relative để định vị */}
                        <div className="relative w-full">
                            <input className='h-full w-full border-1 font-vietnam border-neutral-500 px-4 py-3 text-sm md:py-4 md:text-base'
                                name='password'
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                type={type} placeholder='Mật khẩu' />
                            {showPassword ? <HidePassword /> : <ShowPassword />}
                        </div>
                    </div>
                    <div className='flex w-full flex-col gap-2'>
                        <div className="relative w-full">
                            <input className='h-full w-full border-1 font-vietnam border-neutral-500 px-4 py-3 text-sm md:py-4 md:text-base'
                                name='confirmPassword'
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                type={type} placeholder='Nhập lại mật khẩu' />
                            {showPassword ? <HidePassword /> : <ShowPassword />}
                        </div>
                    </div>
                    <button type="submit" className="w-full rounded-sm bg-neutral-800 py-3 text-base font-bold tracking-[4px] text-white md:py-4 md:text-lg font-vietnam">
                        Đăng ký
                    </button>

                    <div>
                        <div className="flex gap-2">
                            <p className='m-0 font-vietnam'>Đã có tài khoản?</p>
                            <button type="button" onClick={() => { navigate("/dang-nhap") }} className="font-bold transition-colors hover:text-[#de0000] font-vietnam">Đăng nhập</button>
                        </div>
                    </div>
                </form>
                {/* 2xl -> display:flex     <2xl -> display:hidden */}
                <div className='col-span-1 hidden items-center justify-center bg-neutral-800 px-24 text-white 2xl:flex'>
                    <h1 className='text-[56px] font-bold uppercase leading-[72px] tracking-[4px] font-vietnam'>Tự do & Chinh phục</h1>
                </div>
            </section>
        </main>
    )
}

export default Register