import {
  HeaderContainer,
  Header,
  SkipToContent,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
  SideNav,
  SideNavItems,
  SideNavLink,
  SideNavMenu,
  SideNavMenuItem,
} from "carbon-components-react/lib/components/UIShell";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
} from "@mui/material";
import Link from 'react-router-dom';

function Header(){
  const displayDesktop = () => {
    return <Toolbar>Cloudant Sample Explorer</Toolbar>;
  };
  return (
      <header>
        <AppBar>{displayDesktop()}</AppBar>
      </header>
  );
}

export default Header();
