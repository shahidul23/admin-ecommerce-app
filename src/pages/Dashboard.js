import React from 'react'
import { GoArrowDownRight, GoArrowUpRight } from "react-icons/go";
const Dashboard = () => {
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
        </div>
      </div>
    </div>
  )
}

export default Dashboard
