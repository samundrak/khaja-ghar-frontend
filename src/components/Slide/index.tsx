import { Image } from "antd";
import React from "react";
import Slider from "react-slick";
import ImgAluChop from "../../images/alu-chop.jpg";
import ImgMakai from "../../images/makai.jpg";
import ImgAluPakora from "../../images/alu-pakora.jpg";
import ImgDosa from "../../images/dosa.jpg";
import ImgMomo from "../../images/momo.jpg";

const settings = {
  dots: true,
  infinite: true,
  speed: 200,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
};

const Slide = () => {
  return (
    <Slider {...settings}>
      <div>
        <Image src={ImgAluChop} />
      </div>
      <div>
        <Image src={ImgMakai} />
      </div>
      <div>
        <Image src={ImgAluPakora} />
      </div>
      <div>
        <Image src={ImgDosa} />
      </div>
      <div>
        <Image src={ImgMomo} />
      </div>
    </Slider>
  );
};
export default Slide;
