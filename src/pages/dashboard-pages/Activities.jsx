import { useEffect, useState } from "react";
import LayoutDashboard from "../../components/Layout";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { Button } from "antd";
import { Modal } from "antd";
import { Input } from "antd";
import { Select } from "antd";
import { Upload } from "antd";
import { Form } from "antd";

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
      setModalData((prev) => ({ ...prev, title: "Activities", type: type }));
      // showing the map loop content (API data) for the read type
      setCategoriesActivities("Select a category..." || "");
      setTitleActivities(data?.title || "");
      setDescriptionActivities(data?.description || "");
      setPriceActivities(data?.price || "");
      setPriceDiscountActivities(data?.price_discount || "");
      setRatingActivities(data?.rating || "");
      setTotalReviewsActivities(data?.total_reviews || "");
      setFacilityActivities(data?.facilities || "");
      setAddressActivities(data?.address || "");
      setProvinceActivities(data?.province || "");
      setCityActivities(data?.city || "");
      setLocationsData(data?.locations_map || "");
    } else if (type === "edit") {
      setModalData((prev) => ({
        ...prev,
        title: "Edit Activities",
        type: type,
      }));
      setTitleActivities(data?.title || "");
    } else if (type === "read") {
      setModalData((prev) => ({ ...prev, title: "Activities", type: type }));
      // showing the map loop content (API data) for the read type
      setCategoriesActivities(categoriesData || "");
      setTitleActivities(data?.title || "");
      setDescriptionActivities(data?.description || "");
      setPriceActivities(data?.price || "");
      setPriceDiscountActivities(data?.price_discount || "");
      setRatingActivities(data?.rating || "");
      setTotalReviewsActivities(data?.total_reviews || "");
      setFacilityActivities(data?.facilities || "");
      setAddressActivities(data?.address || "");
      setProvinceActivities(data?.province || "");
      setCityActivities(data?.city || "");
      setLocationsData(data?.locations_map || "");
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
              <div
                className="flex-grow"
                onClick={() => showModal("read", item)}
              >
                <img
                  src={item.imageUrls}
                  alt={item.title}
                  className="h-[200px] w-auto"
                />
                <h1 className="text-lg font-semibold mb-2">{item.title}</h1>
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
          <Form.Item label="Category" labelCol={{ span: 24 }}>
            <Select
              placeholder="Select a category..."
              value={categoriesActivities || null}
              className="w-full"
              onChange={(value) => {
                setCategoriesActivities(value);
              }}
              options={categoriesData}
              disabled={modalData.type === "read"}
            />
          </Form.Item>

          <Form.Item label="Title" labelCol={{ span: 24 }}>
            <Input
              id="title"
              placeholder="Fill the title here..."
              value={titleActivities}
              onChange={(e) => setTitleActivities(e.target.value)}
              disabled={modalData.type === "read"}
            />
          </Form.Item>

          <Form.Item label="Description" labelCol={{ span: 24 }}>
            <Input
              placeholder="Fill the description here..."
              value={descriptionActivities}
              onChange={(e) => setDescriptionActivities(e.target.value)}
              disabled={modalData.type === "read"}
            />
          </Form.Item>

          <Form.Item label="Price" labelCol={{ span: 24 }}>
            <Input
              placeholder="Fill the price here..."
              value={priceActivities}
              onChange={(e) => setPriceActivities(e.target.value)}
              disabled={modalData.type === "read"}
            />
          </Form.Item>

          <Form.Item label="Price Discount" labelCol={{ span: 24 }}>
            <Input
              placeholder="Fill the price discount here..."
              value={priceDiscountActivities}
              onChange={(e) => setPriceDiscountActivities(e.target.value)}
              disabled={modalData.type === "read"}
            />
          </Form.Item>

          <Form.Item label="Rating" labelCol={{ span: 24 }}>
            <Input
              placeholder="Fill the rating here..."
              value={ratingActivities}
              onChange={(e) => setRatingActivities(e.target.value)}
              disabled={modalData.type === "read"}
            />
          </Form.Item>

          <Form.Item label="Total Reviews" labelCol={{ span: 24 }}>
            <Input
              placeholder="Fill the total reviews here..."
              value={totalReviewsActivities}
              onChange={(e) => setTotalReviewsActivities(e.target.value)}
              disabled={modalData.type === "read"}
            />
          </Form.Item>

          <Form.Item label="Facilities" labelCol={{ span: 24 }}>
            <Input
              placeholder="Fill the facilities here..."
              value={facilityActivities}
              onChange={(e) => setFacilityActivities(e.target.value)}
              disabled={modalData.type === "read"}
            />
          </Form.Item>

          <Form.Item label="Address" labelCol={{ span: 24 }}>
            <Input
              placeholder="Fill the address here..."
              value={addressActivities}
              onChange={(e) => setAddressActivities(e.target.value)}
              disabled={modalData.type === "read"}
            />
          </Form.Item>

          <Form.Item label="Province" labelCol={{ span: 24 }}>
            <Input
              placeholder="Fill the province name here..."
              value={provinceActivities}
              onChange={(e) => setProvinceActivities(e.target.value)}
              disabled={modalData.type === "read"}
            />
          </Form.Item>

          <Form.Item label="City" labelCol={{ span: 24 }}>
            <Input
              placeholder="Fill the city name here..."
              value={cityActivities}
              onChange={(e) => setCityActivities(e.target.value)}
              disabled={modalData.type === "read"}
            />
          </Form.Item>

          <Form.Item label="Maps" labelCol={{ span: 24 }}>
            <Input
              placeholder="Input map location here..."
              value={mapsActivities}
              onChange={(e) => setMapsActivities(e.target.value)}
              disabled={modalData.type === "read"}
            />
          </Form.Item>

          {modalData.type !== "read" && (
            <Input
              type="file"
              value={fileValueActivities}
              onChange={handleFile}
            />
          )}

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
