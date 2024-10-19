import { Avatar, Flex, Typography, Button } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import Search from "antd/es/input/Search";
import {
  MessageOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import styles from "../styles/dashboard.module.css";
import { Link, useNavigate } from "react-router-dom";

const CustomHeader = () => {
  const [loggedUser, setloggedUser] = useState(null);
  const token = localStorage.getItem("access_token");

  const getLoggedUser = () => {
    axios
      .get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/user", {
        headers: {
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        setloggedUser(res.data.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  useEffect(() => {
    if (token) {
      getLoggedUser();
    }
  }, [token]);

  return (
    <Flex align="center" justify="space-between">
      <Typography.Title level={3} type="secondary">
        Welcome back, {loggedUser ? loggedUser.name : "User"}!
      </Typography.Title>

      <Flex align="center" gap="3rem">
        <Search placeholder="Search Dashboard" allowClear />

        <Flex align="center" gap="10px">
          <Link to="/">
            <Button>Back to Home</Button>
          </Link>
          <MessageOutlined className={styles["header-icon-dashboard"]} />
          <NotificationOutlined className={styles["header-icon-dashboard"]} />
          <Avatar icon={<UserOutlined />} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CustomHeader;
