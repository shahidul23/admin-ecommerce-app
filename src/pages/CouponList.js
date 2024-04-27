import React, { useEffect } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BiEdit } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import { getCoupon } from '../features/coupons/couponSlice';

const columns = [
    {
      title: '#',
      dataIndex: 'key',
      sorter: (a, b) => a.key - b.key,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: 'Expiry Date',
      dataIndex: 'expiry',
      sorter: (a, b) => a.expiry.length - b.expiry.length,
    },
    {
      title: 'Discount Amount',
      dataIndex: 'discount',
      sorter: (a, b) => a.discount.length - b.discount.length,
    },
    {
      title: 'Action',
      dataIndex: 'action',
    },
  ];
 
const CouponList = () => {

  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getCoupon())
  },[dispatch]);
  const couponState = useSelector((state) => state.coupon.coupon);
  const Tabledata = [];
  if (Array.isArray(couponState)) {
    for (let i = 0; i < couponState.length; i++) {
      Tabledata.push({
        key: i+1,
        name: couponState[i].name,
        expiry: new Date(couponState[i].expiry).toLocaleString(),
        discount: couponState[i].discount,
        action: (<>
        <Link to="/" className='text-warning fs-3'>
          <BiEdit />
        </Link>
        <Link to="/" className='text-danger fs-3'>
          <MdDeleteForever />
        </Link>
        </>)
      });
    }
  }
  return (
    <div>
      <h3 className='mb-4 title'>Brand List</h3>
      <div>
      <Table columns={columns} dataSource={Tabledata} />
      </div>
    </div>
  )
}

export default CouponList
