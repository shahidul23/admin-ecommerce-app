import React, { useEffect } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getColors } from '../features/color/colorSlice';
import { Link } from 'react-router-dom';
import { BiEdit } from "react-icons/bi";
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
      title: 'Action',
      dataIndex: 'action',
    },
  ];
const ColorList = () => {

  const dispatch = useDispatch();
  useEffect(() =>{
    dispatch(getColors())
  },[dispatch]);
  const colorState = useSelector((state) =>state.color.colors)
  const Tabledata = [];
  if (Array.isArray(colorState)) {
    for (let i = 0; i < colorState.length; i++) {
      Tabledata.push({
        key: i+1,
        name: colorState[i].title,
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
      <h3 className='mb-4 title'>Colors</h3>
      <div>
      <Table columns={columns} dataSource={Tabledata} />
      </div>
    </div>
  )
}

export default ColorList
