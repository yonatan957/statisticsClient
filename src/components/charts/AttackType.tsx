import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { useState, useEffect } from "react";
import {
  Box,
  CircularProgress,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Typography,
} from "@mui/material";

interface IAttackType {
  attacktype1_txt: string;
  countKill: number;
  countWound: number;
}

export default function AttackTypeStats() {
  const [data, setData] = useState<IAttackType[]>([]);
  const [loading, setLoading] = useState(false);
  const [pieChecked, setPieChecked] = useState(true); // סטטוס של ה-Pie Chart
  const [barChecked, setBarChecked] = useState(false); // סטטוס של ה-Bar Chart

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "http://localhost:3030/api/analysis/deadliest-attack-types"
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
  }, []);

  const barData = data.map((item) => item.countKill); // כמות הרוגים בלבד עבור ה-BarChart
  const barLabels = data.map((item) => item.attacktype1_txt); // שם סוגי התקפות עבור ה-BarChart

  // המרת נתוני הפאי כך שיתאימו למבנה הנתונים הדרוש לפאי
  const pieChartData = data.map((item) => ({
    label: item.attacktype1_txt,
    value: item.countKill,
  }));

  // עבור פאי, נתון הרוגים לפי סוג התקפה
  const pieChartConfig = {
    series: [
      {
        innerRadius: 50, // רדיוס פנימי
        outerRadius: 140, // רדיוס חיצוני
        data: pieChartData, // הנתונים המותאמים
      },
    ],
    width: 400, // גודל רוחב
    height: 300, // גובה הגרף
    slotProps: {
      legend: { hidden: true },
    },
    cx: "50%", // מיקום מרכז הגרף
    cy: "50%", // מיקום מרכז הגרף
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
          בכל העולם. הנתונים מציגים את סוגי הפיגועים הרבים שהתרחשו במהלך השנים,
          תוך השוואה בין סוגי התקפות שונים, כמו פיצוצים, ירי, והתנקשויות.
        </Typography>
        <Typography variant="body1" paragraph>
          בעזרת גרפים אינטראקטיביים, ניתן לצפות ולהשוות את כמות הרוגי התקפות
          מסוגים שונים.
        </Typography>
        <Typography variant="body1" paragraph>
          הנתונים נאספים ממקורות סטטיסטיים גלובליים ומשקפים את המגוון הרחב של
          סוגי ההתקפות בכל העולם. כל גרף מאפשר לכם לקבל תמונה ברורה של הנתונים,
          ולבצע ניתוחים מעמיקים יותר לגבי המגמות השונות.
        </Typography>
      </Box>

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
                  checked={barChecked}
                  onChange={(e) => setBarChecked(e.target.checked)}
                  color="primary"
                />
              }
              label="Bar Chart"
            />
          </FormGroup>

          {/* הצגת הגרפים */}
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            {pieChecked && (
              <Box sx={{ width: barChecked ? "48%" : "100%" }}>
                <PieChart {...pieChartConfig} />
              </Box>
            )}

            {barChecked && (
              <Box sx={{ width: pieChecked ? "48%" : "100%" }}>
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
