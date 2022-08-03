import React from 'react'
import Select from "react-select";
import ReactPayPal from "./ReactPayPal";
import NumericInput from 'react-numeric-input';


export default function ProductOrder(props) {
    const [amount, setAmount] = React.useState(0);
    const [quantity, setQuantity] = React.useState(0);
    const [product, setProduct] = React.useState(null);
    const [checkout, setCheckout] = React.useState(false);
    const options = [
        { value: '0', label: '' },
        { value: '100', label: 'Product1' },
        { value: '200', label: 'Product2' },
        { value: '300', label: 'Product3' }
    ];



    return (
        <div className="container">
            {(checkout === false) ?
                <div>

                    {/* ---->    Product selection ------ */}
                    <div className="row">
                        <div className="col-md-3">Product :</div>
                        <div className="col-md-6">
                            <Select
                                options={options}
                                onChange={(event) => {
                                    setAmount(event.value);
                                    setProduct(event.label)
                                }}
                            />
                        </div>

                        {/* ----    Product selection <------ */}
                        <div className="col-md-3"></div>
                    </div>
                    <br></br>
                    {
                        (product !== null) ?
                            <div>
                                <div className="row">
                                    <div className="col-md-3">Quantity :</div>
                                    <div className="col-md-6">
                                        <NumericInput
                                            precision={8}
                                            mobile={true}
                                            min={0}
                                            value={quantity}
                                            className="form-control"
                                            onChange={setQuantity}
                                        />


                                    </div>
                                    <div className="col-md-3"></div>
                                </div>
                            </div> :
                            <div></div>
                    }

                    <br></br>
                    <div className="row">
                        <div className="col-md-3">Order :</div>
                        <div className="col-md-6">
                            Product:   {product}  <br></br>  Amount: {amount} <br></br> Quantity: {quantity} <br></br> Summary : {amount * quantity}


                        </div>
                        <div className="col-md-3"></div>
                    </div>


                    {
                        (amount > 0 && quantity > 0) ?
                            <div>

                                <button onClick={() => { setCheckout(true) }} >Pay</button>
                            </div> :
                            <div></div>

                    }
                </div> :

                <div></div>

            }
            <div>


                {(checkout === true)

                    ? <div className="payment-div">
                        <ReactPayPal amount={amount * quantity} product={product} />
                        <div>

                            <button
                                class="btn btn-danger"
                                onClick={() => {

                                    setCheckout(false);
                                    setAmount(0);
                                    setProduct(null)
                                    setQuantity(0)
                                }} >Change Order</button>
                        </div>
                    </div>

                    : <div>

                    </div>
                }
            </div>
        </div>
    )
}
