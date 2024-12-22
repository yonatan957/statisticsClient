import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useEffect, useState } from "react";
import { Alert, Box, Button, CircularProgress, Divider, InputLabel, MenuItem, Select, SelectChangeEvent, Snackbar, TextField, Typography } from "@mui/material";
import CountryGroups from "./maps/CountryGroupsMap";
import CountryGroupsChart from "./charts/CountryGroupsChart";

interface props{
    mode: "light" | "dark";
  }
interface ICountries {
    gname: string;
    count: number;
  }
  
export default function CountryGroupsGeneral({mode}:props) {
  const [bymap, setbymap] = useState<boolean>(true);
  const [countries, setCountries] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [groupLimit, setGroupLimit] = useState<number>(0);
  const [data, setData] = useState<ICountries[]>([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [countryName, setCountryName] = useState('');
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setbymap(event.target.value === "true");
  };
  const handleChange2 = (event: SelectChangeEvent<string>) => {
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
        setData(data.groups);
        setLatitude(data.latitude);
        setLongitude(data.longitude);
        setCountryName(data.country);
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
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}`);
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
    useEffect(() => {
      fetchCountries(searchTerm);
    }, [searchTerm]);
  return (
    <Box>
      <Box
        sx={{
          width: "100vh",
          display: "flex",
          justifyContent: "right",
          padding: 2,
        }}
      >
        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">
            אנה בחר
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={bymap ? "true" : "false"}
            onChange={handleChange}
          >
            <FormControlLabel
              value="true"
              control={<Radio />}
              label="במפה"
            />
            <FormControlLabel
              value="false"
              control={<Radio />}
              label="בגרף"
            />
          </RadioGroup>
        </FormControl>
      </Box>

      <Divider
        sx={{
          marginY: 2,
          borderColor: "gray",
          borderWidth: 1,
          borderStyle: "solid",
        }}
      />


     <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h3" gutterBottom>
          סטטיסטיקות קבוצות לפי מדינה
        </Typography>
        <Typography variant="body1" paragraph>
          בדף זה מוצגים נתונים חשובים על קבוצות הפועלות במדינות שונות וההשפעה
          שלהן על הרוגים ופצועים בכל העולם. בחרו מדינה מתוך הרשימה כדי לקבל
          תובנות ברורות ומעמיקות על הקבוצות הפועלות בה לאורך השנים.
        </Typography>
      </Box>

      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          בחרו מדינה מתוך הרשימה ולאחר מכן לחצו על "הצג נתונים".
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 2,
        }}
      ></Box>
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
              onChange={handleChange2}
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
            value={groupLimit || ""}
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
      {bymap ? <Box sx={{ marginTop: 4 , width: "100%", display: "flex", justifyContent: "center" }}><CountryGroups longitude={longitude} latitude={latitude} countryName={countryName} data={data} mode={mode} /> </Box>: <CountryGroupsChart data={data} mode={mode} />}
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
          Please enter a country.
        </Alert>
      </Snackbar>
    </Box>
  );
}
