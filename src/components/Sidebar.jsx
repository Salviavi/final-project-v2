import { Flex, Menu } from "antd";
import { BsLuggageFill } from "react-icons/bs";
import styles from "../styles/dashboard.module.css";
import {
  UserOutlined,
  ProfileOutlined,
  LogoutOutlined,
  OrderedListOutlined,
  CarryOutOutlined,
  SettingOutlined,
  TeamOutlined,
  EnvironmentOutlined,
  PercentageOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); // Clear the local storage (logout)
    navigate("/login"); // Redirect to login page
  };

  const handleMenuClick = (e) => {
    // Use the menu item's key to decide which route to navigate to
    switch (e.key) {
      case "1":
        navigate("/dashboard");
        break;
      case "2":
        navigate("/profile");
        break;
      case "3":
        navigate("/users");
        break;
      case "4":
        navigate("/locations");
        break;
      case "5":
        navigate("/activities");
        break;
      case "6":
        navigate("/promos");
        break;
      case "7":
        navigate("/settings");
        break;
      case "8":
        // Perform logout operation or navigate to login page
        handleLogout();
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <Flex align="center" justify="center">
        <div className={styles["logo"]}>
          <BsLuggageFill />
        </div>
      </Flex>
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        className={styles["menu-bar"]}
        onClick={handleMenuClick}
        items={[
          {
            key: "1",
            icon: <UserOutlined />,
            label: "Dashboard",
          },
          {
            key: "2",
            icon: <ProfileOutlined />,
            label: "Profile",
          },
          {
            key: "3",
            icon: <TeamOutlined />,
            label: "Users",
          },
          {
            key: "4",
            icon: <EnvironmentOutlined />,
            label: "Locations",
          },
          {
            key: "5",
            icon: <ThunderboltOutlined />,
            label: "Activities",
          },
          {
            key: "6",
            icon: <PercentageOutlined />,
            label: "Promos",
          },
          {
            key: "7",
            icon: <SettingOutlined />,
            label: "Setting",
          },
          {
            key: "8",
            icon: <LogoutOutlined />,
            label: "Logout",
          },
        ]}
      />
    </div>
  );
};

export default Sidebar;
