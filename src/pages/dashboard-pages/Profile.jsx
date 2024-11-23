import axios from "axios";
import LayoutDashboard from "../../components/Layout";
import { useEffect, useState } from "react";
import { Card, Button, Form } from "antd";
import { EditOutlined } from "@ant-design/icons";

export default function ProfilePages() {
  const token = localStorage.getItem("access_token");

  // State for storing user profile data
  const [profileData, setProfileData] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  /* READ PROFILE */
  const getProfile = () => {
    axios
      .get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/user", {
        headers: {
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setProfileData(res?.data?.data || null);
      })
      .catch((err) => {
        console.error(err.response);
      });
  };

  /* EDIT PROFILE */

  const handleSubmit = (values) => {
    axios
      .put(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-profile",
        values,
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        // Update profile data with the new values
        setProfileData(res?.data?.data || profileData);
        setIsModalVisible(false); // Close modal after successful submission
      })
      .catch((err) => {
        console.error("Error updating profile:", err);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Open the modal and fill it with current profile data
  const showModal = () => {
    form.setFieldsValue({
      name: profileData?.name,
      email: profileData?.email,
      profilePictureUrl: profileData?.profilePictureUrl,
      phoneNumber: profileData?.phoneNumber,
    });
    setIsModalVisible(true);
  };

  useEffect(() => {
    getProfile();
  }, []);

  if (!profileData) {
    return (
      <section>
        <LayoutDashboard>
          <div className="flex justify-center mb-4">
            <Card title="Your Profile" bordered={false} style={{ width: 800 }}>
              <p>Loading profile data...</p>
            </Card>
          </div>
        </LayoutDashboard>
      </section>
    );
  }

  return (
    <section>
      <LayoutDashboard>
        <div className="flex justify-center mb-4">
          <Card title="Your Profile" bordered={false} style={{ width: 800 }}>
            <div
              key={profileData.id}
              className="w-60 p-2 bg-white rounded-xl transform transition-all hover:translate-y-2 duration-300 shadow-lg hover:shadow-2xl mt-4 mb-4 lg:mt-0 flex flex-col items-center"
            >
              <img
                src={profileData.profilePictureUrl}
                alt="Profile"
                className="h-40 object-cover rounded-xl"
              />
              <div className="p-2">
                <h2 className="font-bold text-lg mb-2 text-center">
                  {profileData.name}
                </h2>
                <p>Email: {profileData.email}</p>
                <p>Role: {profileData.role}</p>
                <p>Phone: {profileData.phoneNumber}</p>
              </div>
              {/* Align button within card */}
              <div style={{ textAlign: "left", marginTop: "16px" }}>
                <Button
                  type="primary"
                  htmlType="button"
                  icon={<EditOutlined />}
                  onClick={showModal}
                >
                  Edit Profile
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </LayoutDashboard>
    </section>
  );
}
