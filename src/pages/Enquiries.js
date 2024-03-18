import React, { useEffect } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getEnquirys } from '../features/enquiry/enquirySlice';
import { Link } from 'react-router-dom'; 
import { MdDeleteForever } from "react-icons/md";

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
    title: 'Email',
    dataIndex: 'email',
    sorter: (a, b) => a.email.length - b.email.length,
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    sorter: (a, b) => a.phone - b.phone,
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },
];

const Enquiries = () => {
  const dispatch = useDispatch();
  useEffect(() =>{
    dispatch(getEnquirys());
  },[dispatch]);
  const enquiryState = useSelector((state) =>state.enquiry.enquirys)
  const Tabledata = [];

if (Array.isArray(enquiryState)) {
  for (let i = 0; i < enquiryState.length; i++) {
    Tabledata.push({
      key: i + 1,
      name: enquiryState[i].name,
      email: enquiryState[i].email,
      phone:enquiryState[i].phone,
      status: (<>
      <select name='' className='form-control form-select' id=''>
        <option value="">Set Status</option>
      </select>
      </>),
      action: (<>
        <Link to="/" className='text-danger fs-3'>
          <MdDeleteForever />
        </Link>
        </>)
    });
  }
} else {
  console.error("CustomerState is not an array or is undefined.");
}
  return (
    <div>
      <h3 className='mb-4 title'>Enquiries</h3>
      <div>
      <Table columns={columns} dataSource={Tabledata} />
      </div>
    </div>
  )
}

export default Enquiries
