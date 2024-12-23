import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { useState } from 'react';
import { TextField, Button, Box, CircularProgress, FormControlLabel, Checkbox, FormGroup, Snackbar, Alert, RadioGroup, Radio, Typography } from '@mui/material';
import { socket } from '../../main';

interface IyearAttacks {
  year: number;
  count: number;
  countKill: number;
  countWound: number;
}

export default function YearAttacks() {
  const [startYear, setStartYear] = useState<number>(0);
  const [endYear, setEndYear] = useState<number>(0);
  const [data, setData] = useState<IyearAttacks[]>([]);
  const [loading, setLoading] = useState(false);
  const [pieChecked, setPieChecked] = useState(true); 
  const [lineChecked, setLineChecked] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [viewMode, setViewMode] = useState<"kill" | "wound"| "attacks">("kill");
  socket.on("eventUpdate", () => fetchData());
  const fetchData = async () => {
    if (startYear && endYear) {
      setLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/analysis/incident-trends?year=${startYear}&endyear=${endYear}`);
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
    if (!endYear) {
      setEndYear(startYear);
    }
    if (!startYear) {
      setOpenSnackbar(true);
    } else {
      setData([]);
      fetchData();
    }
  };

  const pieData = data.map(item => ({
    label: `${item.year}`,
    value: viewMode === "kill" ? item.countKill : viewMode === "wound" ? item.countWound : item.count,
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
    cx: '50%',
    cy: '50%',
  };

  const lineChartConfig = {
    xAxis: [{ data: data.map(item => item.year) }],
    series: [
      {
        data: data.map(item => viewMode === "kill" ? item.countKill : viewMode === "wound" ? item.countWound : item.count),
      },
    ],
    width: lineChecked && !pieChecked ? 800 : 400,
    height: 300,
  };

  return (
    <Box sx={{ maxWidth: '100%', margin: '0 auto', padding: 2 }}>
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h3" gutterBottom>
          תקיפות לפי טווח שנים
        </Typography>
        <Typography variant="body1" paragraph>
          בדף זה תוכלו לבחור טווח שנים, ולקבל מידע על התקיפות שבוצעו בכל שנה
          בטווח הזה. בחרו את שנת ההתחלה ושנת הסיום, ולאחר מכן תוכלו לראות את
          התקיפות שבוצעו בכל שנה בנפרד.
        </Typography>
      </Box>

      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          בחרו את שנת ההתחלה ושנת הסיום, ולאחר מכן לחצו על "הצג תוצאות".
        </Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
          <TextField
            label="Start Year"
            type="number"
            value={startYear || ''}
            onChange={(e) => setStartYear(Number(e.target.value))}
            variant="outlined"
            fullWidth
          />
          <TextField
            label="End Year"
            type="number"
            value={endYear || ''}
            onChange={(e) => setEndYear(Number(e.target.value))}
            variant="outlined"
            fullWidth
          />
        </Box>
        <Button type="submit" variant="contained" color="primary" fullWidth>
        הצג תוצאות
        </Button>
      </form>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
          <CircularProgress />
        </Box>
      )}

      {data.length > 0 && 
        <Box sx={{ marginTop: 3 }}>
          <Box sx={{ marginTop: 4 }}>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              בחרו את הגרפים שברצונכם לראות
            </Typography>
          </Box>
          <FormGroup sx={{
              marginBottom: 3,
              display: { xs: "none", sm: "block" },
            }}>
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
            <Box sx={{ marginTop: 4 }}>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                בחרו את סוג הנתונים שברצונכם לראות              
              </Typography>
            </Box>
          <RadioGroup 
              row value={viewMode}
              onChange={(e) => setViewMode(e.target.value as "kill" | "wound")}
              sx={{ marginBottom: 3 }}
            >
            <FormControlLabel
              value="kill"
              control={<Radio />}
              label="הרוגים"
            />
            <FormControlLabel
              value="wound"
              control={<Radio />}
              label="פצועים"
            />
            <FormControlLabel
              value="count"
              control={<Radio />}
              label="תקריות"
            />
          </RadioGroup>

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            {pieChecked && (
              <Box sx={{ width: '48%' }}>
                <PieChart {...pieChartConfig} />
              </Box>
            )}
            {lineChecked && (
              <Box sx={{ width: pieChecked ? '48%' : '100%' }}>
                <LineChart {...lineChartConfig} />
              </Box>
            )}
          </Box>
        </Box>
      }

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="warning" sx={{ width: '100%' }}>
          Please enter a start year.
        </Alert>
      </Snackbar>
    </Box>
  );
}
