import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteColor, getColors, resetState } from '../features/color/colorSlice';
import { Link } from 'react-router-dom';
import { BiEdit } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
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
      title: 'Action',
      dataIndex: 'action',
    },
  ];
const ColorList = () => {

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [colorId, setColorId] = useState("");
  const colorState = useSelector((state) =>state.color.colors)
  const newColor = useSelector(state => state.color)
  const { isError, isLoading, isSuccess,  deleteColors} = newColor;
  const showModal = (id) => {
    setOpen(true);
    setColorId(id);
  };
  const hideModal = () => {
    setOpen(false);
  };
  useEffect(() =>{
    dispatch(getColors())
  },[dispatch]);
  
  const Tabledata = [];
  if (Array.isArray(colorState)) {
    for (let i = 0; i < colorState.length; i++) {
      Tabledata.push({
        key: i+1,
        name: colorState[i].title,
        action: (<>
        <Link to={`/admin/color/${colorState[i]._id}`} className='text-warning fs-3'>
          <BiEdit />
        </Link>
        <button 
          onClick={() => showModal(colorState[i]._id)} 
          className='text-danger fs-3 bg-transparent border-0' >
          <MdDeleteForever />
        </button>
        </>)
      });
    }
  }  
  const handleDelete = (id) => {
    dispatch(deleteColor(id))
    setOpen(false)
    setTimeout(() => {
      dispatch(resetState())
      dispatch(getColors())

    }, 100);
  }
  useEffect(() => {
    if (isSuccess && deleteColors) {
      toast.success("Color has been Deleted successfully.", {
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
  }, [isError, isSuccess, isLoading, deleteColors]);
  return (
    <div>
      <h3 className='mb-4 title'>Colors</h3>
      <div>
      <Table columns={columns} dataSource={Tabledata} />
      </div>
      <CustomModal 
        hideModal={hideModal}
        open={open}
        performAction= {() => handleDelete(colorId)}
        title="Are you sure you want to delete this Color?"/>
    </div>
  )
}

export default ColorList
