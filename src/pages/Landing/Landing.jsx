import React from 'react'
import Category from "../../Components/Category/Category";
import Product from "../../Components/Product/Product";
import CarouselEffect from "../../Components/Carousel/CarouselEffect";
import LayOut from '../../Components/LayOut/LayOut';


function Landing() {
  return (
    <>
    <LayOut/>
      <CarouselEffect/>
      <Category />
      <Product />
    </>
  );
}

export default Landing
