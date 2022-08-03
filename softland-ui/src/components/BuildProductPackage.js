import React from 'react';
import SingleProduct from "./builder/SingleProduct";

export default function BuildProductPackage() {
    const [productCount, setProductCount] = React.useState(1);
    const [totalAmount, setTotalAmount] = React.useState(0);
    const ProductSelections = [];

    function handleTotalAmountChange(newAmount) {
        
        setTotalAmount(newAmount);
      }
  

    ProductSelections.push(<SingleProduct amount ={totalAmount} onChange ={handleTotalAmountChange} />);

    for (let i = 1; i < productCount; i++) {
        ProductSelections.push(<SingleProduct amount ={totalAmount} onChange ={handleTotalAmountChange} />);
    }


    return (
        <div>
            <div>
                Number of Products: {productCount}


                {ProductSelections}
            </div>
            {(productCount < 5) ?

                <button onClick={() => { setProductCount(productCount + 1) }} >Add Product</button> :
                <div> </div>

            }
    {/* <div> Summary Amount : {totalAmount}</div> */}

        </div>
    )
}
