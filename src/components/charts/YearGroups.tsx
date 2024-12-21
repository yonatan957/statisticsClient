import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useState } from "react";
import {
  TextField,
  Button,
  Box,
  CircularProgress,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Snackbar,
  Alert,
  Typography,
} from "@mui/material";
import { BarChart } from "@mui/x-charts";

interface IyearGroups {
  gname: string;
  count: number;
}

export default function YearGroups() {
  const [year, setStartYear] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0);
  const [data, setData] = useState<IyearGroups[]>([]);
  const [loading, setLoading] = useState(false);
  const [pieChecked, setPieChecked] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [barChecked, setBarChecked] = useState(true);
  const barData = data.map((item) => item.count);
  const barLabels = data.map((item) => item.gname);
  const fetchData = async () => {
    if (year) {
      setLoading(true);
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_BASE_URL
          }/api/relationships/groups-by-year?year=${year}${
            amount ? `&amount=${amount}` : ""
          }`
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
    if (!year) {
      setOpenSnackbar(true);
    } else {
      setData([]);
      fetchData();
    }
  };

  const pieData = data.map((item) => ({
    label: item.gname,
    value: item.count,
  }));

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
          ארגונים חזקים לפי שנה
        </Typography>
        <Typography variant="body1" paragraph>
          בדף זה תוכלו לבחור שנה ומספר של ארגונים, ולקבל את הארגונים החזקים
          ביותר לפי הכמות שלהם בשנה שבחרתם. בחרו שנה מהרשימה ולאחר מכן קבעו את
          מספר הארגונים שברצונכם לראות.
        </Typography>
      </Box>

      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          בחרו שנה , הגדירו את מספר הארגונים שברצונכם לראות ולאחר מכן לחצו על
          "הצג את הארגונים".
        </Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 2,
            gap: 1,
          }}
        >
          <TextField
            label="Year"
            type="number"
            value={year || ""}
            onChange={(e) => setStartYear(Number(e.target.value))}
            fullWidth
          />
          <TextField
            label="Amount of groups"
            type="number"
            value={amount || ""}
            onChange={(e) => setAmount(Number(e.target.value))}
            fullWidth
          />
        </Box>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          הצג את הארגונים
        </Button>
      </form>

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
          <CircularProgress />
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
              label="Bar Chart"
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
