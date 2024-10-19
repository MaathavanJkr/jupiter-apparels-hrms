import { useEffect, useState } from "react"
import { EmergencyContact } from "../../types/types";
import { getContactByID, deleteContact, updateContact } from "../../services/emergencyContactServices";
import { notifyError, notifySuccess } from "../../services/notify";
import { ToastContainer } from "react-toastify";

const ContactTable = ({ employee_id }: { employee_id: string }) => {

    const role = localStorage.getItem('role');
    const isAuthorized = (role === "Admin" || role === "HR manager");

    const [contactId, setContactId] = useState<string>('');
    const [employeeId, setEmployeeId] = useState<string>('');
    const [relationship, setRelationship] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [contactNo, setContactNo] = useState<string>('');
    const [address, setAddress] = useState<string>('');

    const [contacts, setContacts] = useState<EmergencyContact[]>();
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [action, setAction] = useState<string>('Edit');


    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const contacts = await getContactByID(employee_id);
                setContacts(contacts);
            } catch (error) {
                console.log("Failded to fetch contacts:", error);
            };
        }

        fetchContacts();
    }, []);
    const handleDeleteContact = () => {
        if (contactId !== '') {
            deleteContact(contactId)
                .then(() => {
                    notifySuccess("Contact Deleted");
                    setModalOpen(false);
                }).catch((error) => {
                    notifyError(`Failed to delete: ${error}`);
                    setModalOpen(false);
                })
        } else {
            notifyError("Please select a contact to delete");
        }
    }

    const handleEditContact = () => {
        if (name !== '' && relationship !== '' && contactNo !== '' && address !== '') {
            updateContact(contactId, name, relationship, contactNo, address)
                .then(() => {
                    notifySuccess("Updated Successfully");
                    setModalOpen(false);
                }).catch((error) => {
                    notifyError(`Failed to update: ${error}`);
                    setModalOpen(false);
                })
        } else {
            notifyError("Please fill all fields");
        }
    }
    const handleEditModalOpen = (contact_id: string) => {
        const currContact: EmergencyContact = contacts?.find(contact => contact.emergency_id === contact_id)!;
        setAction('Edit');
        if (currContact && currContact.emergency_id) {
            setContactId(currContact.emergency_id);
            setEmployeeId(currContact.employee_id);
            setRelationship(currContact.relationship);
            setName(currContact.name);
            setContactNo(currContact.contact_number);
            setAddress(currContact.address);
            setModalOpen(true);
        } else {
            notifyError("Contact not Found");
        }
    }

    const handleDeleteModalOpen = (contact_id: string) => {
        const currContact: EmergencyContact = contacts?.find(contact => contact.emergency_id === contact_id)!;
        setAction('Delete');
        if (currContact && currContact.emergency_id) {
            setContactId(currContact.emergency_id);
            setEmployeeId(currContact.employee_id);
            setRelationship(currContact.relationship);
            setName(currContact.name);
            setContactNo(currContact.contact_number);
            setAddress(currContact.address);
            setModalOpen(true);
        } else {
            notifyError("Contact not Found");
        }
    }


    const handleModalSubmit = () => {
        switch (action) {
            case 'Edit':
                handleEditContact();
                break;
            case 'Delete':
                handleDeleteContact();
                break;
            default:
                break;
        }
    }

    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="max-w-full overflow-x-auto">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-2 text-left dark:bg-meta-4">
                            <th className="min-w-[80px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                Name
                            </th>
                            <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                Relationship
                            </th>
                            <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                Contact
                            </th>
                            <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                Address
                            </th>
                            {isAuthorized && (
                                <th className="py-4 px-4 font-medium text-black text-center dark:text-white">
                                    Actions
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        <>
                            {contacts &&
                                contacts.map((contact, key) => {

                                    return (
                                        <tr key={key}>

                                            <td rowSpan={1} className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                                <h5 className="font-medium text-black dark:text-white">
                                                    {contact.name}
                                                </h5>
                                            </td>
                                            <td rowSpan={1} className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                <p className="text-black dark:text-white">
                                                    {contact.relationship}
                                                </p>
                                            </td>
                                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                <p className="text-black dark:text-white">
                                                    {contact.contact_number}
                                                </p>
                                            </td>
                                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                <p className="text-black dark:text-white">
                                                    {contact.address}
                                                </p>
                                            </td>
                                            {isAuthorized && (
                                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                    <div className="flex items-center justify-center space-x-3.5">
                                                        <button onClick={() => handleEditModalOpen(contact.emergency_id)} className="hover:text-primary">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                            </svg>
                                                        </button>
                                                        <button onClick={() => handleDeleteModalOpen(contact.emergency_id)} className="hover:text-primary">
                                                            <svg
                                                                className="fill-current"
                                                                width="18"
                                                                height="18"
                                                                viewBox="0 0 18 18"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                                                                    fill=""
                                                                />
                                                                <path
                                                                    d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                                                                    fill=""
                                                                />
                                                                <path
                                                                    d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                                                                    fill=""
                                                                />
                                                                <path
                                                                    d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                                                                    fill=""
                                                                />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </td>
                                            )}

                                        </tr>
                                    )
                                })}
                        </>
                    </tbody>
                </table>
            </div>
            <div className={`fixed left-0 top-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 px-4 py-5 overflow-y-auto ${!modalOpen && 'hidden'}`}>
                <div className="w-full max-w-142.5 rounded-lg bg-white px-8 py-12 dark:bg-boxdark md:px-17.5 md:py-15 max-h-screen overflow-y-auto">
                    <h3 className="pb-2 text-xl font-bold text-black dark:text-white sm:text-2xl">
                        {{
                            'Edit': `Edit Contact`,
                            'Delete': 'Delete Contact',
                        }[action]}
                    </h3>
                    <span className="mx-auto mb-6 inline-block h-1 w-25 rounded bg-primary"></span>
                    {action == "Delete" && (
                        <>
                            <div className="mb-4.5">Confirm to delete Contact: {name}</div>
                            <div className="-mx-3 flex flex-wrap gap-y-4">
                                <div className="w-full px-3 2xsm:w-1/2">
                                    <button onClick={() => setModalOpen(false)} className="block w-full rounded border border-stroke bg-gray p-3 text-center font-medium text-black transition hover:border-meta-1 hover:bg-meta-1 hover:text-white dark:border-strokedark dark:bg-meta-4 dark:text-white dark:hover:border-meta-1 dark:hover:bg-meta-1">
                                        Cancel
                                    </button>
                                </div>
                                <div className="w-full px-3 2xsm:w-1/2">
                                    <button onClick={handleModalSubmit} className="block w-full rounded border border-primary bg-primary p-3 text-center font-medium text-white transition hover:bg-primary-dark">
                                        {action} Contact
                                    </button>
                                </div>
                            </div>
                        </>
                    )}

                    {action == "Edit" && (
                        <>
                            <div className=' gap-4'>
                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Name <span className="text-meta-1">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        placeholder="Enter First Name"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                                </div>

                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Relationship <span className="text-meta-1">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={relationship}
                                        onChange={(e) =>
                                            setRelationship(e.target.value)
                                        }
                                        placeholder="Enter Last Name"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                                </div>

                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Contact Number <span className="text-meta-1">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={contactNo}
                                        onChange={(e) =>
                                            setContactNo(e.target.value)
                                        }
                                        placeholder="Enter NIC"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                                </div>
                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Address <span className="text-meta-1">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={address}
                                        onChange={(e) =>
                                            setAddress(e.target.value)
                                        }
                                        placeholder="Enter NIC"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                                </div>

                                <div className="-mx-3 flex flex-wrap gap-y-4">
                                    <div className="w-full px-3 2xsm:w-1/2">
                                        <button onClick={() => setModalOpen(false)} className="block w-full rounded border border-stroke bg-gray p-3 text-center font-medium text-black transition hover:border-meta-1 hover:bg-meta-1 hover:text-white dark:border-strokedark dark:bg-meta-4 dark:text-white dark:hover:border-meta-1 dark:hover:bg-meta-1">
                                            Cancel
                                        </button>
                                    </div>
                                    <div className="w-full px-3 2xsm:w-1/2">
                                        <button onClick={handleModalSubmit} className="block w-full rounded border border-primary bg-primary p-3 text-center font-medium text-white transition hover:bg-primary-dark">
                                            {action} Contact
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </>
                    )}
                </div>
            </div>
            <ToastContainer />
        </div>

    )
}

export default ContactTable
