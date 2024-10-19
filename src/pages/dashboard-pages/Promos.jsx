import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/dashboard.module.css";
import logo from "../../images/logoCrop.png";
import { Button, Layout } from "antd";
import {MenuUnfoldOutlined, MenuFoldOutlined} from "@ant-design/icons"
import Sidebar from "../../components/Sidebar";
import CustomHeader from "../../components/Header";
import MainContent from "../../components/MainContent";
import SideContent from "../../components/SideContent";
import { Flex } from "antd";
import BannerPromo from "../../components/BannerPromo";


const { Sider, Header, Content } = Layout;
const Promos = () => {

    const [collapsed, setCollapsed] = useState(false)

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
                            <MainContent />
                            <SideContent />
                        </Flex>
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
};

export default Promos;