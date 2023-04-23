import { useState } from "react";
import { Link } from "react-router-dom";
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Home from '@mui/icons-material/Home';
import RssFeed from '@mui/icons-material/RssFeed';
import GroupWork from '@mui/icons-material/GroupWork';
import Call from '@mui/icons-material/Call';
import Login from '@mui/icons-material/Login';
import AppRegistration from '@mui/icons-material/AppRegistration';
import { useUserContext } from "../context/userContext";
import { useLoaderData } from "react-router-dom";


export default function Navbar() {
  const [toggle, setToggle] = useState(false);

  const toggleDrawer = (val) => {
    setToggle(val);
  };

  const user = useLoaderData();


  console.log(user)

  const list = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={() => toggleDrawer(false)}
    >
      <List>
        <ListItem disablePadding button component='a' href='/#header'>
          <ListItemButton>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary='Home' />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding button component='a' href='/#services'>
          <ListItemButton>
            <ListItemIcon>
              <RssFeed />
            </ListItemIcon>
            <ListItemText primary='Services' />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding button component='a' href='/#about'>
          <ListItemButton>
            <ListItemIcon>
              <GroupWork />
            </ListItemIcon>
            <ListItemText primary='About' />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding button component='a' href='/#contact'>
            <ListItemButton>
              <ListItemIcon>
                <Call />
              </ListItemIcon>
              <ListItemText primary='Contact' />
            </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <Link to='/login' className='w-full'>
            <ListItemButton>
              <ListItemIcon>
                <Login />
              </ListItemIcon>
              <ListItemText primary='Sign in' />
            </ListItemButton>
          </Link>
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <Link to='/register' className='w-full'>
            <ListItemButton button>
              <ListItemIcon>
                <AppRegistration />
              </ListItemIcon>
              <ListItemText primary='Sign up' />
            </ListItemButton>
          </Link>
        </ListItem>
      </List>
      <Divider />
    </Box>
  )

  return (
    <>

      <nav className="px-4 sm:px-8 py-4 bg-transparent backdrop flex justify-between items-center">
        <div>
          <h2 className="text-xl left-8 top-8 font-medium ">
            BOOK-A-DOC
          </h2>
        </div>
        <ul className="hidden sm:flex items-center">
          <li className="pr-5">
            <a href='/#header'>Home</a>
          </li>
          <li className="pr-5">
            <a href='/#services'>Services</a>
          </li>
          <li className="pr-5">
            <a href='/#about'>About</a>
          </li>
          <li className="pr-5">
            <a href='/#contact'>Contact</a>
          </li>
          {
            user 
            ?
            <Link to='/profile'><Button variant="contained">Profile</Button></Link>
            :
            <div>
              <Link to='/login'className="!mr-4"><Button variant="contained">Sign in</Button></Link>
              <Link to='/register'><Button variant="contained">Sign up</Button></Link>
            </div>
          }
          
        </ul>
        
        <span className="material-icons cursor-pointer sm:hidden" onClick={() => toggleDrawer(true)}>menu</span>
      </nav>

      <Drawer
        anchor='right'
        open={toggle}
        onClose={() => toggleDrawer(false)}
      >
        {list}
      </Drawer>
      {/* <div className="flex fixed bg-transparent backdrop  lg:hidden">
        <div>
          <h2 className="text-xl z-50  left-8 top-8 font-medium  ">
            BOOK-A-DOC
          </h2>
        </div>
        <div onClick={handleClick} className="  right-8 top-8 z-50  ">
          {toggle ? (
            <HambergerMenu color="#000" />
          ) : (
            <CloseCircle color="#000" />
          )}
        </div>
      </div>
      <nav
        className={`${
          toggle ? "hidden lg:flex" : "flex"
        } fixed h-[100vh] bg-transparent backdrop-blur-lg  z-30 w-full  items-center justify-center flex-col lg:px-8 lg:flex-row lg:justify-between lg:items-center lg:h-16 lg:border-b-[1px]  lg:border-b-white-300  `}
      >
        <h2 className=" hidden text-xl absolute left-8 top-8 font-medium  lg:static lg:block lg:text-2xl ">
          BOOK-A-DOC
        </h2>
        <ul className=" bg-transparent flex  flex-col  items-center  lg:justify-center  lg:flex-row lg:h-16 lg:w-64">
          <li className=" text-2xl font-medium py-8  lg:mx-16  lg:py-0 lg:font-normal lg:text-sm">
            <a href="/#header"> Home</a>
          </li>
          <li className=" text-2xl font-medium py-8  lg:mx-16 lg:font-normal lg:py-0 lg:text-sm">
            <a href="/#services"> Services</a>
          </li>
          <li className=" text-2xl font-medium py-8 lg:mx-16 lg:font-normal lg:py-0 lg:text-sm">
            <a href="/#about"> About</a>
          </li>
          <li className="text-2xl font-medium py-8 lg:mx-16 lg:font-normal lg:py-0 lg:text-sm">
            <a href="/#contact"> Contact</a>
          </li>
        </ul>
        <div className=" flex flex-col  lg:flex-row ">
          <Link to="/login">
            <button className="bg-hint px-4 py-2 border-2 border-hint rounded-3xl text-primary ">
              Sign in
            </button>
          </Link>
          <Link to="/register">
            <button className="bg-transparent px-4 py-2 border-2 border-hint my-4 rounded-3xl lg:my-0 lg:mx-2">
              Sign up
            </button>
          </Link>
        </div>
      </nav> */}
    </>
  );
}
