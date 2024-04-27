import React, {useState, useEffect } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBrand, getBrands, resetState } from '../features/brands/brandSlice';
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
 
const BrandList = () => {

  const [open, setOpen] = useState(false);
  const [brandId, setBrandId] = useState("");
  const newBrand = useSelector(state => state.brand);
  const { isError, isLoading, isSuccess,  deleteBrands} = newBrand;
  const showModal = (id) => {
    setOpen(true);
    setBrandId(id);
  };
  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(resetState())
    dispatch(getBrands())
  },[dispatch]);
  const brandState = useSelector((state) => state.brand.brands)
  const Tabledata = [];
  if (Array.isArray(brandState)) {
    for (let i = 0; i < brandState.length; i++) {
      Tabledata.push({
        key: i+1,
        name: brandState[i].title,
        action: (<>
        <Link to={`/admin/brand/${brandState[i]._id}`} className='text-warning fs-3'>
          <BiEdit />
        </Link>
        <button 
          onClick={() => showModal(brandState[i]._id)} 
          className='text-danger fs-3 bg-transparent border-0' >
          <MdDeleteForever />
        </button>
        </>)
      });
    }
  }

  const deleteBrandName = (id) => {
    dispatch(deleteBrand(id))
    setOpen(false);
    setTimeout(() => {
      dispatch(resetState())
      dispatch(getBrands())
    }, 100);
  }

  useEffect(() => {
    if (isSuccess && deleteBrands) {
      toast.success("Brand Name has been Deleted successfully.", {
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
  }, [isError, isSuccess, isLoading, deleteBrands]);

  return (
    <div>
      <h3 className='mb-4 title'>Brand List</h3>
      <div>
      <Table columns={columns} dataSource={Tabledata} />
      </div>
      <CustomModal 
        hideModal={hideModal}
        open={open}
        performAction= {() => deleteBrandName(brandId)}
        title="Are you sure you want to delete this brand?"/>
    </div>
  )
}

export default BrandList
