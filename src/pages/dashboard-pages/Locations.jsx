import axios from "axios";
import LayoutDashboard from "../../components/Layout";
import { useEffect, useState } from "react";
import { Button } from "antd";
import { Modal } from "antd";
import { Input } from "antd";
import { Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

export default function LocationPages() {
  const token = localStorage.getItem("access_token");

  /* I changed categories to locations */
  const [locationsData, setLocationsData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    title: "Create Locations",
    data: null,
    type: "create",
  });

  /* State data Categories */
  const [nameLocations, setNameLocations] = useState("");
  const [fileValueActivities, setFileValueActivities] = useState("");
  const [fileDataActivities, setFileDataActivities] = useState(null);

  const showModal = (type = "create", data = {}) => {
    setIsModalOpen(true);
    if (type === "create") {
      setModalData((prev) => ({
        ...prev,
        title: "Create Locations",
        type: type,
      }));
    } else if (type === "edit") {
      setModalData((prev) => ({
        ...prev,
        title: "Edit Locations",
        type: type,
      }));
      setNameLocations(data?.name || "");
    } else if (type === "read") {
      setModalData((prev) => ({ ...prev, title: "Locations", type: type }));
      setNameLocations(data?.name || "");
      console.log(setNameLocations);
    } else if (type === "delete") {
      setModalData((prev) => ({
        ...prev,
        title: "Delete Locations",
        type: type,
      }));
    }
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleFile = (e) => {
    // console.log(e.target.value);
    // console.log(e.target.files[0]);

    const file = e.target.files[0];
    if (file) {
      const validTypes = ["image/png", "image/jpeg"];

      if (validTypes.includes(file.type)) {
        setFileValueActivities(e.target.value);
        setFileDataActivities(file);
        // console.log("File accepted:", file);
      } else {
        alert("Only PNG or JPG files are allowed.");
        setFileValueActivities("");
        setFileDataActivities(null);
      }
    }
  };

  /* READ CATEGORIES */
  const getLocations = () => {
    axios
      .get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/categories",
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      )
      .then((res) => {
        setLocationsData(res?.data?.data || []);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  /* READ CATEGORIES */

  /* CREATE CATEGORIES */

  const handleCreate = (e) => {
    e.preventDefault();

    let urlFileUpload = ""; // This variable should be scoped correctly

    if (fileDataActivities) {
      // image upload
      let data = new FormData();
      data.append("image", fileDataActivities);

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/upload-image",
        headers: {
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          Authorization: `Bearer ${token}`,
        },
        data: data,
      };

      // Upload the image first, then create the category
      axios
        .request(config)
        .then((response) => {
          // set value url
          urlFileUpload = response.data.url; // Get the uploaded image URL

          // Now create the category
          return axios.post(
            "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-category",
            {
              name: nameLocations,
              imageUrl: urlFileUpload, // Send as a string
            },
            {
              headers: {
                apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
                Authorization: `Bearer ${token}`,
              },
            }
          );
        })
        .then((res) => {
          console.log("Category created:", res.data);
          // You can fetch locations again or update your state here
          getLocations(); // Call this function to refresh your data
          setIsModalOpen(false); // Close the modal after creating
        })
        .catch((error) => {
          console.error("Error creating category:", error.response);
        });
    } else {
      console.error("No file uploaded.");
    }
  };

  /* CREATE CATEGORIES */

  useEffect(() => {
    getLocations();
  }, []);

  return (
    <section>
      <LayoutDashboard>
        <div className="flex justify-end mb-4">
          <Button
            type="primary"
            className="col-span-1"
            onClick={() => showModal("create")}
          >
            Add New Locations
          </Button>
        </div>

        <div className="grid grid-cols-12 gap-4">
          {locationsData.map((item, index) => (
            <div
              key={index}
              className="col-span-12 md:col-span-6 lg:col-span-3 border p-6 rounded-lg bg-white cursor-pointer"
            >
              <div onClick={() => showModal("read", item)}>
                <h1 className="text-lg font-semibold mb-2">{item.name}</h1>
                <br />
                <img
                  src={item.imageUrl}
                  alt="location image"
                  className="h-[200px] w-auto"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button
                  type="primary"
                  className="col-span-1 top-5"
                  onClick={() => showModal("edit", item)}
                >
                  Edit
                </Button>
                <Button
                  type="primary"
                  className="col-span-1 top-5"
                  danger
                  onClick={() => showModal("delete", item)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </LayoutDashboard>
      <Modal
        title={modalData.title}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <form onSubmit={handleCreate}>
          <Input
            placeholder="Name"
            value={nameLocations}
            onChange={(e) => setNameLocations(e.target.value)}
            disabled={modalData.type === "read"}
          />

          {modalData.type !== "read" && (
            <Input
              type="file"
              value={fileValueActivities}
              onChange={handleFile}
            />
          )}

          {modalData.type !== "read" && (
            <Button
              type="primary"
              className="col-span-1 top-5"
              htmlType="submit"
            >
              Submit
            </Button>
          )}
        </form>
      </Modal>
    </section>
  );
}
