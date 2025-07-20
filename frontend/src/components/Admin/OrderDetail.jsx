import axios from 'axios'
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import { useParams } from 'react-router-dom';

function OrderDetail() {

    const { id } = useParams();
    const [order, setOrder] = useState(null)

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/v1/admin/order-detail/${id}`, {
                    withCredentials: true
                });
                setOrder(res.data);
                console.log(res.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchOrder();
    }, [id]);

    if (!order) return null;

    return (
        <div>OrderDetail</div>
    )
}

export default OrderDetail