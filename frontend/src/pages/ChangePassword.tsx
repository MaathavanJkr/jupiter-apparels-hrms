
import Breadcrumb from "../components/Breadcrumbs/Breadcrumb"
import DefaultLayout from "../layout/DefaultLayout"
import { notifyError, notifySuccess } from "../services/notify"
import { useState } from "react"
import { changePassword } from "../services/userServices"
import { ToastContainer } from "react-toastify"


const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [password2, setPassword2] = useState<string>('');

  const user_id:string = localStorage.getItem('user_id')!;

  const handleSubmit = () => {
    if (oldPassword !== '' && newPassword !== '' && password2 !== '') {
      if (newPassword !== password2) {
        notifyError('Entered passwords do not match')
      } else {
        changePassword(user_id,oldPassword,newPassword)
        .then(()=> {
          notifySuccess('Password changed successfully');
        }).catch ((error)=> {
          notifyError('Cannot Change Password:  '+ error);
        })
      }
    } else {
      notifyError('Please fill all fields')
    }
  }

  return (
    <DefaultLayout>
        <Breadcrumb pageName="Change Password" />
        <div className="bg-white dark:bg-boxdark shadow-lg rounded-lg p-6 space-y-4 border border-stroke dark:border-strokedark">
          <div className="space-y-2 text-base">
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-bold">User Name:</span> <span className="font-bold text-primary">{localStorage.getItem('username')}</span>
              </p>
          </div>

          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Old Password <span className="text-meta-1">*</span>
            </label>
            <input
              type="text"
              value={oldPassword}
              onChange={(e)=>{setOldPassword(e.target.value)}}
              placeholder="Enter Old Password"
              className="w-full sm:w-1/2 lg:w-1/3 max-w-md rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

          <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
               New Password <span className="text-meta-1">*</span>
              </label>
              <input
                type="text"
                value={newPassword}
                onChange={(e)=>{setNewPassword(e.target.value)}}
                placeholder="Enter New Password"
                className="w-full sm:w-1/2 lg:w-1/3 max-w-md rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
          <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
               Re-enter New Password <span className="text-meta-1">*</span>
              </label>
              <input
                type="text"
                value={password2}
                onChange={(e)=>setPassword2(e.target.value)}
                placeholder="Enter New Password"
                className="w-full sm:w-1/2 lg:w-1/3 max-w-md rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <button onClick={handleSubmit} className="mt-4.5 w-full sm:w-auto flex items-center justify-center gap-1 rounded-lg border border-primary bg-primary py-2 px-4 text-center font-medium text-white transition hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                    Change Password
            </button>
        </div>
        <ToastContainer />
    </DefaultLayout>
  )
}

export default ChangePassword
