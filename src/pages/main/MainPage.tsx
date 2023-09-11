import { Button, Layout, Popconfirm, Row, message } from "antd";
import { signOut } from "firebase/auth";
import { useState } from "react";
import { MdOutlineLogout } from 'react-icons/md';
import { auth } from "../../firebase/FirebaseApp";
import "./main.css";
import SiderMenu, { SiderMenuItem } from "./SiderMenu";
import RenderContent from "./RenderContent";

const { Header, Sider, Content } = Layout;

async function logout() {
  await signOut(auth);
}

function HeaderBar() {

  const confirm = () => {
    try {
      logout();
      message.success("You have been logged out");
    } catch (err) {
      console.log(err);
      message.error("Could not log out");
    }

  };

  return (
    <Row justify={"space-between"} align={'middle'}>
      <span className="brand-name">StoryScape</span>
      <Row align={'middle'}>
        {/* <img className="profile-image" src="https://e1.pxfuel.com/desktop-wallpaper/903/679/desktop-wallpaper-97-aesthetic-best-profile-pic-for-instagram-for-boy-instagram-dp-boys.jpg" alt="profile" /> */}
        <Popconfirm
          title="Logout"
          description='Do you really want to logout?'
          onConfirm={confirm}
          okText='Yes'
          cancelText='No'
        >

          <Button type="text">

            <Row align='middle' >

              <span style={{ marginRight: '10px' }}>Admin</span>
              <MdOutlineLogout />

            </Row>

          </Button>
        </Popconfirm>

      </Row>
    </Row>
  )
}


const defaultSelectedMenu = 'dashboard'

function MainPage() {
  const [selectedMenuItem, setSelectedMenuItem] = useState<SiderMenuItem>(defaultSelectedMenu);

  const handleMenuItemSelect = (item: SiderMenuItem) => {
    setSelectedMenuItem(item);
  }

  return (
    <Layout className="container">
      <Header style={{ background: 'transparent', padding:'0px 20px'}}>
        <HeaderBar />
      </Header>
      <Layout className="transparent-background">
        <Sider style={{ backgroundColor: 'transparent' }}>
          <SiderMenu selectedItem={selectedMenuItem} onMenuItemSelected={handleMenuItemSelect} />
        </Sider>
        <Content className="transparent-background content">
          <RenderContent selectedMenuItem={selectedMenuItem} />
        </Content>
      </Layout>
    </Layout>
  );
}

export default MainPage;
