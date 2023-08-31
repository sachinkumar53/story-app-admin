import { collection, onSnapshot } from "firebase/firestore"
import { usersRef, publicationsRef } from "../../components/firebaseConfig"
import { useEffect, useState } from "react"
import { Card, Col, Row, Space, Statistic, Typography } from "antd";
const { Text, Title } = Typography;

function DashboardPage() {
    const [userCount, setUserCount] = useState(0);
    const [publicationCount, setPublicationCount] = useState(0);

    useEffect(() => {
        onSnapshot(usersRef, (querySnapshot) => {
            const count = querySnapshot.docs.length;
            setUserCount(count);
        });

        onSnapshot(publicationsRef, (querySnapshot) => {
            const count = querySnapshot.docs.length;
            setPublicationCount(count);
        });
    });

    /* <Row>
            <Space>
                <Card>
                    <Text>Total Users</Text>
                    <Title>{userCount}</Title>
                </Card>
                <Card>
                    <Text>Total Publications</Text>
                    <Title>{publicationCount}</Title>
                </Card>
            </Space>
        </Row> */

    return (

        <Row gutter={16}>
            <Col span={12}>
                <Card bordered={false}>
                    <Statistic
                        title="Total Users"
                        value={userCount}
                    />
                </Card>
            </Col>
            <Col span={12}>
                <Card bordered={false}>
                    <Statistic
                        title="Total Publications"
                        value={publicationCount}
                    />
                </Card>
            </Col>
        </Row>

    );
}

export default DashboardPage;