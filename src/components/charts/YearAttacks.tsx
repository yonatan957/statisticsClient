import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { useState } from 'react';
import { TextField, Button, Box, CircularProgress, FormControlLabel, Checkbox, FormGroup, Snackbar, Alert } from '@mui/material';

interface IyearAttacks {
  year: number;
  count: number;
  countKill: number;
  countWound: number;
}

export default function YearAttacks() {
  const [startYear, setStartYear] = useState<number | ''>('');
  const [endYear, setEndYear] = useState<number | ''>('');
  const [data, setData] = useState<IyearAttacks[]>([]);
  const [loading, setLoading] = useState(false);
  const [pieChecked, setPieChecked] = useState(true); // סטטוס של ה-Pie Chart
  const [lineChecked, setLineChecked] = useState(true); // סטטוס של ה-Line Chart
  const [openSnackbar, setOpenSnackbar] = useState(false); // סטטוס של Snackbar (הודעה למשתמש)

  const fetchData = async () => {
    if (startYear && endYear) {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3030/api/analysis/incident-trends?year=${startYear}&endyear=${endYear}`);
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

    // אם לא הוזנה שנה אחרונה, נשלח את השנה הראשונה כשנה אחרונה
    if (!endYear) {
      setEndYear(startYear);
    }

    if (!startYear) {
      // אם לא הוזנה שנה התחלה, מציגים את ההודעה
      setOpenSnackbar(true);
    } else {
      setData([]);
      fetchData();
    }
  };

  const pieData = data.map(item => ({
    label: `${item.year}`,
    value: item.count,
  }));

  const lineData = data.map(item => item.count);

  // הגדרת פרמטרים של הגרף בצורה של אובייקטים
  const pieChartConfig = {
    series: [
      {
        innerRadius: 50,  // רדיוס פנימי
        outerRadius: 140, // רדיוס חיצוני
        data: pieData,
      },
    ],
    width: 400,   // גודל רוחב
    height: 300,  // גובה הגרף
    slotProps: {
      legend: { hidden: true },
    },
    cx: '50%',    // מיקום מרכז הגרף
    cy: '50%',    // מיקום מרכז הגרף
  };

  const lineChartConfig = {
    xAxis: [{ data: data.map(item => item.year) }],
    series: [
      {
        data: lineData,
      },
    ],
    width: lineChecked && !pieChecked ? 800 : 400,   // אם רק ה-Line נבחר, יוגדל לרוחב 800
    height: 300,
  };

  return (
    <Box sx={{ maxWidth: '100%', margin: '0 auto', padding: 2 }}>
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
          Fetch Data
        </Button>
      </form>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
          <CircularProgress />
        </Box>
      )}

      {data.length > 0 && (
        <Box sx={{ marginTop: 3 }}>
          {/* אפשרויות בחירה להציג גרפים */}
          <FormGroup sx={{ marginBottom: 3 }}>
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

          {/* הצגת הגרפים */}
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
      )}

      {/* Snackbar להודעה על חוסר בהכנסת שנה התחלה */}
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
