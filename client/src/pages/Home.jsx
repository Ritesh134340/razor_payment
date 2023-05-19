import React,{useState} from 'react'
import PaymentForm from '../components/PaymentForm'
import Card from '../components/Card'
import axios from "axios"

const data=[
  {
    name:"Headphone",
    amount:4000,
    url:"https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2FkZ2V0c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    name:"Phone",
    amount:10000,
    url:"https://images.unsplash.com/photo-1580910051074-3eb694886505?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHBob25lfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
  },
  {
    name:"Stove",
    amount:6000,
    url:"https://images.unsplash.com/photo-1609211373254-b52e03ba0c85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3RvdmV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    name:"Laptop",
    amount:34000,
    url:"https://plus.unsplash.com/premium_photo-1681286768130-b9da2bdc6695?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bGFwdG9wfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
  },

  {
    name:"Camera",
    amount:8000,
    url:"https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2FtZXJhfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
  },
  
]

const Home = () => {
  const [loading, setLoading] = useState(false)
  const handleCheckout=async (amount)=>{
    setLoading(true)
    const {data:{key}}=await axios.get("http://localhost:8080/api/key")
 

   axios.post("http://localhost:8080/api/razorpay/checkout",{amount:amount})
   .then((res)=>{

    const options = {
      key: key, 
      amount:res.data.amount,
      currency: "INR",
      name: "Payment System",
      description: "Test Razorpay Transaction",
      image: "https://avatars.githubusercontent.com/u/105931703?s=40&v=4",
      order_id: res.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: "http://localhost:8080/api/razorpay/paymentverification",
      prefill: {
          name: "Ritesh Kumar",
          email: "riteshkumar@gmail.com",
          contact: "9000090000"
      },
      notes: {
          address: "Razorpay Corporate Office"
      },
      theme: {
          color: "#3399cc"
      }
  };
  var rzp1 = new window.Razorpay(options);
      rzp1.open();
    setLoading(false)
   })

   .catch((err)=>{

    console.log("Some error occured",err)
    setLoading(false)
   })
  }

  return (
    <div>
        <h3 className="text-center mt-[30px] text-2xl font-bold border-b-[2px] pb-[10px] sticky top-[0px] bg-white mb-[50px]">Shop Now</h3>
      { loading ? <div className="text-center my-[50px]"><h3>Loading...</h3></div> : <div className=" m-auto mt-[80px] w-[70%]" style={{display:"grid", gridTemplateColumns:"repeat(2,1fr)",gap:"100px 30px"}}>
        {
          data && data.map((ele,index)=>{
           return  <Card key={index} data={ele} handleCheckout={handleCheckout}/>
          })
         }
        </div>}
        
       
        <PaymentForm/>
    </div>
  )
}

export default Home