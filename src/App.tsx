import { Route, BrowserRouter, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import { useNavigate } from 'react-router-dom';
import {
  Box,
  CssBaseline,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  ThemeProvider,
} from "@mui/material";
import { useState } from "react";
import Footer from "./components/Footer";
import YearAttacks from "./components/charts/YearAttacks";
import AttackType from "./components/charts/AttackType";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import YearGroups from "./components/charts/YearGroupsGeneral";
import BasicMap from "./components/maps/CountryAttacks";
import { createAppTheme } from "./theme";
import CountryGroupsGeneral from "./components/CountryGroupsGeneral";
import Create from "./components/updates/Create";
import Error from "./components/Error";

function App() {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const theme = createAppTheme(mode);
  const navigate = useNavigate();
  const actions = [
    { icon: <AddIcon />, name: "create", link: "/create" },
    { icon: <DeleteIcon />, name: "delete", link: "/delete" },
    { icon: <CreateIcon />, name: "update", link: "/update" },
  ];
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        className="App"
        sx={{ backgroundColor: "background.default", color: "text.primary " }}
      >
          <NavBar />
          <Routes>
            <Route path="/" element={<Home mode={mode} />} />
            <Route path="/yearCharts" element={<YearAttacks />} />
            <Route path="/attackTypes" element={<AttackType />} />
            <Route path="/yearGroups" element={<YearGroups />}></Route>
            <Route path="/countryAttacks" element={<BasicMap mode={mode} />} ></Route>
            <Route path="/CountryGroups" element={<CountryGroupsGeneral mode={mode} />}></Route>
            <Route path="/update" element={<Create mode={mode} isEdit={true}/>}></Route>
            <Route path="/create" element={<Create mode={mode} isEdit={false}/>}></Route>
            <Route path="/*" element={<Error/>}></Route>
          </Routes>
          <SpeedDial
            ariaLabel="SpeedDial basic example"
            sx={{ position: "fixed", bottom: 16, right: 16 }}
            icon={<SpeedDialIcon />}
          >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={() => navigate(action.link)}
              />
            ))}
          </SpeedDial>
          <Footer setMode={setMode} />
      </Box>
    </ThemeProvider>
  );
}

export default App;
