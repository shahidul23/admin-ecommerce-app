import React, { useEffect } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../features/auth/authSlice';

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
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
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
      name: ordersState[i].firstName,
      email: ordersState[i].email,
      phone: "0" + ordersState[i].mobile,
    });
  }
} else {
  console.error("orders is not an array or is undefined.");
}
  return (
    <div>
      <h3 className='mb-4 title'>Orders</h3>
      <Table columns={columns} dataSource={Tabledata} />
    </div>
  )
}

export default Oder
