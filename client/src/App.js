import {Route,Routes} from "react-router-dom"
import Home from "./pages/Home";
import PaymentSuccess from "./pages/PaymentSuccess";

function App() {
  return (
   <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/payment/success" element={<PaymentSuccess/>} />
   </Routes>
  );
}

export default App;
