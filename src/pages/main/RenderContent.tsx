import DashboardPage from "../dashboard/DashboardPage";
import PublicationsPage from "../publications/PublicationsPage";
import ReviewPage from "../reviews/ReviewPage";
import UsersPage from "../users/UsersPage";
import { SiderMenuItem } from "./SiderMenu"

interface RenderContentProps {
  selectedMenuItem: SiderMenuItem;
}

function RenderContent({ selectedMenuItem }: RenderContentProps) {
  switch (selectedMenuItem) {
    case 'users':
      return <UsersPage />;

    case 'publications':
      return <PublicationsPage />;

    case "dashboard":
      return <DashboardPage />;

    case "ratings":
      return <ReviewPage />;
    default:
      return <p style={{ color: 'magenta' }}>{selectedMenuItem} </p>;
  }
};

export default RenderContent;