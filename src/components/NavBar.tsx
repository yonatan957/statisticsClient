import { Box } from '@mui/material'
import { NavLink } from 'react-router-dom'

export default function NavBar() {
  return (
    <Box className='navBar' sx={{backgroundColor: 'primary.main'}}>
        <NavLink to='/'>בית</NavLink>
    </Box>
  )
}
