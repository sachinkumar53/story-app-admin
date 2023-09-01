import { Typography } from "antd";

const { Title, Text } = Typography;

interface StoryCardProps {
    coverUrl: string;
    title: string;
    authorName: string;
}

function StoryCard({ coverUrl, title, authorName }: StoryCardProps) {

    return (
        <div className="book-card">
            <img className="book-cover" src={coverUrl} alt="Cover" />
            <Title className="book-title" level={5}>{title}</Title>
            <Text className="book-author" type="secondary">by {authorName}</Text>
        </div>
    )
}

export default StoryCard;