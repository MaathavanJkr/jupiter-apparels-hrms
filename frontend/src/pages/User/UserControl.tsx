import { useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import { User } from '../../types/types';
import { useEffect, useState } from 'react';
import { deleteUser, getUserByID, updateUser } from '../../services/userServices';
import { notifyError, notifySuccess } from '../../services/notify';
import { ToastContainer } from 'react-toastify';

const UserControl = () => {
    const navigate = useNavigate();
  const { user_id } = useParams<{ user_id: string }>();
  const [user, setUser] = useState<User>();
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user: User = await getUserByID(user_id!);
        setUser(user);
      } catch (error) {
        console.log('Failed to fetch user:', error);
      }
    };
    fetchUser();
  }, []);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user!, username: e.target.value });
  };
  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUser({ ...user!, role: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await updateUser(user!)
        .then(() => {
          notifySuccess('User updated successfully');
        })
        .catch((error) => {
          notifyError('Cannot update user: ' + error);
        });
    } catch (error) {
      console.log('Failed to update user:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteUser(user_id!)
      .then(() => {
        notifySuccess('User deleted successfully');
      })
      .catch((error) => {   
        notifyError('Cannot delete user: ' + error);
      });
    } catch (error) {
      console.log('Failed to delete user:', error);
    }
  }
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Manage Account" />
      <div className="mb-4.5">
        <label className="mb-2.5 block text-black dark:text-white">
          Username <span className="text-meta-1">*</span>
        </label>
        <input
          type="text"
          name="name"
          autoComplete="off"
          value={user?.username}
          onChange={handleNameChange}
          placeholder="Enter Name"
          className="w-1/2 rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
      </div>
      <div className="mb-4.5">
        <label className="mb-2.5 block text-black dark:text-white">
          Role <span className="text-meta-1">*</span>
        </label>
        <select
          name="role"
          value={user?.role}
          onChange={handleRoleChange}
          className="w-1/2 rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        >
          <option value="Employee">Employee</option>
          <option value="HR manager">HR Manager</option>
        </select>

        <div className="mt-6 w-1/2 flex gap-4">
          <button
            onClick={handleSubmit}
            className="w-full rounded border border-primary bg-primary p-3 text-center font-medium text-white transition hover:bg-primary-dark"
          >
            Save
          </button>
          <button
            onClick={() => setModalOpen(true)}
            className="w-full rounded border border-stroke bg-gray p-3 text-center font-medium text-black transition hover:border-meta-1 hover:bg-meta-1 hover:text-white dark:border-strokedark dark:bg-meta-4 dark:text-white dark:hover:border-meta-1 dark:hover:bg-meta-1"
          >
            Delete User
          </button>
        </div>
      </div>

      <div
        className={`fixed left-0 top-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 px-4 py-5 overflow-y-auto ${
          !modalOpen && 'hidden'
        }`}
      >
        <div className="w-full max-w-142.5 rounded-lg bg-white px-8 py-12 dark:bg-boxdark md:px-17.5 md:py-15 max-h-screen overflow-y-auto">
          <h2 className="text-2xl font-bold text-left text-black dark:text-white">
            Delete User
          </h2>
          <p className="text-left text-black dark:text-white">
            Are you sure you want to delete this user?
          </p>
          <div className="flex gap-4 mt-6">
            <button
              onClick={() => setModalOpen(false)}
              className="w-full rounded border border-stroke bg-gray p-3 text-center font-medium text-black transition hover:border-primary hover:bg-primary hover:text-white dark:border-strokedark dark:bg-meta-4 dark:text-white dark:hover:border-primary dark:hover:bg-primary"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                handleDelete();
                setModalOpen(false);
                navigate('/employee/all');
              }}
              className="w-full rounded border border-stroke bg-gray p-3 text-center font-medium text-black transition hover:border-red hover:bg-red hover:text-white dark:border-strokedark dark:bg-meta-4 dark:text-white dark:hover:border-red dark:hover:bg-red"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </DefaultLayout>
  );
};

export default UserControl;
