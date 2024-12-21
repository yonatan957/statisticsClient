import { Box } from '@mui/material'
import { NavLink } from 'react-router-dom'
import ShortcutIcon from '@mui/icons-material/Shortcut';

export default function NavBar() {
  return (
    <Box className='navBar' sx={{backgroundColor: 'primary.main'}}>
        <NavLink to='/'><ShortcutIcon /></NavLink>
    </Box>
  )
}
