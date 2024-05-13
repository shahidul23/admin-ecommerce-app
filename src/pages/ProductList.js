import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { getProducts, productDelete, resetState } from '../features/product/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BiEdit } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import CustomModal from '../components/CustomModal';
import { toast } from 'react-toastify';

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
      title: 'Code',
      dataIndex: 'code',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Category',
      dataIndex: 'category',
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: 'Action',
      dataIndex: 'action',
    },
  ];

const ProductList = () => {
  const [open, setOpen] = useState(false);
  const [ productId, setProductID ] = useState("");
  const  dispatch = useDispatch();
  const newProduct = useSelector(state => state.product);
  const { isError, isLoading, isSuccess, deleteProducts } = newProduct; 
  const showModal = (id) => {
    setOpen(true);
    setProductID(id);
  };
  const hideModal = () => {
    setOpen(false);
  };
  useEffect(()=>{
    dispatch(getProducts())
  },[dispatch]);

  const productState = useSelector((state) => state.product.products.Products);
  const Tabledata = [];
  if (Array.isArray(productState)) {
    for (let i = 0; i < productState.length; i++) {
      Tabledata.push({
        key: i+1,
        name: productState[i].title,
        code: productState[i].code,
        price : productState[i].price,
        category: productState[i].category,
        brand:  productState[i].brand,
        quantity: productState[i].quantity,
        action: (<>
          <Link to={`/admin/product/${productState[i]._id}`} className='fs-3 text-danger'>
            <BiEdit />
          </Link>
          <button 
          onClick={() => showModal(productState[i]._id)} 
          className='text-danger fs-3 bg-transparent border-0' >
          <MdDeleteForever />
        </button>
        </>
        )
      });
    }
  }

  const HandelDelete = (id) =>{
    dispatch(productDelete(id))
    setOpen(false);
    setTimeout(() => {
      dispatch(resetState())
      dispatch(getProducts())
    }, 100);
  }
  useEffect(() => {
    if (isSuccess && deleteProducts) {
      toast.success("Product has been Deleted successfully.", {
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
  }, [isError, isSuccess, isLoading, deleteProducts]);
  
  return (
    <div>
      <h3 className='mb-4 title'>Product List</h3>
      <div>
        <Table columns={columns} dataSource={Tabledata} />
      </div>
      <CustomModal
      hideModal={hideModal}
      open={open}
      performAction= {() => HandelDelete(productId)}
      title="Are you sure you want to delete this Product?"/>
    </div>
  )
}

export default ProductList
