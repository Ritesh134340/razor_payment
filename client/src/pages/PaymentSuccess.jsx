import React from 'react'
import {useSearchParams} from "react-router-dom"
import {Link} from "react-router-dom"

const PaymentSuccess = () => {
    const searchQuery=useSearchParams()[0]
    const ref=searchQuery.get("ref")
  return (
    <div className="py-[20px] px-[15px] rounded-[8px] m-auto mt-[100px]">
        <p className="text-2xl font-bold text-center">Order Successful !</p>
        <p className="text-center text-xl">Refrence No : {ref}</p>
        <div className="text-center mt-[30px] text-blue-800 ">
        <Link to="/" className="text-center mt-[20px]">Go Home</Link>
        </div>
        
    </div>
  )
}

export default PaymentSuccess