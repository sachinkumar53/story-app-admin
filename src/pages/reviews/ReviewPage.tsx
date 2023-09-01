import { Typography, Row, Card, Col, Rate, Button } from "antd";
import "./ReviewPage.css"
import { AiOutlineDelete } from "react-icons/ai"

const { Text } = Typography;

function ReviewPage() {
    return (
        <Card style={{ borderRadius: 16 }}>
            <Row justify="space-between">
                <Col>
                    <Row align="middle">
                        <img className="avatar-image" src="https://www.freecodecamp.org/news/content/images/size/w60/2023/01/kolade-recent.jpg"
                            alt="avatar" />

                        <Col>
                            <div>
                                <Text strong>Kolade Chris</Text>
                                <Text style={{ opacity: 0.4 }}> &bull; </Text>
                                <Text>September 01, 2023, 09:16</Text>
                            </div>

                            <Text type="secondary">Posted on: </Text>
                            <Text strong>The Little Mermaid</Text>
                            <Text> by Sachin Kumar</Text>
                        </Col>

                    </Row>
                    <Col style={{ marginLeft: 56 }}>
                        <Rate disabled defaultValue={2} style={{ display: 'block', marginTop: 8, marginBottom: 10 }} />
                        <Text>Lorem ipsum dolor sit amet consectetur.</Text>
                    </Col>
                </Col>
                <Button danger type="text" icon={<AiOutlineDelete />} shape="circle"></Button>
            </Row>
        </Card>
    );
}

export default ReviewPage;