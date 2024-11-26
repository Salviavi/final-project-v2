import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Row, Col, Button } from "antd";
import LayoutDashboard from "../../components/Layout";

export default function UsersPages() {
  const token = localStorage.getItem("access_token");

  const [usersData, setUsersData] = useState(null); // Changed default state to null for better loading detection
  const [error, setError] = useState(""); // New state for error messages

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
        setError(""); // Clear any previous error messages
      })
      .catch((err) => {
        console.error(err.response);
        setError("Failed to load user data. Please try again later."); // Manual error message
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  /* SWITCH ROLE */
  const switchRole = (userId, currentRole) => {
    const newRole = currentRole === "admin" ? "user" : "admin";

    axios
      .post(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-user-role/${userId}`,
        { role: newRole },
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setError(""); // Clear any previous error messages
        getUsers(); // Refresh the user list after role change
      })
      .catch((err) => {
        console.error(err.response);
        setError("Failed to switch role. Please try again later."); // Manual error message
      });
  };

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
        {error && (
          <div
            style={{ color: "red", textAlign: "center", marginBottom: "20px" }}
          >
            <p>{error}</p> {/* Display custom error message */}
          </div>
        )}
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
                      <Button
                        type="primary"
                        onClick={() => switchRole(user.id, user.role)}
                      >
                        Switch to {user.role === "admin" ? "User" : "Admin"}
                      </Button>
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
