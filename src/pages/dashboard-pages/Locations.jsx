import axios from "axios";
import LayoutDashboard from "../../components/Layout";
import { useEffect, useState } from "react";
import { Button } from "antd";
import { Modal } from "antd";

export default function LocationPages() {
  const [categoriesData, setCategoriesData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    title: "Create Categories",
    data: null,
  });

  const showModal = (type = "create") => {
    setIsModalOpen(true);
    if (type === "create") {
      setModalData((prev) => ({ ...prev, title: "Create Activities" }));
    } else if (type === "edit") {
      setModalData((prev) => ({ ...prev, title: "Edit Activities" }));
    } else if (type === "read") {
      setModalData((prev) => ({ ...prev, title: "Activities" }));
    } else if (type === "delete") {
      setModalData((prev) => ({ ...prev, title: "Delete Activities" }));
    }
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  /* READ CATEGORIES */
  const getCategories = () => {
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
        setCategoriesData(res?.data?.data || []);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  /* READ CATEGORIES */

  /* CREATE CATEGORIES */
  /* CREATE CATEGORIES */

  useEffect(() => {
    getCategories();
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
          {categoriesData.map((item, index) => (
            <div
              key={index}
              className="col-span-12 md:col-span-6 lg:col-span-3 border p-6 rounded-lg bg-white cursor-pointer"
            >
              <div onClick={() => showModal("read")}>
                <h1>{item.name}</h1>
                <br />
                <img
                  src={item.imageUrl}
                  alt="category image"
                  className="h-[200px] w-auto"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button
                  type="primary"
                  className="col-span-1 top-5"
                  onClick={() => showModal("edit")}
                >
                  Edit
                </Button>
                <Button
                  type="primary"
                  className="col-span-1 top-5"
                  danger
                  onClick={() => showModal("delete")}
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
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </section>
  );
}
