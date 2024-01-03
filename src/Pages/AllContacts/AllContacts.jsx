import { useQuery } from "@tanstack/react-query";
import { getAllContact } from "../../Service/contact";
import { Bars } from "react-loader-spinner";
import { Link } from "react-router-dom";

const AllContacts = () => {
  const { isLoading, data: contacts } = useQuery({
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

  return (
    <div className="grid lg:grid-cols-4 p-12 gap-6">
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
                  <button className="text-red-500">Delete</button>
                </li>
              </ul>
            </div>
      
      
          </div>
        ))}
    </div>
  );
};

export default AllContacts;
