import React from 'react'
import { GoArrowDownRight, GoArrowUpRight } from "react-icons/go";
import { Column } from '@ant-design/plots';
import { Table } from 'antd';
const Dashboard = () => {
  const data = [
    {
      type: 'Jan',
      sales: 38,
    },
    {
      type: 'Fab',
      sales: 52,
    },
    {
      type: 'Mar',
      sales: 61,
    },
    {
      type: 'Apr',
      sales: 145,
    },
    {
      type: 'May',
      sales: 48,
    },
    {
      type: 'Jun',
      sales: 38,
    },
    {
      type: 'July',
      sales: 28,
    },
    {
      type: 'Aug',
      sales: 68,
    },
    {
      type: 'Sept',
      sales: 18,
    },
    {
      type: 'Oct',
      sales: 88,
    },
    {
      type: 'Nov',
      sales: 28,
    },
    {
      type: 'Dec',
      sales: 98,
    },
  ];
  const config = {
    data,
    xField: 'type',
    yField: 'sales',
    color: ({ type }) => {
      return "#ffd333";
    },
    label: {
      position: 'middle',
      // 'top', 'bottom', 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: 'Months',
      },
      sales: {
        alias: 'Incomes',
      },
    },
  };
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
      title: 'Product',
      dataIndex: 'product',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
  ];
  const Tabledata = [];
  for (let i = 0; i < 46; i++) {
    Tabledata.push({
      key: i+1,
      name: `Edward King ${i+1}`,
      product: 32,
      status: `London, Park Lane no. ${i+1}`,
    });
  }
  return (
    <div>
      <h3 className='mb-4'>Dashboard</h3>
      <div className='d-flex justify-content-between align-items-center gap-3'>
        <div className='d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3'>
          <div>
            <p>Total</p>
            <h4 className='mb-0'>$ 1100</h4>
          </div>
          <div className='d-flex flex-column align-items-end'>
            <h6 className='green'><GoArrowUpRight className='green'/> 23%</h6>
            <p className='mb-0'>Compare to April 2022</p>
          </div>
        </div>
        <div className='d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3'>
          <div>
            <p>Total</p>
            <h4 className='mb-0'>$ 1100</h4>
          </div>
          <div className='d-flex flex-column align-items-end'>
            <h6 className='red'><GoArrowDownRight className='red'/> 23%</h6>
            <p className='mb-0'>Compare to April 2022</p>
          </div>
        </div>
        <div className='d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3'>
          <div>
            <p>Total</p>
            <h4 className='mb-0'>$ 1100</h4>
          </div>
          <div className='d-flex flex-column align-items-end'>
            <h6 className='green'><GoArrowUpRight className='green'/> 23%</h6>
            <p className='mb-0'>Compare to April 2022</p>
          </div>
        </div>
      </div>
      <div className='mt-4'>
        <h3 className='mb-4'>Income Statistics</h3>
        <div>
          <Column {...config} />
        </div>
      </div>
      <div className='mt-4'>
        <h3 className='mb-4'>Recent Orders</h3>
        <div>
        <Table columns={columns} dataSource={Tabledata} />
        </div>
      </div>
      {/* <div className='mt-4'>
        <h3 className='mb-4'>Recent Reviews</h3>
        <div className='d-flex'>
          <div></div>
        </div>
      </div> */}
    </div>
  )
}

export default Dashboard
