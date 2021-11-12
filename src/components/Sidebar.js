import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import { FaGem, FaHeart } from "react-icons/fa";
import 'react-pro-sidebar/dist/css/styles.css';
import {
  Link
} from "react-router-dom";

function Sidebar() {
  return (
    <ProSidebar>
      <SidebarHeader>
        <p>Logo</p>
      </SidebarHeader>
      <SidebarContent>
        <Menu iconShape="square">
          <MenuItem icon={<FaGem />}>
            <Link to={'/elections'}>Elecciones</Link>
          </MenuItem>
          <MenuItem icon={<FaGem />}>
            <Link to={'/parties'}>Partidos Políticos</Link>
          </MenuItem>
          <MenuItem icon={<FaGem />}>
            <Link to={'/candidates'}>Candidatos</Link>
          </MenuItem>
          <MenuItem icon={<FaGem />}>
            <Link to={'/voters'}>Votantes</Link>
          </MenuItem>
        </Menu>
      </SidebarContent>
      <SidebarFooter>
        COPYRIGHT
      </SidebarFooter>
    </ProSidebar>
  );
}

export default Sidebar;
