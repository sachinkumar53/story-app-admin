import { usersRef } from "../../firebase/FirebaseApp"
import { getDocs, onSnapshot, orderBy, query } from "firebase/firestore";
import { useState, useEffect } from "react"
import { ColumnsType } from "antd/es/table";
import { Button, Row, Space, Table, Typography, Avatar } from "antd";
import User from "../../model/User";
import { AiOutlineEdit, AiOutlineUserDelete, AiOutlineUser } from "react-icons/ai";
import "./users.css";
const { Title } = Typography;

export default function UsersPage() {
    const orderedQuery = query(usersRef, orderBy('name'));

    const columns: ColumnsType<User> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            // sorter: (a, b) => a.name.localeCompare(b.name), defaultSortOrder: 'ascend',
            render: (name, key) => {
                return (
                    <Row align={"middle"}>
                        <Avatar
                            src={key.photoUrl}
                            alt="profile"
                            icon={<AiOutlineUser />}
                            style={{ marginRight: '10px' }}
                        />
                        <p>{name}</p>
                    </Row>

                );
            },
        },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'UID', dataIndex: 'uid', key: 'uid' },
        {
            title: 'Action',
            key: 'action',
            render: () => (
                <Space size="middle">
                    <Button icon={<AiOutlineEdit />} shape="round"> Edit</Button>
                    <Button danger={true} shape="round" icon={<AiOutlineUserDelete />}>Delete</Button>
                </Space>
            ),
        },
    ];

    const [data, setData] = useState<User[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const snapshot = await getDocs(orderedQuery);
            const userList = snapshot.docs.map(doc => {
                const data = doc.data()
                return {
                    uid: data.id,
                    name: data.name,
                    email: data.email,
                    photoUrl: data.photo_url
                };
            });
            setData(userList);
        }
        fetchUsers();
    }, [orderedQuery]);

    return (
        <div>
            <Title level={3}>All Users</Title>
            <Table
                className="users-table"
                columns={columns}
                dataSource={data}
                bordered={false}
            />
        </div>
    )
}
