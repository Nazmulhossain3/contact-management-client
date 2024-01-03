import { useQuery } from "@tanstack/react-query";
import { getAllContact } from "../../Service/contact";
import { Bars } from "react-loader-spinner";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const AllContacts = () => {
  const { isLoading, data: contacts,refetch } = useQuery({
    queryKey: ["contact"],
    queryFn: getAllContact,
  });

  console.log(contacts);

  if (isLoading) {
    return (
      <Bars
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    );
  }

  const handleDeleteContact = (contact) => {
    console.log(contact);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
       
        fetch(`http://localhost:3000/contact-route/deleteContact/${contact._id}`,{
            method : 'DELETE'
        })
          .then((res) => res.json())
          .then((data) => {
            refetch()
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
          });
      }
    });

  }

  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 p-12 gap-6">
      {contacts?.result &&
        contacts.result.map((contact, index) => (
          <div className="border" key={index}>
            <img src={contact.imageUrl} alt="" />
            <div className="p-4">
              <p> Name : {contact.name}</p>
              <p> Contact : {contact.number} </p>
              <p> Address : {contact.address} </p>
            </div>
       
            <div className="dropdown dropdown-hover px-4 py-2">
              <div tabIndex={0} role="button" className="border px-4 py-1 bg-sky-300 text-white rounded-lg ">
                Action
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
               <Link to={`/editContact/${contact._id}`} >  <button className="text-green-500">Edit</button></Link>
                </li>
                <li>
                  <button onClick={()=> handleDeleteContact(contact)} className="text-red-500">Delete</button>
                </li>
              </ul>
            </div>
      
      
          </div>
        ))}
    </div>
  );
};

export default AllContacts;
