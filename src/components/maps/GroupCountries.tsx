import {Alert,Box, Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Snackbar, TextField, Typography,} from "@mui/material";
import React, { useEffect, useState } from "react";
import { socket } from "../../main";
import OpenLayersMap from "./OpenLayersMap";

interface IgroupCountries {
  country: string;
  count:115;
  rate: number;
  lat: number;
  lng: number;
}
interface props{
  mode: "light" | "dark"
}
export default function GroupYears({mode}:props) {
  const [groups, setGroups] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedGroup, setSelectedGroup] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [data, setData] = useState<IgroupCountries[]>([]);
  const [amount, setAmount] = useState<number>(5);
  socket.on("eventUpdate", () => fetchData());
  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedGroup(event.target.value);
  };

  const handleSearchTermChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value);
  };

  const fetchData = async () => {
    if (selectedGroup) {
      setLoading(true);
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_BASE_URL
          }/api/relationships/deadliest-regions?groupName=${selectedGroup}&amount=${amount}`
        );
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGroup) {
      setOpenSnackbar(true);
    } else {
      setData([]);
      fetchData();
    }
  };
  const fetchGroups = async (searchTerm: string) => {
    setLoading(true);
    setSelectedGroup("");
    try {
      if (!searchTerm) {
        setGroups([]);
        return;
      }
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/grouplist`
      );
      const data = await response.json();
      const filteredGroups = searchTerm
        ? data.filter((group: string) =>
            group.toLowerCase().startsWith(searchTerm.toLowerCase())
          )
        : data;
      setGroups(filteredGroups);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchGroups(searchTerm);
  }, [searchTerm]);
  return (
    <Box sx={{ maxWidth: "100%", margin: "0 auto", padding: 2 }}>
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h3" gutterBottom>
          סטטיסטיקות ארגונים לפי מדינה
        </Typography>
        <Typography variant="body1" paragraph>
          בדף זה תוכלו לראות את הכוח של כל ארגון במדינות שונות ברחבי העולם. 
          בחרו ארגון מתוך הרשימה, 
          כדי לקבל תובנות ברורות לגבי האזורים בהם הארגון פעיל ביותר.
        </Typography>
      </Box>
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          בחרו ארגון מתוך הרשימה, קבעו את כמות המדינות בהן תרצו לראות את הנתונים, 
          ולאחר מכן לחצו על "הצג נתונים" כדי לקבל תוצאות.
        </Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{ display: "flex", flexDirection: "column", gap: 0.5, justifyContent: "space-between", marginBottom: 1,}}
        >
          <TextField
            label="Search Group"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Group</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedGroup}
              label="Group"
              onChange={handleChange}
            >
              {groups.map((group) => {
                return (
                  <MenuItem key={group} value={group}>
                    {group}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <TextField
            label="Amount of top countries"
            type="number"
            value={amount || ""}
            onChange={(e) => setAmount(Number(e.target.value))}
            variant="outlined"
            fullWidth
          />
        </Box>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          הצג נתונים
        </Button>
      </form>

      <Box sx={{ marginTop: 4, width: "100%", height: "50vh", boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)" }}>
        <OpenLayersMap markers={data.map((data) => ({ location: [data.lng, data.lat], info: [{name: "Country:", value: `data.country`}, {name: "Count of attacks:", value: `${data.count}`}, {name: "Rate of group:", value: `${data.rate}`}] }))} />
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="warning"
          sx={{ width: "100%" }}
        >
          אנא בחר קבוצה
        </Alert>
      </Snackbar>
    </Box>
  );
}
