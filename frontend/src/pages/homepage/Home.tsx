import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import image1 from '../../images/2149631015.jpg';
import image2 from '../../images/22109.jpg';
import image3 from '../../images/348.jpg';
import image4 from '../../images/2149631017.jpg';
import image5 from '../../images/466.jpg';
import image6 from '../../images/14819.jpg';
import image7 from '../../images/850.jpg';

const Home = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    { src: image1, text: 'Streamline Your HR Processes with Ease' },
    {
      src: image2,
      text: 'Effortlessly Manage Employee Information with Personal Information Management',
    },
    {
      src: image3,
      text: 'Track Absence and Generate Detailed Reports in Real Time',
    },
    {
      src: image4,
      text: 'Ensure Fine-Grained Authorization for Secure Access Control',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="bg-white p-1">
      <div className="w-[60%] h-15 flex flex-row justify-around mt-10">
        <svg
          width="32"
          height="32"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 8.42105C0 3.77023 3.77023 0 8.42105 0H23.5789C28.2298 0 32 3.77023 32 8.42105V23.5789C32 28.2298 28.2298 32 23.5789 32H8.42105C3.77023 32 0 28.2298 0 23.5789V8.42105Z"
            fill="#3C50E0"
          />
          <g filter="url(#filter0_d_521_14078)">
            <path
              d="M8.42139 8.42127C8.42139 7.49111 9.17543 6.73706 10.1056 6.73706V6.73706C11.0358 6.73706 11.7898 7.49111 11.7898 8.42127V23.5792C11.7898 24.5093 11.0358 25.2634 10.1056 25.2634V25.2634C9.17543 25.2634 8.42139 24.5093 8.42139 23.5792V8.42127Z"
              fill="white"
            />
          </g>
          <g opacity="0.9" filter="url(#filter1_d_521_14078)">
            <path
              d="M14.7368 15.1576C14.7368 14.2274 15.4909 13.4734 16.421 13.4734V13.4734C17.3512 13.4734 18.1052 14.2274 18.1052 15.1576V23.5786C18.1052 24.5088 17.3512 25.2629 16.421 25.2629V25.2629C15.4909 25.2629 14.7368 24.5088 14.7368 23.5786V15.1576Z"
              fill="white"
            />
          </g>
          <g opacity="0.7" filter="url(#filter2_d_521_14078)">
            <path
              d="M21.0522 10.9469C21.0522 10.0167 21.8063 9.2627 22.7365 9.2627V9.2627C23.6666 9.2627 24.4207 10.0167 24.4207 10.9469V23.5785C24.4207 24.5086 23.6666 25.2627 22.7365 25.2627V25.2627C21.8063 25.2627 21.0522 24.5086 21.0522 23.5785V10.9469Z"
              fill="white"
            />
          </g>
          <defs>
            <filter
              id="filter0_d_521_14078"
              x="7.42139"
              y="6.23706"
              width="5.36865"
              height="20.5264"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="0.5" />
              <feGaussianBlur stdDeviation="0.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_521_14078"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_521_14078"
                result="shape"
              />
            </filter>
            <filter
              id="filter1_d_521_14078"
              x="13.7368"
              y="12.9734"
              width="5.36865"
              height="13.7896"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="0.5" />
              <feGaussianBlur stdDeviation="0.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_521_14078"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_521_14078"
                result="shape"
              />
            </filter>
            <filter
              id="filter2_d_521_14078"
              x="20.0522"
              y="8.7627"
              width="5.36865"
              height="18"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="0.5" />
              <feGaussianBlur stdDeviation="0.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_521_14078"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_521_14078"
                result="shape"
              />
            </filter>
          </defs>
        </svg>

        <h1 className="-ml-5 text-title-md font-bold text-blue-700">
          Jupiter Apparels
        </h1>
        <div className="flex flex-row  ">
          <Link to="/about">
            <h1 className="home-nav ml-10 hover:text-blue-950">About</h1>
          </Link>
          <Link to="/contact">
            <h1 className="home-nav ml-10 hover:text-blue-950">Contact</h1>
          </Link>
          <Link to="/features">
            <h1 className="home-nav ml-10 hover:text-blue-950">Features</h1>
          </Link>
        </div>

        <div>
          <Link to="/auth/login">
            <button className="absolute right-10 hover:bg-blue-950 card-btn text-gray-300 self-center">
              Login
            </button>
          </Link>
        </div>
      </div>

      <div
        className="w-full h-screen flex items-center justify-center relative duration-200 ease-in-out "
        style={{
          backgroundImage: `url(${images[currentImage].src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="flex justify-center text-center items-center w-full h-full absolute text-white text-4xl font-bold bg-opacity-40 bg-gray-600 shadow-lg rounded-lg px-5 md:px-20 py-5 ">
          {images[currentImage].text}
        </div>
      </div>

      <h1 className="w-4/6 ml-10 bg-blue-300 p-5 pl-10 text-4xl mt-20 mb-15 font-semibold text-blue-900 shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl hover:bg-blue-400">
        Key Features
      </h1>

      <div className=" w-full px-15 lg:px-20 xl:px-[10rem] flex flex-col items-center">
        <div className="w-full bg-gray-100 shadow-md rounded-md pt-4 pb-10 hover:scale-105 transform transition duration-300 hover:shadow-xl">
          <h1 className="text-blue-800 text-left ml-14 text-2xl font-semibold">
            Personal Information Management
          </h1>
          <div className="mt-5 flex flex-col sm:flex-row items-center w-full gap-4 sm:gap-8 px-7">
            <img
              className=" shadow-lg rounded-md w-full sm:w-[40%]"
              src={image5}
              alt="image5"
            />

            <div className=" w-full">
              <p className=" w-full flex justify-center items-center font-semibold text-justify text-[18px]">
                Manage employee records with ease. From personal details to
                job-related information, keep your workforce data well-organized
                and accessible. PIM enables you to track everything from job
                titles to emergency contacts, ensuring you have comprehensive
                employee information at your fingertips. Custom attributes let
                you tailor the system to fit your organization's specific needs.
              </p>
            </div>
          </div>
        </div>

        <div className="w-full mt-20 bg-gray-100 shadow-md rounded-md pt-4 pb-10 hover:scale-105 transform transition duration-300 hover:shadow-xl">
          <h1 className="text-blue-800 text-left ml-14 text-2xl font-semibold">
            Absence Management
          </h1>
          <div className="mt-5 flex flex-col sm:flex-row items-center w-full gap-4 sm:gap-8 px-7">
            <img
              className=" shadow-lg rounded-md w-full sm:w-[40%]"
              src={image6}
              alt="image5"
            />

            <div className=" w-full">
              <p className=" w-full flex justify-center items-center font-semibold text-justify text-[18px]">
                Simplify leave requests and approvals. Absence management allows
                employees to easily apply for leave, while managers can approve
                or decline requests with a few clicks. Stay informed with
                real-time tracking of leave balances, ensuring seamless
                coordination and productivity, even when employees are away.
              </p>
            </div>
          </div>
        </div>

        <div className="w-full mt-20 bg-gray-100 shadow-md rounded-md pt-4 pb-10 hover:scale-105 transform transition duration-300 hover:shadow-xl">
          <h1 className=" text-blue-800 text-left ml-14 text-2xl font-semibold">
            Report Generation
          </h1>
          <div className="mt-5 flex flex-col sm:flex-row items-center w-full gap-4 sm:gap-8 px-7">
            <img
              className=" shadow-lg rounded-md w-full sm:w-[40%]"
              src={image7}
              alt="image5"
            />

            <div className=" w-full">
              <p className=" w-full flex justify-center items-center font-semibold text-justify text-[18px]">
                Make informed decisions with insightful reports. Generate
                detailed reports based on employee data, leave trends, and
                custom fields. Whether you need department-level overviews or
                individual employee insights, our report generation tool ensures
                that critical HR information is available whenever you need it.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <footer className="bg-blue-900 text-white py-10 mt-20">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h2 className="text-2xl font-bold">Jupiter Apparels</h2>
              <p className="mt-2">
                A trusted multinational corporation with branches across Sri
                Lanka, Bangladesh, and Pakistan. Streamline your HR processes
                with our tailored HR management system.
              </p>
              <p className="mt-4 text-sm">
                © 2024 Jupiter Apparels HRMS. All rights reserved.
              </p>
            </div>

            <div className="ml-30">
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <div className="flex flex-col space-y-1">
                <Link to="/">Privacy Policy</Link>
                <Link to="/">Terms of Service</Link>
                <Link to="/">Contact Us</Link>
                <Link to="/">FAQ</Link>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Contact Us</h3>
              <p className="text-sm">
                Head Office: Union Place, Colombo, Sri Lanka
              </p>
              <p className="text-sm mt-2">Phone: +94 112 345 678</p>
              <p className="text-sm">Email: support@jupiterapparels.com</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
