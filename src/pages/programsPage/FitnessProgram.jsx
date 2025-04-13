// AllClassesSection.jsx
import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import p_7 from "./../../assets/P7.webp"
import p_13 from "./../../assets/P13.webp"
import p_20 from "./../../assets/P20.webp"
import p_22 from "./../../assets/P22.webp"



const classes = [
  { title: 'Gym Ball', img: p_7, link: 'hiit.html' },
  { title: 'X Blast', img: p_13, link: 'hiit.html' },
  { title: 'Surge', img: p_20, link: 'hiit.html' },
  { title: 'Body Pump', img: p_22, link: 'hiit.html' }
];

const AllClassesSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  return (
    <div className="py-[75px] bg-white bg-center mt-20">
      <div className="max-w-7xl mx-auto px-4 text-center">


        <div className="w-[38px] h-[7px] mx-auto mb-4 bg-[#4c00ff] transform skew-x-[30deg]"></div>

        <h3 className="text-[40px] font-bold italic text-gray-800 mb-2">All Classes</h3>
        <span className="text-[19px] font-semibold text-[#929292] tracking-wide">
          Of Personal Training
        </span>

        <div className="mt-12">
          <Slider {...settings}>
            {classes.map((item, index) => (
              <div key={index} className="px-3">
                <div className="bg-white rounded-lg overflow-hidden shadow-md text-center">
                  <a href={item.link}>
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-[300px] object-cover hover:scale-105 transition-transform duration-300"
                      draggable={false}
                    />
                  </a>
                  <h3 className="text-[32px] italic font-bold text-gray-900 mt-4 mb-6">
                    <a href={item.link}>{item.title}</a>
                  </h3>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default AllClassesSection;
