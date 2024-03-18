import React, { useEffect } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../features/customers/customerSlice';


const columns = [
    {
      title: '#',
      dataIndex: 'key',
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
      title: 'Phone Number',
      dataIndex: 'phone',
      sorter: (a, b) => a.phone - b.phone,
    },
  ];
  

const Customers = () => {
  const dispatch = useDispatch();
  useEffect(() =>{
    dispatch(getUsers());
  },[]);
let CustomerState = useSelector((state) => state.customer.customers.getAllUsers);
const Tabledata = [];

if (Array.isArray(CustomerState)) {
  for (let i = 0; i < CustomerState.length; i++) {
    if (CustomerState[i].role !== "Admin") {
      Tabledata.push({
        key: i + 1,
        name: CustomerState[i].firstName + " " + CustomerState[i].lastName,
        email: CustomerState[i].email,
        phone: "0" + CustomerState[i].mobile,
      });
    }
  }
} else {
  console.error("CustomerState is not an array or is undefined.");
}
  // let CustomerState = useSelector((state) => state.customer.customers.getAllUsers);
  // const Tabledata = [];
  // for (let i = 0; i < CustomerState.length; i++) {
  //   if (CustomerState[i].role !=="Admin") {
  //     Tabledata.push({
  //       key: i+1,
  //       name: CustomerState[i].firstName +" "+ CustomerState[i].lastName,
  //       email: CustomerState[i].email,
  //       phone: "0"+CustomerState[i].mobile,
  //     });
  //   }
  // }
  return (
    <div>
      <h3 className='mb-4 title'>Customers</h3>
      <div>
      <Table columns={columns} dataSource={Tabledata} />
      </div>
    </div>
  )
}

export default Customers
