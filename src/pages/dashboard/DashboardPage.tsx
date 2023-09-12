import { getDocs, getDoc, doc, DocumentSnapshot } from "firebase/firestore"
import { usersRef, publicationsRef, topRatedStoriesRef } from "../../firebase/FirebaseApp"
import { useEffect, useState } from "react"
import { Card, Col, Row, Statistic, Typography } from "antd";
import { getAuthorNameById } from "../../util/FirestoreDbUtil";
import { Publication } from "../../model/Publication";
import StoryCard from "../../components/StoryCard";
const { Title } = Typography;

async function getTopRatedStories(): Promise<Publication[]> {
    const querySnapshot = await getDocs(topRatedStoriesRef);
    const publications = await Promise.all(
        querySnapshot.docs.map(async (snapshot) => {
            const docId = snapshot.id;
            const docSnapshot: DocumentSnapshot = await getDoc(doc(publicationsRef, docId));
            const data = docSnapshot.data();
            if (data !== undefined) {
                const authorName: string = await getAuthorNameById(data.author_id);
                const publication: Publication = {
                    title: data.title,
                    id: data.id,
                    coverUrl: data.cover_url,
                    publishedOn: data.publishedOn,
                    authorId: data.author_id,
                    authorName: authorName
                };
                return publication;
            }
        }))
        .then((list) => {
            return list.filter((publication): publication is Publication => publication !== undefined);
        });

    return publications;
}


function DashboardPage() {
    const [userCount, setUserCount] = useState(0);
    const [publicationCount, setPublicationCount] = useState(0);
    const [topRatedStories, setTopRatedStories] = useState<Publication[]>([]);

    useEffect(() => {
        const fetchUsersCount = async () => {
            const users = await getDocs(usersRef);
            const count = users.docs.length;
            setUserCount(count);
        };

        const fetchPublicationsCount = async () => {
            const publications = await getDocs(publicationsRef);
            const count = publications.docs.length;
            setPublicationCount(count);
        };

        const fetchTopRatedStories = async () => {
            const topRatedStories = await getTopRatedStories();
            setTopRatedStories(topRatedStories);
        }

        fetchUsersCount();
        fetchPublicationsCount();
        fetchTopRatedStories();
        //console.log("dashboard fetch data");
    }, []);

    return (
        <div>
            <Row gutter={16}>
                <Col span={4}>
                    <Card style={{ borderRadius: '8px' }}>
                        <Statistic
                            title="Total Users"
                            value={userCount}
                        />
                    </Card>
                </Col>
                <Col span={4}>
                    <Card style={{ borderRadius: '8px' }}>
                        <Statistic
                            title="Total Publications"
                            value={publicationCount}
                        />
                    </Card>
                </Col>
            </Row>
            <Title level={3} style={{ marginTop: 24 }}>Top rated</Title>
            <Row gutter={[16, 16]} justify="start">
                {topRatedStories.map((publication) => (
                    <Col xs={2} sm={4} md={6} lg={8} xl={4}>
                        <StoryCard
                            coverUrl={publication.coverUrl}
                            title={publication.title}
                            authorName={publication.authorName}
                        />
                    </Col>
                ))}
            </Row>
        </div>

    );
}

export default DashboardPage;