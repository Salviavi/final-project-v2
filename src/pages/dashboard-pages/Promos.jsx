import axios from "axios";
import LayoutDashboard from "../../components/Layout";
import { useEffect, useState } from "react";
import { Button } from "antd";
import { Modal } from "antd";
import { Input } from "antd";
import { Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Form } from "antd";

export default function LocationPages() {
  const token = localStorage.getItem("access_token");

  const [promosData, setPromosData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    title: "Create Locations",
    data: null,
    type: "create",
  });

  /* State data Promos */
  const [titlePromos, setTitlePromos] = useState("");
  const [descriptionPromos, setDescriptionPromos] = useState("");
  const [termsConditionsPromos, setTermsContions] = useState("");
  const [codePromos, setCodePromos] = useState("");
  const [discountPricePromos, setDiscountPricePromos] = useState("");
  const [minimumClaimPricePromos, setMinimumClaimPricePromos] = useState("");
  const [fileValuePromos, setFileValuePromos] = useState("");
  const [fileDataPromos, setFileDataPromos] = useState(null);

  const showModal = (type = "create", data = {}) => {
    setIsModalOpen(true);
    if (type === "create") {
      setModalData((prev) => ({
        ...prev,
        title: "Create Promos",
        type: type,
      }));
      setTitlePromos(data?.name || "");
    } else if (type === "edit") {
      setModalData((prev) => ({
        ...prev,
        title: "Edit Promos",
        type: type,
      }));
      setTitlePromos(data?.name || "");
    } else if (type === "read") {
      setModalData((prev) => ({ ...prev, title: "Locations", type: type }));
      setTitlePromos(data?.name || "");
      console.log(setNameLocations);
    } else if (type === "delete") {
      setModalData((prev) => ({
        ...prev,
        title: "Delete Promos",
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
    const file = e.target.files[0];
    if (file) {
      const validTypes = ["image/png", "image/jpeg"];

      if (validTypes.includes(file.type)) {
        setFileDataPromos(file); // Correctly set the file data for uploading
        console.log("File accepted:", file);
      } else {
        alert("Only PNG or JPG files are allowed.");
        setFileDataPromos(null); // Reset the file data on invalid file type
      }
    }
  };

  /* READ PROMOS */
  const getPromos = () => {
    axios
      .get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promos",
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      )
      .then((res) => {
        setPromosData(res?.data?.data || []);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  /* CREATE PROMOS */

  const handleCreate = (e) => {
    e.preventDefault();

    let urlFileUpload = ""; // This variable should be scoped correctly

    if (fileDataPromos) {
      // image upload
      let data = new FormData();
      data.append("image", fileDataPromos);

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

      // Upload the image first, then create the promos
      axios
        .request(config)
        .then((response) => {
          // set value url
          urlFileUpload = response.data.url; // Get the uploaded image URL

          // Create the promos
          return axios.post(
            "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-promo",
            {
              name: titlePromos,
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
          console.log("Promo created:", res.data);
          // fetch promos again or update here
          getPromos(); // Call this function to refresh your data
          setIsModalOpen(false); // Close the modal after creating
        })
        .catch((error) => {
          console.error("Error creating promos:", error.response);
        });
    } else {
      console.error("No file uploaded.");
    }
  };

  /* DELETE PROMOS */

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-promo/${id}`,
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //Update the promos data after deletion
      setPromosData((prevData) => prevData.filter((item) => item.id !== id));
      console.log("Promos deleted successfully");
    } catch (error) {
      console.error("Error deleting promos", error);
    }
  };

  /* CREATE PROMOS */

  useEffect(() => {
    getPromos();
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
            Add New Promos
          </Button>
        </div>

        <div className="grid grid-cols-12 gap-4">
          {promosData.map((item, index) => (
            <div
              key={index}
              className="col-span-12 md:col-span-6 lg:col-span-3 border p-6 rounded-lg bg-white cursor-pointer"
            >
              <div onClick={() => showModal("read", item)}>
                <h1>{item.title}</h1>
                <h1>Code: {item.promo_code}</h1>
                <h1>Discount Price: {item.promo_discount_price}</h1>
                <br />
                <img
                  src={item.imageUrl}
                  alt="promo image"
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
                  onClick={() => handleDelete(item.id)} // Directly call handleDelete with the item's ID
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
          <Form.Item label="Title" labelCol={{ span: 24 }}>
            <Input
              placeholder="Enter promo title..."
              value={titlePromos}
              onChange={(e) => setTitlePromos(e.target.value)}
              disabled={modalData.type === "read"}
            />
          </Form.Item>

          <Form.Item label="Description" labelCol={{ span: 24 }}>
            <Input
              placeholder="Enter promo description..."
              value={descriptionPromos}
              onChange={(e) => setDescriptionPromos(e.target.value)}
              disabled={modalData.type === "read"}
            />
          </Form.Item>

          <Form.Item label="Terms & Conditions" labelCol={{ span: 24 }}>
            <Input
              placeholder="Enter terms & conditions..."
              value={termsConditionsPromos}
              onChange={(e) => setTermsContions(e.target.value)}
              disabled={modalData.type === "read"}
            />
          </Form.Item>

          <Form.Item label="Promo Code" labelCol={{ span: 24 }}>
            <Input
              placeholder="Enter promo code..."
              value={codePromos}
              onChange={(e) => setCodePromos(e.target.value)}
              disabled={modalData.type === "read"}
            />
          </Form.Item>

          <Form.Item label="Promo Discount Price" labelCol={{ span: 24 }}>
            <Input
              placeholder="Enter promo discount price..."
              value={discountPricePromos}
              onChange={(e) => setDiscountPricePromos(e.target.value)}
              disabled={modalData.type === "read"}
            />
          </Form.Item>

          <Form.Item label="Minimum Claim Price" labelCol={{ span: 24 }}>
            <Input
              placeholder="Enter minimum claim price..."
              value={minimumClaimPricePromos}
              onChange={(e) => setMinimumClaimPricePromos(e.target.value)}
              disabled={modalData.type === "read"}
            />
          </Form.Item>

          {modalData.type !== "read" && (
            <Form.Item label="Upload Image" labelCol={{ span: 24 }}>
              <Input
                type="file"
                onChange={handleFile}
                accept=".png,.jpg,.jpeg"
              />
            </Form.Item>
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
