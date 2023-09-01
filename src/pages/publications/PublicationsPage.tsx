import "./PublicationsPage.css"
import { publicationsRef, usersRef } from "../../firebase/FirebaseApp";
import { query, orderBy, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { Publication } from "../../model/Publication";
import { Col, Row, Typography } from "antd";
import { getAuthorNameById } from "../../util/FirestoreDbUtil";
import StoryCard from "../../components/StoryCard";

const { Title } = Typography;

async function getAllPublications(): Promise<Publication[]> {
    const orderedQuery = query(publicationsRef, orderBy('published_on'));
    const querySnapshot = await getDocs(orderedQuery);

    const publications = await Promise.all(
        querySnapshot.docs.map(async (doc) => {
            const data = doc.data();
            const authorName: string = await getAuthorNameById(data.author_id);
            const publication: Publication = {
                title: data.title,
                id: data.id,
                coverUrl: data.cover_url,
                publishedOn: data.publishedOn,
                authorId: data.author_id,
                authorName: authorName
            }
            return publication;
        }));

    return publications;
}

function PublicationsPage() {
    const [publications, setPublications] = useState<Publication[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            const publications = await getAllPublications();
            setPublications(publications);
        }
        fetchData();
    });

    return (
        <div>
            <Title level={3}>All Publications</Title>
            <Row className="main" gutter={[16, 16]} justify="start">
                {publications.map((publication) => (
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

export default PublicationsPage;