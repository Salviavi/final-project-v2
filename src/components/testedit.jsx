import { Flex } from "antd";
import styles from "../styles/dashboard.module.css";
import Banner from "./Banner";


const Edit = () => {

    

    return (
        <div style={{flex: 1}}>
            <Flex vertical gap="2.3rem">
                <Banner />
            </Flex>
        </div>
    );
};

export default Edit;