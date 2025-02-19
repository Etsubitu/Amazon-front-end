import React, { useEffect, useState } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../API/EndPoints";
import classes from "./Result.module.css";
import ProductCard from "../../Components/Product/ProductCard";
import Loader from "../../Components/Loader/Loader";

function Result() {
  const [products, setProduct] = useState([]);
  const [isLoading,setIsLoading]=useState(false)
  const { categoryName } = useParams();
  useEffect(() => {
    setIsLoading(true)
    axios
      .get(`${productUrl}/products/category/${categoryName}`)
      .then((res) => {
        setProduct(res.data);
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false)
      })
  },[])
  // console.log(products);

  return (
    <LayOut>
      {isLoading?(<Loader/>):(<section>
        <h1 style={{ padding: "30px" }}>Result</h1>
        <p style={{ padding: "30px" }}>Category/{categoryName}</p>
        <div className={classes.products_container}>
          
          {products?.map((product) =>
            (
              <ProductCard
                key={product.id}
                product={product}
                renderAdd={true}
              />
          ))}
      
          
        </div>
      </section>)}
    </LayOut>
        );

      }
export default Result;
