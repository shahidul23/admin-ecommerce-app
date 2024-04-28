import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCategory, getCategories, resetState } from '../features/category/categorySlice';
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

const CategoryList = () => {
  const [open, setOpen] = useState(false);
  const [categoryId, setCategoryId] = useState()
  const dispatch = useDispatch();
  const newCategory = useSelector(state => state.category)
  const { isError, isLoading, isSuccess,  deleteCategories} = newCategory;
  const showModal = (id) => {
    setOpen(true);
    setCategoryId(id)
  };
  const hideModal = () => {
    setOpen(false);
  };
  useEffect(() =>{
    dispatch(getCategories())
  },[dispatch]);

  const categoryState = useSelector((state) => state.category.categories)
  const Tabledata = [];
  if (Array.isArray(categoryState)) {
    for (let i = 0; i < categoryState.length; i++) {
      Tabledata.push({
        key: i+1,
        name: categoryState[i].title,
        action: (<>
        <Link to={`/admin/category/${categoryState[i]._id}`} className='text-warning fs-3'>
          <BiEdit />
        </Link>
        <button onClick={() => showModal(categoryState[i]._id)} className='text-danger fs-3 bg-transparent border-0'>
          <MdDeleteForever />
        </button>
        </>)
      });
    }
  }
  const handleCategoryDelete = (id) =>{
    dispatch(deleteCategory(id));
    setOpen(false)
    setTimeout(() =>{
      dispatch(resetState());
      dispatch(getCategories())
    },100)
  }
  useEffect(() => {
    if (isSuccess && deleteCategories) {
      toast.success("Category has been Deleted successfully.", {
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
  }, [isError, isSuccess, isLoading, deleteCategories]);
  return (
    <div>
      <h3 className='mb-4 title'>Brand List</h3>
      <div>
      <Table columns={columns} dataSource={Tabledata} />
      </div>
      <CustomModal 
        hideModal={hideModal}
        open={open}
        performAction= {() =>handleCategoryDelete(categoryId)}
        title="Are you sure you want to delete this Category?"/>
    </div>
  )
}

export default CategoryList
