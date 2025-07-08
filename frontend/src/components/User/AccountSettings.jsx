import React from 'react'
import { useState } from 'react'
import { doPasswordsMatch } from '../../utils/validators.js';
import axios from 'axios';

function AccountSettings() {

    const [isHidden, setIsHidden] = useState(true)
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!doPasswordsMatch(newPassword, confirmNewPassword)) {
            alert("Mật khẩu mới không khớp!");
            return;
        }

        try {
            await axios.patch('http://localhost:5000/api/v1/user/account/settings',
                {
                    password,
                    newPassword
                },
                {
                    withCredentials: true
                }
            );
            alert("Cập nhật mật khẩu thành công!")
        } catch (error) {
            console.error('Error create User data', error);
            alert("Cập nhật mật khẩu không thành công!")
        }
    }

    const ShowPassword = () => {
        if (isHidden === false) {
            return (
                <button type='button' className="absolute right-2 top-1/2 -translate-y-1/2" aria-label="toggle-pwd-btn" onClick={() => setIsHidden(!isHidden)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide-icon lucide lucide-eye">
                        <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0">
                        </path>
                        <circle cx="12" cy="12" r="3">
                        </circle>
                    </svg>
                </button>
            )
        }
        if (isHidden === true) {
            return (
                <button type='button' className="absolute right-2 top-1/2 -translate-y-1/2" aria-label="toggle-pwd-btn" onClick={() => setIsHidden(!isHidden)}>
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
    }

    return (
        < main className="flex-1 p-8 pl-14" >
            <h1 className="text-2xl text-red-600 font-bold mb-6 uppercase border-b pb-3">Mật khẩu của tôi</h1>

            <form
                onSubmit={handleSubmit}
                action="">
                <div className="space-y-5 max-w-3xl">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu hiện tại</label>
                    <div className='relative'>
                        <input
                            type={isHidden ? 'password' : 'text'}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            placeholder='Nhập mật khẩu hiện tại'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            autoComplete="current-password"
                        />
                        <ShowPassword />
                    </div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu mới</label>
                    <div className='relative'>
                        <input
                            type={isHidden ? 'password' : 'text'}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            placeholder='Nhập mật khẩu mới'
                            value={newPassword}
                            onChange={e => setNewPassword(e.target.value)}
                            autoComplete="new-password"
                        />
                        <ShowPassword />
                    </div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Xác nhận mật khẩu</label>
                    <div className='relative'>
                        <input
                            type={isHidden ? 'password' : 'text'}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            placeholder='Nhập xác nhận mật khẩu mới'
                            value={confirmNewPassword}
                            onChange={e => setConfirmNewPassword(e.target.value)}
                            autoComplete="new-password"
                        />
                        <ShowPassword />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3 pt-4">
                        <button type='submit' className="px-4 py-2 bg-[#de0000] text-white rounded-sm">Cập nhật</button>
                    </div>
                </div>
            </form>
        </main >
    )
}

export default AccountSettings