import {  Box,  Checkbox,  FormControlLabel,  FormGroup,  Typography,} from "@mui/material";
import { BarChart, PieChart } from "@mui/x-charts";
import {useState } from "react";

interface ICountries {
  gname: string;
  count: number;
}

interface props {
  data: ICountries[];
  mode: "light" | "dark";
}
export default function CountryGroupsChart({ data }: props) {
  const [pieChecked, setPieChecked] = useState(true);
  const [barChecked, setBarChecked] = useState(true);
  const barData = data.map((item) => item.count);
  const barLabels = data.map((item) => item.gname);
  const pieData = data.map((item) => ({
    label: `${item.gname}`,
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
    </Box>
  );
}
