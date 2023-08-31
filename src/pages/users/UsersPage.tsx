import { usersRef } from "../../components/firebaseConfig"
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useState, useEffect } from "react"
import { ColumnsType } from "antd/es/table";
import { Button, Row, Space, Table,Typography } from "antd";
import User from "./User";
import { AiOutlineEdit, AiOutlineUserDelete } from "react-icons/ai";
import "./UsersPage.css";
const { Text,Title } = Typography;

function UsersTable() {
    const orderedQuery = query(usersRef, orderBy('name'));

    const columns: ColumnsType<User> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            // sorter: (a, b) => a.name.localeCompare(b.name), defaultSortOrder: 'ascend',
            render: (name, key) => {
                let imgUrl = key.photoUrl;

                if (imgUrl === null || imgUrl.length === 0) {
                    imgUrl = "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg";
                }
                return (
                    <Row align={"middle"}>
                        <img
                            className="user-profile-image"
                            src={imgUrl}
                            alt="profile"

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
        onSnapshot(orderedQuery, (querySnapshot) => {
            const userList = (querySnapshot.docs.map((doc, index) => {
                const data = doc.data();
                return {
                    uid: data.id,
                    name: data.name,
                    email: data.email,
                    photoUrl: data.photo_url
                };
            }));
            setData(userList);
        });
    });

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


function UsersPage() {
    return <UsersTable />;
}

export default UsersPage;