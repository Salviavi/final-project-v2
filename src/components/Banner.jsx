import { useNavigate } from "react-router-dom";
import { Button, Flex, Typography } from "antd";
import styles from "../styles/dashboard.module.css";
import { Card, Col, Row } from "antd";
import {
  ProfileOutlined,
  TeamOutlined,
  EnvironmentOutlined,
  ThunderboltOutlined,
  PercentageOutlined,
} from "@ant-design/icons";

const Banner = () => {
  const navigate = useNavigate();
  const handleMenuClick = (key) => {
    // Use the menu item's key to decide which route to navigate to
    switch (key) {
      case "1":
        navigate("/profile");
        break;
      case "2":
        navigate("/users");
        break;
      case "3":
        navigate("/locations");
        break;
      case "4":
        navigate("/activities");
        break;
      case "5":
        navigate("/promos");
        break;
      case "6":
      default:
        break;
    }
  };

  return (
    <Card style={{ height: 300, padding: "20px" }}>
      <Flex vertical gap="30px">
        <Flex vertical align="flex-start">
          <Typography.Title level={2} strong>
            Create your own travel packages
          </Typography.Title>
          <Typography.Text type="secondary" strong>
            Let's get started!
          </Typography.Text>
        </Flex>

        <Flex gap="large">
          {/* Buttons with icon */}
          <Button
            size="large"
            icon={<ProfileOutlined />}
            onClick={() => handleMenuClick("1")}
          >
            Profile
          </Button>

          <Button
            size="large"
            icon={<TeamOutlined />}
            onClick={() => handleMenuClick("2")}
          >
            Users
          </Button>

          <Button
            size="large"
            icon={<EnvironmentOutlined />}
            onClick={() => handleMenuClick("3")}
          >
            Locations
          </Button>

          <Button
            size="large"
            icon={<ThunderboltOutlined />}
            onClick={() => handleMenuClick("4")}
          >
            Activities
          </Button>

          <Button
            size="large"
            icon={<PercentageOutlined />}
            onClick={() => handleMenuClick("5")}
          >
            Promos
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
};

export default Banner;
