import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    isValidEmail,
    isValidPhoneNumber,
} from '../../utils/validators.js';

const AccountInfo = () => {

    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response =
                    await axios.get(`${process.env.REACT_APP_API_BASE_URL}/user/account/profile`, {
                        withCredentials: true // bắt buộc
                    });
                setEmail(response.data.user.email);
                setFullName(response.data.user.fullName);
                setPhoneNumber(response.data.user.phoneNumber)
                setAddress(response.data.user.address);
            } catch (error) {
                console.error('Error create User data', error);
            }
        }

        fetchData();
    }, [])

    const handleUpdate = async () => {
        if (!isValidEmail(email)) {
            alert("Email không hợp lệ!")
            return
        }
        if (!isValidPhoneNumber(phoneNumber)) {
            alert("Số điện thoại không hợp lệ!")
            return
        }

        try {
            await axios.put(
                `${process.env.REACT_APP_API_BASE_URL}/user/account/updateAccountInfo`,
                { email, fullName, phoneNumber, address },
                { withCredentials: true }
            );
            alert('Cập nhật thành công!');
        } catch (error) {
            console.error('Error updating user data:', error);
            alert('Cập nhật thất bại!');
        }
    };

    return (
        < main className="flex-1 p-8 pl-14" >
            <h1 className="text-2xl text-red-600 font-bold mb-6 uppercase border-b pb-3">Thông tin của tôi</h1>

            <div className="space-y-5 max-w-3xl">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email người dùng</label>
                    <input
                        type="text"
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tên người dùng</label>
                    <input
                        type="text"
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        value={fullName}
                        onChange={e => setFullName(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
                    <input
                        type="text"
                        placeholder="Số điện thoại"
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        value={phoneNumber}
                        onChange={e => setPhoneNumber(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ nhận hàng</label>
                    <input
                        type="text"
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        placeholder='Nhập địa chỉ nhận hàng'
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                    />
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3 pt-4">
                    {/* <button className="px-4 py-2 bg-black text-white rounded">Hủy bỏ</button> */}
                    <button onClick={handleUpdate} className="px-4 py-2 bg-[#de0000] text-white rounded-sm">Cập nhật</button>
                </div>
            </div>
        </main >
    );
};

export default AccountInfo;