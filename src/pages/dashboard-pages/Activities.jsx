import { useEffect, useState } from "react";
import LayoutDashboard from "../../components/Layout";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { Button } from "antd";
import { Modal } from "antd";
import { Input } from "antd";
import { Select } from "antd";
import { Upload } from "antd";

export default function ActivitiesPages() {
  const token = localStorage.getItem("access_token");

  const [activitiesData, setActivitiesData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    title: "Create Activities",
    data: null,
    type: "create",
  });

  /* state data Activities */
  const [categoriesActivities, setCategoriesActivities] = useState("");
  const [titleActivities, setTitleActivities] = useState("");
  const [descriptionActivities, setDescriptionActivities] = useState("");
  const [priceActivities, setPriceActivities] = useState("");
  const [priceDiscountActivities, setPriceDiscountActivities] = useState("");
  const [ratingActivities, setRatingActivities] = useState("");
  const [totalReviewsActivities, setTotalReviewsActivities] = useState("");
  const [facilityActivities, setFacilityActivities] = useState("");
  const [addressActivities, setAddressActivities] = useState("");
  const [provinceActivities, setProvinceActivities] = useState("");
  const [cityActivities, setCityActivities] = useState("");
  const [mapsActivities, setMapsActivities] = useState("");
  const [fileValueActivities, setFileValueActivities] = useState("");
  const [fileDataActivities, setFileDataActivities] = useState(null);

  const showModal = (type = "create", data = {}) => {
    setIsModalOpen(true);
    if (type === "create") {
      setModalData((prev) => ({
        ...prev,
        title: "Create Activities",
        type: type,
      }));
    } else if (type === "edit") {
      setModalData((prev) => ({
        ...prev,
        title: "Edit Activities",
        type: type,
      }));
      setTitleActivities(data?.title || "");
    } else if (type === "read") {
      setModalData((prev) => ({ ...prev, title: "Activities", type: type }));
      setTitleActivities(data?.title || "");
    } else if (type === "delete") {
      setModalData((prev) => ({
        ...prev,
        title: "Delete Activities",
        type: type,
      }));
      // panggil api delete activity dengan id dari {data.id}
    }
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleFile = (e) => {
    setFileValueActivities(e.target.value);
    setFileDataActivities(e.target.files[0]);
  };

  const getAllCategory = () => {
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
        setCategoriesData(
          (res?.data?.data || []).map((item) => ({
            value: item.id,
            label: item.name,
          }))
        );
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  /* READ Activities */
  const getActivities = () => {
    axios
      .get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activities",
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      )
      .then((res) => {
        setActivitiesData(res?.data?.data || []);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  /* READ Activities */

  /* CREATE Activities */
  const handleCreate = async (e) => {
    e.preventDefault();

    let urlFileUpload = "";
    if (fileDataActivities) {
      // upload gambar
      let data = new FormData();
      data.append("image", fileDataActivities);

      let configUpload = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/upload-image",
        headers: {
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          Authorization: `Bearer ${token}`,
        },
        data: data,
      };
      await axios
        .request(configUpload)
        .then((response) => {
          // set value url
          urlFileUpload = response.data.url;
        })
        .catch((error) => {
          console.log(error);
        });
    }

    // create activities
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-activity",
      headers: {
        "Content-Type": "application/json",
        apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
        Authorization: `Bearer ${token}`,
      },
      data: JSON.stringify({
        categoryId: categoriesActivities,
        title: titleActivities,
        description: descriptionActivities,
        imageUrls: [urlFileUpload],
        price: parseFloat(priceActivities),
        price_discount: parseInt(priceDiscountActivities),
        rating: parseInt(ratingActivities),
        total_reviews: parseInt(totalReviewsActivities),
        facilities: facilityActivities,
        address: addressActivities,
        province: provinceActivities,
        city: cityActivities,
        location_maps: mapsActivities,
      }),
    };
    await axios
      .request(config)
      .then((response) => {
        // set value url
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  /* CREATE Activities */

  useEffect(() => {
    getActivities();
    getAllCategory();
  }, []);

  return (
    <section>
      <LayoutDashboard>
        <div className="flex justify-end mb-4">
          <Button
            type="primary"
            className=""
            onClick={() => showModal("create")}
          >
            Add New Activities
          </Button>
        </div>
        <div className="grid grid-cols-12 gap-4">
          {activitiesData.map((item, index) => (
            <div
              key={index}
              className="col-span-12 md:col-span-6 lg:col-span-3 border p-6 rounded-lg bg-white cursor-pointer"
            >
              <div onClick={() => showModal("read", item)}>
                <h1>{item.title}</h1>
                <h1>{item.province}</h1>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  type="primary"
                  className="col-span-1"
                  onClick={() => showModal("edit", item)}
                >
                  Edit
                </Button>
                <Button
                  type="primary"
                  danger
                  className="col-span-1"
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
      >
        <form onSubmit={handleCreate}>
          <Select
            placeholder="Category"
            value={categoriesActivities}
            className="w-full"
            onChange={(value) => {
              setCategoriesActivities(value);
            }}
            options={categoriesData}
            disabled={modalData.type === "read"}
          />
          <label htmlFor="title">Title</label>
          <Input
            id="title"
            placeholder="Title"
            value={titleActivities}
            onChange={(e) => setTitleActivities(e.target.value)}
            disabled={modalData.type === "read"}
          />
          <Input
            placeholder="Description"
            value={descriptionActivities}
            onChange={(e) => setDescriptionActivities(e.target.value)}
          />
          <Input
            placeholder="Price"
            value={priceActivities}
            onChange={(e) => setPriceActivities(e.target.value)}
          />
          <Input
            placeholder="Price Discount"
            value={priceDiscountActivities}
            onChange={(e) => setPriceDiscountActivities(e.target.value)}
          />
          <Input
            placeholder="Rating"
            value={ratingActivities}
            onChange={(e) => setRatingActivities(e.target.value)}
          />
          <Input
            placeholder="Total Review"
            value={totalReviewsActivities}
            onChange={(e) => setTotalReviewsActivities(e.target.value)}
          />
          <Input
            placeholder="Facilities"
            value={facilityActivities}
            onChange={(e) => setFacilityActivities(e.target.value)}
          />
          <Input
            placeholder="Address"
            value={addressActivities}
            onChange={(e) => setAddressActivities(e.target.value)}
          />
          <Input
            placeholder="Province"
            value={provinceActivities}
            onChange={(e) => setProvinceActivities(e.target.value)}
          />
          <Input
            placeholder="City"
            value={cityActivities}
            onChange={(e) => setCityActivities(e.target.value)}
          />
          <Input
            placeholder="Maps"
            value={mapsActivities}
            onChange={(e) => setMapsActivities(e.target.value)}
          />
          <input
            type="file"
            value={fileValueActivities}
            onChange={handleFile}
          />
          {modalData.type !== "read" && (
            <Button type="primary" className="col-span-1" htmlType="submit">
              Submit
            </Button>
          )}
        </form>
      </Modal>
    </section>
  );
}
