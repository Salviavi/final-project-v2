// Modules
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

// Components
import { Button, Layout } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Flex } from "antd";
import Sidebar from "../components/Sidebar";
import CustomHeader from "../components/Header";

// Styles
import styles from "../styles/dashboard.module.css";

const { Sider, Header, Content } = Layout;
export default function LayoutDashboard({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div>
      <h1 className="text-purple-300 rounded-xl">Halo ini dashboard</h1>
      <Layout>
        <Sider
          theme="light"
          trigger={null}
          collapsible
          collapsed={collapsed}
          className={styles["sider-dashboard"]}
        >
          <Sidebar />
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className={styles["trigger-btn-dashboard"]}
          />
        </Sider>
        <Layout>
          <Header className={styles["header-dashboard"]}>
            <CustomHeader />
          </Header>
          <Content className={styles["content-dashboard"]}>
            <Flex gap="large">
              {/* Ini isi content */}
              <div className="w-full">{children}</div>
              {/* <MainContent />
              <SideContent /> */}
            </Flex>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}
