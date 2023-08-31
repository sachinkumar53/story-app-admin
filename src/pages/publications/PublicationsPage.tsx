import "./PublicationsPage.css"
import { publicationsRef, usersRef } from "../../firebase/FirebaseApp";
import { query, orderBy, doc, getDoc, DocumentSnapshot, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { Publication } from "./Publication";
import { Card, Col, Row, Typography } from "antd";

const { Title, Text } = Typography;

function PublicationsPage() {
    const orderedQuery = query(publicationsRef, orderBy('published_on'));

    const [publications, setPublications] = useState<Publication[]>([]);

    const getAuthorNameById = async (authorId: string) => {
        const docRef = doc(usersRef, authorId);
        const userSnapshot: DocumentSnapshot = await getDoc(docRef);
        const userData = userSnapshot.data();
        if (userData !== undefined) {
            return userData.name;
        } else {
            return "unknown";
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(orderedQuery);
            const promises = querySnapshot.docs.map(async (doc) => {
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
            });
            const publications = await Promise.all(promises);
            setPublications(publications);
        }
        fetchData();
    }, [orderedQuery]);

    return (
        <div>
        <Title level={3}>All Publications</Title>
        <Row className="main" justify={"space-around"} >
            {publications.map((publication) => (
                <Col span={4}>
                    <div className="book-card">
                        <img className="book-cover" src={publication.coverUrl} alt="Cover" />
                        <Title className="book-title" level={5}>{publication.title}</Title>
                        <Text className="book-author" type="secondary">by {publication.authorName}</Text>
                    </div>
                </Col>
            ))}
        </Row>
        </div>
    );
}

export default PublicationsPage;