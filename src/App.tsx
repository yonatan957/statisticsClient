import { Route,BrowserRouter, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import { Box, createTheme, CssBaseline, Switch, ThemeProvider } from '@mui/material';
import { useState } from 'react';
import Footer from './components/Footer';

function App() {
  const label = { inputProps: { 'aria-label': 'Switch demo' } };

  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const theme = createTheme({
    palette: {
      primary: {
        main: mode === 'light' ?  'rgb(124, 236, 236)' : 'rgb(113, 182, 182)',
        light: '#2196f3',
        dark: '#1565c0',
      },
      secondary: {
        main: mode === 'light' ?  'rgb(93, 165, 165)' : 'rgb(23, 83, 83)',
        light: '#2196f3',
        dark: '#1565c0',
      },
      warning: {
        main: '#ff9800',
      },
      success: {
        main: 'rgb(17, 185, 101)',
      },
      background: {
        default: mode === 'light' ?  'rgb(215, 252, 252)' : 'rgb(78, 102, 102)',
        paper:  mode === 'light' ?  'rgb(188, 248, 248)' : 'rgb(56, 138, 138)',
      },
      text: {
        primary: mode === 'light' ?  'rgb(84, 94, 94)' : 'rgb(0, 0, 0)',
        secondary: mode === 'light' ?  'rgb(126, 146, 146)' : 'rgb(27, 27, 27)',
        disabled: 'rgb(229, 255, 0)',
      },
      error: {
        main: '#d32f2f',
      },
      mode: mode as "light" | "dark",
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontSize: '2rem',
        fontWeight: 500,
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.5,
      }
    },
    spacing: 8,
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    }
  })
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className='App' sx={{ backgroundColor:"background.default", color: "text.primary "}}>
      <BrowserRouter>
          <NavBar/>
            <Routes>
              <Route path='/' element={<Home/>}/>
            </Routes>
          <Footer setMode={setMode}/>
        </BrowserRouter>
      </Box>
    </ThemeProvider>
  )
}

export default App
