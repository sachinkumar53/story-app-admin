import { Menu, MenuProps } from "antd";
import {BiSolidBookAlt,BiSolidHome} from "react-icons/bi";
import {BsFillInfoCircleFill,BsFillPersonFill} from "react-icons/bs";
import {MdReviews} from "react-icons/md";

type MenuItem = Required<MenuProps>['items'][number];

function buildMenuItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

export type SiderMenuItem = 'dashboard' | 'publications'|'users'|'ratings'|'about';
type MenuSelectCallback = (selectedItem: SiderMenuItem) => void;

interface SiderMenuProps {
    selectedItem: SiderMenuItem;
    onMenuItemSelected: MenuSelectCallback;
}


function SiderMenu({selectedItem, onMenuItemSelected }: SiderMenuProps) {
    return (
        <div style={{ width: 200 }}>
            <Menu
                defaultSelectedKeys={[selectedItem]}
                theme="dark"
                items={[
                    buildMenuItem('Dashboard', 'dashboard',<BiSolidHome/>),
                    buildMenuItem('Publications', 'publications',<BiSolidBookAlt/>),
                    buildMenuItem('Users', 'users',<BsFillPersonFill/>),
                    buildMenuItem('Ratings & Reviews', 'ratings',<MdReviews/>),
                    buildMenuItem('About', 'about',<BsFillInfoCircleFill/>),
                ]}
                onSelect={(item: any) => onMenuItemSelected(item.key)}
            />
        </div>
    )
}

export default SiderMenu;