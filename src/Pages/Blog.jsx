import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Sidebar from "../hooks/cargallery/Sidebar";
const blogs = [
  {
    id: 1,
    title: "The Evolution of Sports Cars",
    description:
      "Explore the history and development of sports cars from classic models to modern supercars. Each car has a story of innovation, design, and speed.",
    image: "https://cdn.pixabay.com/photo/2018/05/15/23/02/football-stadium-3404535_640.jpg",
    type: "vertical",
  },
  {
    id: 2,
    title: "Top 10 Electric Vehicles in 2025",
    description:
      "A roundup of the most innovative electric vehicles that are changing the automotive industry. Discover Tesla, Rivian, Lucid Motors, and more.",
    image: "https://cdn.pixabay.com/photo/2020/02/03/10/02/sports-car-4815234_640.jpg",
    type: "horizontal",
  },
  {
    id: 3,
    title: "Classic Cars Restored",
    description:
      "Vintage cars restored with incredible craftsmanship. Learn about the challenges and techniques used to bring these timeless classics back to life.",
    image: "https://cdn.pixabay.com/photo/2023/02/05/21/34/porsche-7770665_640.jpg",
    type: "vertical",
  },
  {
    id: 4,
    title: "Automotive Photography Tips",
    description:
      "Learn how to capture stunning photos of cars with pro techniques, lighting, angles, and editing tips.",
    image: "https://cdn.pixabay.com/photo/2016/02/13/13/11/oldtimer-1197800_960_720.jpg",
    type: "horizontal",
  },
  {
    id: 5,
    title: "Top Car Shows Around the World",
    description:
      "Discover the most popular international car shows and exhibitions for automotive enthusiasts.",
    image: "https://cdn.pixabay.com/photo/2024/11/05/05/38/japancontest-9175030_640.jpg",
    type: "vertical",
  },
  {
    id: 6,
    title: "Futuristic Car Designs",
    description:
      "A glimpse into the future of automotive design with innovative concepts and prototypes.",
    image: "https://cdn.pixabay.com/photo/2020/03/31/16/33/road-4988448_640.jpg",
    type: "horizontal",
  },
  {
    id: 7,
    title: "Luxury Car Interiors",
    description:
      "Explore the luxury, comfort, and technology integrated into modern high-end car interiors.",
    image: "https://cdn.pixabay.com/photo/2018/04/07/16/30/auto-3298890_640.jpg",
    type: "vertical",
  },
  {
    id: 8,
    title: "Motor Show Highlights",
    description:
      "Highlights from the latest motor shows including new models, technology showcases, and concept cars.",
    image: "https://cdn.pixabay.com/photo/2016/09/02/08/32/cars-1638594_640.jpg",
    type: "horizontal",
  },
 
 
  {
    id: 10,
    title: "Vintage Car Restoration",
    description:
      "Restoring classic cars with precision and attention to detail, keeping history alive.",
    image: "https://cdn.pixabay.com/photo/2016/02/13/13/11/oldtimer-1197800_960_720.jpg",
    type: "vertical",
  },
  {
    id: 11,
    title: "Exotic Supercars",
    description:
      "A collection of high-performance exotic supercars from around the world.",
    image: "https://cdn.pixabay.com/photo/2022/12/06/15/53/concept-car-7639258_640.jpg",
    type: "vertical",
  },
  {
    id: 12,
    title: "Electric Car Innovations",
    description:
      "Showcasing the latest electric vehicles and their innovative technologies.",
    image: "https://cdn.pixabay.com/photo/2020/02/03/10/02/sports-car-4815234_640.jpg",
    type: "vertical",
  },
  {
    id: 13,
    title: "Concept Cars 2025",
    description:
      "Futuristic car concepts designed to push the boundaries of automotive design.",
    image: "https://cdn.pixabay.com/photo/2020/03/31/16/33/road-4988448_640.jpg",
    type: "vertical",
  },


];

const BlogMixed = () => {
  const [verticalBlogs, setVerticalBlogs] = useState([]);
  const [horizontalBlogs, setHorizontalBlogs] = useState([]);

  useEffect(() => {
    setVerticalBlogs(blogs.filter((b) => b.type === "vertical"));
    setHorizontalBlogs(blogs.filter((b) => b.type === "horizontal"));
  }, []);

  const horizontalSettings = {
    dots: false,
    infinite: true,
    speed: 4000,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 1 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <>
    <Sidebar/>
    <div className="w-full   py-12 bg-gray-50 space-y-16">
    <div className="text-center">
  <h1 className="text-8xl pt-32 font-bold pb-6">The Gallery Blog</h1>
  <p className="text-gray-600 text-xl pb-20 max-w-3xl mx-auto">
    Discover the latest trends, stories, and insights from the world of cars. 
    From stunning photography to in-depth articles, The Gallery Blog keeps you 
    inspired and informed.
  </p>
</div>


      {/* Horizontal Carousel */}
      <div>
        <h2 className="text-5xl font-semibold pl-30  mb-6">Featured Stories</h2>
        <Slider {...horizontalSettings}>
          {horizontalBlogs.map((blog) => (
            <div key={blog.id} className="px-3">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-64 md:h-80 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-2">{blog.title}</h3>
                  <p className="text-gray-700">{blog.description}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

    {/* Vertical Cards */}
<div className="pl-30 pr-20 pb-20">
  <h2 className="text-5xl pt-10 font-semibold mb-6">More Stories</h2>
  <div className="grid md:grid-cols-3 gap-8">
    {verticalBlogs.map((blog) => (
      <div
        key={blog.id}
        className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col"
      >
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-80 md:h-64 object-cover"
        />
        <div className="p-6 flex flex-col flex-1">
          <h3 className="text-2xl font-semibold mb-2">{blog.title}</h3>
          <p className="text-gray-700 flex-1">{blog.description}</p>
         
        </div>
      </div>
    ))}
  </div>
</div>
  <div
                className="w-full h-screen bg-cover bg-center"
                style={{
                    backgroundImage: "url('/images/madewith-banner.avif')",
                }}
            ></div>

    </div>
    </>
  );
};

export default BlogMixed;
