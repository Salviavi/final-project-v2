import { Button, Flex, Card, Typography } from "antd";
import styles from "../styles/dashboard.module.css";


const BannerPromo = () => {

    return (
        <Card style={{height: 260, padding: "20px"}}>
            <Flex vertical gap="30px">
                <Flex vertical align="flex-start">
                    <Typography.Title level={2} strong>
                        Create your own travel packages
                    </Typography.Title>
                    <Typography.Text type="secondary" strong>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab cumque, quasi dolore alias nisi eaque officiis fuga error dicta nihil deserunt neque quos, mollitia eius accusamus labore quis facilis. Cupiditate.
                    </Typography.Text>
                </Flex>

                <Flex gap="large">
                    <Button type="primary" size="large">Explore More</Button>
                    <Button size="large">Explore More</Button>
                </Flex>
            </Flex>
        </Card>
    );
};

export default BannerPromo;