import image5 from '../../images/466.jpg';
import image6 from '../../images/14819.jpg';
import image7 from '../../images/850.jpg';

const Features = () => {
  return (
    <div>
      <h1 className="w-4/6 ml-10 bg-blue-300 p-5 pl-10 text-4xl mt-20 mb-15 font-semibold text-blue-900 shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl hover:bg-blue-400">
        Key Features
      </h1>

      <div className=" w-full px-15 lg:px-20 xl:px-[10rem] flex flex-col items-center">
        <div className="w-full bg-gray-100 shadow-md rounded-md pt-4 pb-10 hover:scale-105 transform transition duration-300 hover:shadow-xl">
          <h1 className="text-blue-800 text-center text-2xl font-semibold">
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
          <h1 className="text-blue-800 text-center text-2xl font-semibold">
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
          <h1 className=" text-blue-800 text-center text-2xl font-semibold">
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
    </div>
  );
};

export default Features;
