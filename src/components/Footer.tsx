import { Box, Switch } from "@mui/material";

interface props{
    setMode: (mode: 'light' | 'dark') => void;
}
export default function Footer({ setMode }: props) {
    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    return (
        <Box className="footer" sx={{backgroundColor: 'secondary.main'}}>
            <Switch onChange={(e) => setMode(e.target.checked ? 'light' : 'dark')} {...label} defaultChecked />        
        </Box>
  )
}
