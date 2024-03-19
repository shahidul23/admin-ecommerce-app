import React, { useEffect } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../features/auth/authSlice';
import { Link } from 'react-router-dom';
import { BiEdit } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";

const columns = [
  {
    title: '#',
    dataIndex: 'key',
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Products',
    dataIndex: 'products',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
  },
  {
    title: 'Date',
    dataIndex: 'date',
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },
];
const Oder = () => {
  const dispatch = useDispatch();
  useEffect(() =>{
    dispatch(getOrders());
  },[dispatch]);
  const ordersState = useSelector((state)=>state.auth.orders)
  const Tabledata = [];

if (Array.isArray(ordersState)) {
  for (let i = 0; i < ordersState.length; i++) {
    Tabledata.push({
      key: i + 1,
      name: ordersState[i].orderBy.firstName + " "+ ordersState[i].orderBy.lastName,
      products: ordersState[i].products.map((i,j)=>{
        return (
          <div key={j}>
            <ul>
              <li>{i.product.title}</li>
            </ul>
          </div>
        );
      }),
      amount: `$${ordersState[i].paymentIntent.amount}`,
      date: new Date(ordersState[i].createdAt).toLocaleString(),
      action:(
        <>
        <Link to="/" className='text-warning fs-3'>
          <BiEdit />
        </Link>
        <Link to="/" className='text-danger fs-3'>
          <MdDeleteForever />
        </Link>
        </>
      )
    });
  }
}
  return (
    <div>
      <h3 className='mb-4 title'>Orders</h3>
      <Table columns={columns} dataSource={Tabledata} />
    </div>
  )
}

export default Oder
