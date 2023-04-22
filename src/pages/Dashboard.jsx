import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { endpoint } from '../utils/endpoints'
import { useUserContext } from "../context/userContext";
import { toast } from "react-toastify";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';


const Dashboard = ({ children }) => {
  
  const { setUserHandler } = useUserContext();
  const navigate = useNavigate()

  const logout = async () =>{
    
    const res = await fetch(`${endpoint}/logout`, {credentials: 'include'})
    const result = await res.json()
    if(result.success){
      toast.success("Logout Successful")
      setUserHandler(null)
      return navigate('/')
    }else{
      return toast.error("An error occurred!")
    }
  }

  const [open, setOpen] = useState(false)

  const toggleDrawer = (val) =>{
    setOpen(val)
  }

  const list = (
    <Box
      sx={{width: 250 }}
      role="presentation"
      onClick={() => toggleDrawer(false)}
    >
      <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AccountCircleIcon /> 
              </ListItemIcon>
              <ListItemText primary='Profile' />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon /> 
              </ListItemIcon>
              <ListItemText primary='Book Appointment' />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding onClick={logout}>
            <ListItemButton>
              <ListItemIcon>
                <LogoutIcon /> 
              </ListItemIcon>
              <ListItemText primary='Logout' />
            </ListItemButton>
          </ListItem>
      </List>
      <Divider />
    </Box>
  )

  return (
    <>
    <section className="bg-midWhite min-h-[100vh]">
      <nav className="flex justify-between items-center py-4 px-8">
        <div><Link to='/' className="text-xl">BOOK A DOC</Link></div>
        <div className='hidden sm:block'>
          <Link to='/profile'>Profile</Link>
          <Link to='/book-appointment' className="ml-5">Book Appointment</Link>
          <Button variant="contained" onClick={logout} className="!ml-5 cursor-pointer" size="medium">Logout</Button>
        </div>
        <span className="material-icons sm:hidden cursor-pointer" onClick={() => toggleDrawer(true)}>menu</span>
      </nav>

      <div className="px-8">
        {children}
      </div>
    </section>
    <Drawer
            anchor='right'
            open={open}
            onClose={() =>toggleDrawer(false)}
          >
            {list}
        </Drawer>
    </>
  )
}

export default Dashboard