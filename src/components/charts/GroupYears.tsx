import {
  Alert,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { LineChart, PieChart } from "@mui/x-charts";
import React, { useEffect, useState } from "react";
import { socket } from "../../main";

interface IgroupYears {
  year: number;
  count: number;
}
export default function GroupYears() {
  const [groups, setGroups] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedGroup, setSelectedGroup] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [pieChecked, setPieChecked] = useState(true);
  const [lineChecked, setLineChecked] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [data, setData] = useState<IgroupYears[]>([]);
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
          }/api/relationships/groups-by-year?groupName=${selectedGroup}`
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
  const pieData = data.map((item) => ({
    label: `${item.year}`,
    value: item.count,
  }));
  useEffect(() => {
    fetchGroups(searchTerm);
  }, [searchTerm]);
  const pieChartConfig = {
    series: [
      {
        innerRadius: 50,
        outerRadius: 140,
        data: pieData,
      },
    ],
    width: 400,
    height: 300,
    slotProps: {
      legend: { hidden: true },
    },
    cx: "50%",
    cy: "50%",
  };

  const lineChartConfig = {
    xAxis: [{ data: data.map((item) => item.year) }],
    series: [
      {
        data: data.map((item) => item.count),
      },
    ],
    width: lineChecked && !pieChecked ? 800 : 400,
    height: 300,
  };
  return (
    <Box sx={{ maxWidth: "100%", margin: "0 auto", padding: 2 }}>
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h3" gutterBottom>
          סטטיסטיקות שנים לפי קבוצה
        </Typography>
        <Typography variant="body1" paragraph>
          בדף זה מוצגים נתונים חשובים לגבי סוגי התקפות וההשפעה שלהם על הרוגים
          ופצועים בכל העולם. הקלידו את שם הקבוצה ובחרו מתוך הרשימה כדי לקבל
          תובנות ברורות ומעמיקות על הנתונים שלה לאורך השנים.
        </Typography>
      </Box>

      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          בחרו קבוצה מתוך הרשימה ולאחר מכן לחצו על "הצג נתונים".
        </Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 0.5,
            justifyContent: "space-between",
            marginBottom: 1,
          }}
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
        </Box>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          הצג נתונים
        </Button>
      </form>

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
          <CircularProgress sx={{ color: "primary.main" }} />
        </Box>
      )}
      {data.length > 0 && (
        <Box sx={{ marginTop: 3 }}>
          <Box sx={{ marginTop: 4 }}>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              בחרו את הגרפים שברצונכם לראות
            </Typography>
          </Box>
          <FormGroup
            sx={{
              marginBottom: 3,
              display: { xs: "none", sm: "block" },
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={pieChecked}
                  onChange={(e) => setPieChecked(e.target.checked)}
                  color="primary"
                />
              }
              label="Pie Chart"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={lineChecked}
                  onChange={(e) => setLineChecked(e.target.checked)}
                  color="primary"
                />
              }
              label="Line Chart"
            />
          </FormGroup>

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            {pieChecked && (
              <Box sx={{ width: "48%" }}>
                <PieChart {...pieChartConfig} />
              </Box>
            )}
            {lineChecked && (
              <Box sx={{ width: pieChecked ? "48%" : "100%" }}>
                <LineChart {...lineChartConfig} />
              </Box>
            )}
          </Box>
        </Box>
      )}

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
          Please enter a start year.
        </Alert>
      </Snackbar>
    </Box>
  );
}
