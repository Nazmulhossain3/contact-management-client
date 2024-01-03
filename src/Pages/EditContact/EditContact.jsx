import { useParams } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const EditContact = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNumber(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const uploadImageToImgBB = async (imageFile) => {
    try {
      const formData = new FormData();
      formData.append("image", imageFile);

      const response = await fetch(
        "https://api.imgbb.com/1/upload?key=3175c3bd6870b807a81f5454a96c494d",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Image upload failed");
      }

      const data = await response.json();
      return data.data.url;
    } catch (error) {
      console.error("Error uploading image:", error.message);
      // Handle error (e.g., display an error message to the user)
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    try {
      const imageUrl = await uploadImageToImgBB(imageFile);

      const contact = {
        name,
        number,
        address,
        imageUrl,
      };

      console.log(contact);

      fetch(`https://contact-management-server-kappa.vercel.app/contact-route/updateContact/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(contact),
      })
        .then((res) => res.json())
        .then((data) => {
          form.reset();
          if (data) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your Contact is Updated",
              showConfirmButton: false,
              timer: 1500,
            });
          }

          navigate("/allContacts");
        });
    } catch (error) {
      console.error("Error:", error.message);
      // Handle error (e.g., display an error message to the user)
    }
  };
  return (
    <div>
      <section className="flex justify-center items-center p-12">
        <form
          onSubmit={handlePostSubmit}
          className="max-w-md w-full rounded p-6 space-y-4"
        >
          <div className="mb-4">
            <p className="text-gray-600">Add Contact</p>
          </div>
          <div>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleNameChange}
              className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
              placeholder="Name"
            />
          </div>
          <div>
            <input
              type="number"
              name="number"
              value={number}
              onChange={handleNumberChange}
              className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
              placeholder="Number"
            />
          </div>
          <div>
            <input
              type="text"
              name="address"
              value={address}
              onChange={handleAddressChange}
              className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
              placeholder="Address"
            />
          </div>
          <div>
            <input
              type="file"
              onChange={handleImageChange}
              className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
              placeholder="Select Image"
            />
          </div>
          <div>
            <input
              type="submit"
              className="w-full cursor-pointer py-4 bg-blue-600 hover:bg-blue-700 rounded text-sm font-bold text-gray-50 transition duration-200"
              value="Update"
            />
          </div>
        </form>
      </section>
    </div>
  );
};

export default EditContact;
