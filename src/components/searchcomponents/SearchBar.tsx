import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import SearchIcon from '@mui/icons-material/Search';
import { OutlinedInput } from '@mui/material';
import { useState } from 'react';

interface props{
  setSearchText: (text: string) => void,
}
export default function SearchBar({setSearchText}:props, ) {
  const[type, setType] = useState('');
  const handleSearch = async() => {
    setSearchText(type);
  }
  return (
    <Box  className="ltr-box"  sx={{ display: 'flex', flexWrap: 'wrap' }}>
      <div>
        <FormControl variant="outlined">
          <InputLabel htmlFor="outlined-adornment-search">Search</InputLabel>
          <OutlinedInput
            sx={{ direction: 'ltr' }}
            id="outlined-adornment-search"
            value={type}
            onChange={(e) => setType(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="search"
                  onClick={handleSearch}
                  edge="end"
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }
            label="Search"
          />
        </FormControl>
      </div>
    </Box>
  );
}