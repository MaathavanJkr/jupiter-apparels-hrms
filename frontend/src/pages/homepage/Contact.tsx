import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../../images/616991.jpg';

const About = () => {
  return (
    <div className="flex ">
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
        className="hidden w-full xl:block xl:w-1/2 h-full relative h-screen"
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>

        <div className="py-17.5 px-26 text-center relative z-10">
          <Link className="mb-5.5 inline-block" to="/">
            <h1 className="mt-40 text-7xl text-white text-w font-bold">
              Jupiter Apparels
            </h1>
          </Link>
          <p className="text-xl mt-5 text-white">
            Your gateway to seamless workforce management, empowering over 1000
            employees across our global network
          </p>
        </div>
      </div>

      <div className="w-1/2 p-5">
        <h1 className="font-bold text-3xl text-blue-700 shadow-md p-3 pl-10">
          Contact Us
        </h1>
        <p className="mt-5 font-semibold">
          Head Office: Union Place, Colombo, Sri Lanka
        </p>
        <p className="mt-1 font-semibold">Phone: +94 112 345 678</p>
        <p className="mt-1 font-semibold">Email: support@jupiterapparels.com</p>

        <h3 className="text-xl font-semibold mt-6">Branches:</h3>

        <div className="mt-2">
          <h4 className="font-semibold">Sri Lanka Branch</h4>
          <p>123 Main Street, Colombo, Sri Lanka</p>
          <p>Phone: +94 112 987 654</p>
        </div>

        <div className="mt-2">
          <h4 className="font-semibold">Bangladesh Branch</h4>
          <p>456 Dhaka Road, Dhaka, Bangladesh</p>
          <p>Phone: +880 1-2345-6789</p>
        </div>

        <div className="mt-2">
          <h4 className="font-semibold">Pakistan Branch</h4>
          <p>789 Lahore Avenue, Lahore, Pakistan</p>
          <p>Phone: +92 21-23456789</p>
        </div>

        <h3 className="font-semibold mt-6">Working Hours:</h3>
        <p>Monday to Friday: 9:00 AM - 5:00 PM</p>
        <p>Saturday: 10:00 AM - 2:00 PM</p>
        <p>Sunday: Closed</p>

        <h3 className="font-semibold mt-6">Follow Us:</h3>
        <div className="flex space-x-4 mt-2">
          <Link to="https://facebook.com" className=" text-blue-600">
            Facebook
          </Link>
          <Link to="https://twitter.com" className=" text-blue-600">
            Twitter
          </Link>
          <Link to="https://linkedin.com" className=" text-blue-600">
            LinkedIn
          </Link>
          <Link to="https://instagram.com" className=" text-blue-600">
            Instagram
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
