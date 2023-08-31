import { Layout, Row } from "antd";
import "./Main.css";
import { useState } from "react";
import SiderMenu, { SiderMenuItem } from "./SiderMenu";
import RenderContent from "./RenderContent";

const { Header, Sider, Content } = Layout;

function HeaderBar() {
  return (
    <Row justify={"space-between"} align={'middle'}>
      <span className="brand-name">StoryScape</span>
      <Row align={'middle'}>
        <img className="profile-image" src="https://e1.pxfuel.com/desktop-wallpaper/903/679/desktop-wallpaper-97-aesthetic-best-profile-pic-for-instagram-for-boy-instagram-dp-boys.jpg" alt="profile" />
        <span>Admin</span>
      </Row>
    </Row>
  )
}




function MainPage() {
  const [selectedMenuItem, setSelectedMenuItem] = useState<SiderMenuItem>('dashboard');

  const handleMenuItemSelect = (item: SiderMenuItem) => {
    setSelectedMenuItem(item);
  }

  return (
    <Layout className="container">
      <Header style={{ background: 'transparent' }}>
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
