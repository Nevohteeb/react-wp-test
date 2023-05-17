import { ArrowLeft } from 'react-bootstrap-icons'
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {

    return (
        <>
            <h2>Payment successful</h2>
        </>
    )
}


const Checkout = () => {
    const navigate = useNavigate()
    return (
        <>
            <div id="checkout-page" className="container">
                <CheckoutForm />
                <button onClick={() => navigate(-1)} className="regular-button"><ArrowLeft /> Go Back</button>
            </div>

        </>
    )
}

export default Checkout