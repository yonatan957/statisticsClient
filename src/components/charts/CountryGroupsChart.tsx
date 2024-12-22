import {Alert,Box, Button, Checkbox, CircularProgress, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select, SelectChangeEvent, Snackbar,TextField,Typography,} from "@mui/material";
import { BarChart, PieChart } from "@mui/x-charts";
import React, { useEffect, useState } from "react";
  
interface ICountries{
    gname: string;
    count: number
}

export default function CountryGroups() {
    const [countries, setCountries] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedCountry, setSelectedCountry] = useState<string>("");
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [groupLimit, setGroupLimit] = useState<number>(0);
    const [pieChecked, setPieChecked] = useState(true);
    const [barChecked, setBarChecked] = useState(true);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [data, setData] = useState<ICountries[]>([]);
    const barData = data.map((item) => item.count);
    const barLabels = data.map((item) => item.gname);
    const handleChange = (event: SelectChangeEvent<string>) => {
      setSelectedCountry(event.target.value);
    };
  
    const handleSearchTermChange = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      setSearchTerm(event.target.value);
    };
  
    const fetchData = async () => {
      if (selectedCountry) {
        setLoading(true);
        try {
          const response = await fetch(
            `${
              import.meta.env.VITE_BASE_URL
            }/api/relationships/top-groups?country=${selectedCountry}&limit=${groupLimit}`
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
      if (!selectedCountry) {
        setOpenSnackbar(true);
      } else {
        setData([]);
        fetchData();
      }
    };
    const fetchCountries = async (searchTerm: string) => {
      setLoading(true);
      setSelectedCountry("");
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}`
        );
        const data = await response.json();
        const filteredGroups = searchTerm
          ? data.filter((country: string) =>
              country.toLowerCase().startsWith(searchTerm.toLowerCase())
            )
          : data;
        setCountries(filteredGroups);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    const pieData = data.map((item) => ({
      label: `${item.gname}`,
      value: item.count,
    }));
    useEffect(() => {
      fetchCountries(searchTerm);
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
  
    return (
      <Box sx={{ maxWidth: "100%", margin: "0 auto", padding: 2 }}>
        <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h3" gutterBottom>
            סטטיסטיקות קבוצות לפי מדינה
        </Typography>
        <Typography variant="body1" paragraph>
            בדף זה מוצגים נתונים חשובים על קבוצות הפועלות במדינות שונות וההשפעה שלהן על הרוגים
            ופצועים בכל העולם. בחרו מדינה מתוך הרשימה כדי לקבל תובנות ברורות ומעמיקות 
            על הקבוצות הפועלות בה לאורך השנים.
        </Typography>
        </Box> 
  
        <Box sx={{ marginBottom: 4 }}>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            בחרו מדינה מתוך הרשימה ולאחר מכן לחצו על "הצג נתונים".
          </Typography>
        </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>

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
              label="Search Country"
              variant="outlined"
              fullWidth
              value={searchTerm}
              onChange={handleSearchTermChange}
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">country</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedCountry}
                label="Country"
                onChange={handleChange}
              >
                {countries.map((country) => {
                  return (
                    <MenuItem key={country} value={country}>
                      {country}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <TextField
                label="Amount of top groups"
                type="number"
                value={groupLimit || ''}
                onChange={(e) => setGroupLimit(Number(e.target.value))}
                variant="outlined"
                fullWidth
              />
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
                    checked={barChecked}
                    onChange={(e) => setBarChecked(e.target.checked)}
                    color="primary"
                  />
                }
                label="Line Chart"
              />
            </FormGroup>
  
            <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            {pieChecked && (
              <Box
                sx={{
                  width: { xs: "100%", sm: barChecked ? "48%" : "100%" },
                }}
              >
                <PieChart {...pieChartConfig} />
              </Box>
            )}

            {barChecked && (
              <Box
                sx={{
                  width: { xs: "150%", sm: pieChecked ? "48%" : "100%" },
                  display: { sm: "none", md: "block" },
                }}
              >
                <BarChart
                  xAxis={[{ scaleType: "band", data: barLabels }]}
                  series={[{ data: barData }]}
                  width={pieChecked ? 700 : 1400}
                  height={400}
                />
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
