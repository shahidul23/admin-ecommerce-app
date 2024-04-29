import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BiEdit } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import { deleteCoupon, getCoupon, resetState } from '../features/coupons/couponSlice';
import CustomModal from '../components/CustomModal';
import { toast } from 'react-toastify';

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
  const [open, setOpen] = useState(false);
  const [ couponId, setCouponId ] = useState("");
  const deleteACoupon = useSelector((state) =>{
    return state.coupon;
  });
  console.log(deleteACoupon)
  const { isError, isLoading, isSuccess,  deleteCoupons} = deleteACoupon;
  const showModal = (id) => {
    setOpen(true);
    setCouponId(id)
  };
  const hideModal = () => {
    setOpen(false);
  };
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
        <Link to={`/admin/coupon/${couponState[i]._id}`} className='text-warning fs-3'>
          <BiEdit />
        </Link>
        <button onClick={() => showModal(couponState[i]._id)} className='text-danger fs-3 bg-transparent border-0'>
          <MdDeleteForever />
        </button>
        </>)
      });
    }
  }
  const handleDelete = (id) => {
    dispatch(deleteCoupon(id));
    setOpen(false);
    setTimeout(() =>{
      dispatch(resetState());
      dispatch(getCoupon());
    }, 100)
  }
  useEffect(() => {
    if (isSuccess && deleteCoupons) {
      toast.success("Coupon has been Deleted successfully.", {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    if (isError) {
      toast.error('Something went wrong! Please try again later', {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [isError, isSuccess, isLoading, deleteCoupons]);
  return (
    <div>
      <h3 className='mb-4 title'>Coupon List</h3>
      <div>
      <Table columns={columns} dataSource={Tabledata} />
      </div>
      <CustomModal 
        hideModal={hideModal}
        open={open}
        performAction= {() =>handleDelete(couponId)}
        title="Are you sure you want to delete this Coupon?"/>
    </div>
  )
}

export default CouponList
