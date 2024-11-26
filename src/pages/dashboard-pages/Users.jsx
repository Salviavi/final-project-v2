import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Row, Col } from "antd";
import LayoutDashboard from "../../components/Layout";

export default function UsersPages() {
  const token = localStorage.getItem("access_token");

  const [usersData, setUsersData] = useState(null); // Changed default state to null for better loading detection

  /* READ USERS */
  const getUsers = () => {
    axios
      .get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/all-user",
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setUsersData(res?.data?.data || []);
      })
      .catch((err) => {
        console.error(err.response);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  if (!usersData) {
    return (
      <section>
        <LayoutDashboard>
          <div className="flex justify-center mb-4">
            <Card title="User List" bordered={false} style={{ width: 800 }}>
              <p>Loading user data...</p>
            </Card>
          </div>
        </LayoutDashboard>
      </section>
    );
  }

  return (
    <section>
      <LayoutDashboard>
        <Row gutter={[16, 16]}>
          {usersData.map((user) => (
            <Col xs={24} sm={12} md={8} lg={6} key={user.id}>
              <Card
                hoverable
                cover={
                  <img
                    alt={user.name}
                    src={
                      user.profilePictureUrl ||
                      "https://via.placeholder.com/150"
                    }
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                    }}
                  />
                }
              >
                <Card.Meta
                  title={user.name}
                  description={
                    <>
                      <p>Email: {user.email}</p>
                      <p>Role: {user.role}</p>
                      <p>Phone: {user.phoneNumber || "N/A"}</p>
                    </>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      </LayoutDashboard>
    </section>
  );
}
