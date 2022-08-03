import React from 'react';
import Select from "react-select";
import NumericInput from 'react-numeric-input';

export default function SingleProduct(props) {
    const [amount, setAmount] = React.useState(0);
    const [quantity, setQuantity] = React.useState(0);
    const [product, setProduct] = React.useState(null);
   // const [singleTotal, setSingleTotal] = React.useState(0);

    // function handleAmountChange() {
    //     var newTotalAmount = amount*quantity;
    //     var totalAmountFromParent = props.amount;
    //     props.onChange(totalAmountFromParent+newTotalAmount);
    //   }

    const options = [
        { value: '0', label: '' },
        { value: '100', label: 'Product1' },
        { value: '200', label: 'Product2' },
        { value: '300', label: 'Product3' }
    ];
    //setSingleTotal(amount * quantity);
    return (
        <div className="container">

            <div 
            class="border"
            // class="mx-auto" 
            >

   

                {/* ---->    Product selection ------ */}
                <div className="row">
                    <div className="col-md-3">Product :</div>
   
                    <div className="col-md-6">
                        <Select
                            options={options}
                            onChange={(event) => {
                                setAmount(event.value);
                                setProduct(event.label);
                              // handleAmountChange();
                                //setSingleTotal(amount * quantity);
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
                                        onChange={setQuantity
                                        }
                                       // onChange={handleAmountChange()}

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
                        Product :  <b>{product}</b>    Amount :  <b>{amount}</b>  Quantity :   <b>{quantity}</b>  Summary  :  <b>{<b>{amount*quantity}</b> }</b> 


                    </div>
                    <div className="col-md-3"></div>
                </div>

                </div>
        

     
        <div>



        </div>
    </div>
)
    
}
