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
          About Us
        </h1>
        <h1 className="mt-5 text-lg text-black-2">
          Welcome to Jupiter Apparels – a prominent name in the apparel
          industry, dedicated to crafting high-quality clothing that meets the
          diverse needs of our global clientele. Founded in the heart of Sri
          Lanka, we have expanded our operations to include branches in
          Bangladesh and Pakistan, leveraging local expertise to deliver
          exceptional apparel solutions.
        </h1>
        <h1 className="mt-5 text-lg text-black-2">
          At Jupiter Apparels, we pride ourselves on our commitment to
          sustainability and ethical manufacturing practices. Our mission is to
          produce stylish, durable garments while minimizing our environmental
          footprint. We believe that fashion should not only be about aesthetics
          but also about responsibility. That’s why we prioritize eco-friendly
          materials and sustainable processes throughout our production chain.
        </h1>
        <h1 className="mt-5 text-lg text-black-2">
          Our Vision: We aim to be a leader in the apparel industry by setting
          new standards for quality and sustainability. We strive to create a
          positive impact on our communities and the environment, ensuring that
          our growth benefits all stakeholders.
        </h1>

        <h1 className="mt-5 text-lg text-black-2">Our Core Values</h1>
        <ol className="mt-3">
          <li className="ml-10 text-md text-black-2 list-disc">
            Innovation: We are committed to continuous improvement, harnessing
            the latest technology to deliver solutions that adapt to the
            evolving needs of our clients.
          </li>
          <li className="ml-10 text-md text-black-2 list-disc">
            Integrity: Trust is at the heart of our operations. We uphold the
            highest ethical standards, ensuring that our clients receive the
            best service and support.
          </li>
          <li className="ml-10 text-md text-black-2 list-disc">
            Collaboration: We believe in the power of teamwork. By fostering
            strong partnerships with our clients, we work together to achieve
            common goals and drive success.
          </li>
        </ol>
      </div>
    </div>
  );
};

export default About;
