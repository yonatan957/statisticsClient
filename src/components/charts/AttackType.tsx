import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { useState, useEffect } from "react";
import {Box, CircularProgress, FormControlLabel, Checkbox, FormGroup, Typography, RadioGroup, Radio,} from "@mui/material";
import { socket } from "../../main";

interface IAttackType {
  attacktype1_txt: string;
  countKill: number;
  countWound: number;
}

export default function AttackTypeStats() {
  const [data, setData] = useState<IAttackType[]>([]);
  const [loading, setLoading] = useState(false);
  const [pieChecked, setPieChecked] = useState(true);
  const [barChecked, setBarChecked] = useState(true);
  const [viewMode, setViewMode] = useState<"kill" | "wound">("kill");
  socket.on("eventUpdate", () => fetchInitialData());
  useEffect(() => {
    fetchInitialData();
  }, []);
  const fetchInitialData = async () => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/analysis/deadliest-attack-types`
        );
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }
  const barData = data.map((item) =>
    viewMode === "kill" ? item.countKill : item.countWound
  );
  const barLabels = data.map((item) => item.attacktype1_txt);

  const pieChartData = data.map((item) => ({
    label: item.attacktype1_txt,
    value: viewMode === "kill" ? item.countKill : item.countWound,
  }));

  const pieChartConfig = {
    series: [
      {
        innerRadius: 50,
        outerRadius: 140,
        data: pieChartData,
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
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
          <CircularProgress />
        </Box>
      )}
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h3" gutterBottom>
          סטטיסטיקות סוגי התקפות
        </Typography>
        <Typography variant="body1" paragraph>
          בדף זה מוצגים נתונים חשובים לגבי סוגי התקפות וההשפעה שלהם על הרוגים
          ופצועים בכל העולם. בחרו את סוג המידע שברצונכם לראות כדי לקבל תובנות
          ברורות ומעמיקות.
        </Typography>
      </Box>

      {data.length > 0 && (
        <Box sx={{ marginTop: 3 }}>
          <FormGroup sx={{marginBottom: 3, display: { xs: "none", sm: "block" },}}>
            <FormControlLabel control={
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

          <RadioGroup row value={viewMode}
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
          </RadioGroup>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            { pieChecked && <Box
              sx={{
                width: { xs: "100%", sm: barChecked ? "48%" : "100%" },
              }}
            >
              <PieChart {...pieChartConfig} />
            </Box>}

            {barChecked && (
              <Box
                sx={{
                  width: { xs: "100%", sm: pieChecked ? "48%" : "100%" },
                  display: { xs: "none", sm: "block" },
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
    </Box>
  );
}
