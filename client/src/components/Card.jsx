import React from 'react'

const Card = ({data,handleCheckout}) => {
  return (
    <div >
        <img src={data.url} alt={data.name} style={{objectFit:"conver",width:"100%",height:"450px",borderRadius:"9px"}} />
        <p className="text-center text-xl mt-[15px]">{data.name}</p>
        <p className="text-center font-bold mb-[10px]">₹{data.amount}</p>
        <button className="m-auto block border-[1px] rounded-[8px] px-[15px] py-[8px] text-white bg-blue-800" onClick={()=>handleCheckout(data.amount)}>Buy Now</button>
    </div>
  )
}

export default Card