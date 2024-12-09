import React from "react";
import { Carousel } from "react-responsive-carousel";
import { images } from "./img/data";
import classes from "./Carousel.module.css"
import CarouselEffect from "./CarouselEffect";
function CarouselEffect() {
  return (
    <div>
      <Carousel
        autoPlay={true}
        infiniteloop={true}
        showIndicators={false}
        showThumbs={false}
      >
        {images.map((imageLink, i) => {
          return <img key={i} src={imageLink} alt="" />;
        })}
      </Carousel>
      <div className={classes.hero_img}></div>
    </div>
  );
}

export default CarouselEffect;
