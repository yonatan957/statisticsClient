import { Box, Typography, Button, Container, Grid, Card, CardContent, CardMedia, Snackbar, Paper } from '@mui/material';
import { styled } from '@mui/system';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const CustomCard = styled(Card)({
  maxWidth: 345,
  marginBottom: '1rem',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s ease',
  width: '100vh',
  '&:hover': {
    transform: 'scale(1.05)',
  },
});

const Home = () => {
  const [open, setOpen] = useState(false);
  const handleCopy = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      setOpen(true);
    });
  };

  const handleCloseSnackbar = () => {
    setOpen(false);
  };
  return (
    <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh', padding: 4, marginTop: '64px',marginBottom: '50px' }}>
      <Container>
        <Box sx={{ marginBottom: 4 }}>
          <Typography variant="h3" gutterBottom>
          היסטוגרף
          </Typography>
          <Typography variant="body1" paragraph>
            האתר מציע מבט מעמיק על היסטוריית הפיגועים בעולם במהלך חמישה עשורים. אנחנו מציגים נתונים
            סטטיסטיים חשובים ומבצעים ניתוחים מעמיקים שמאפשרים להבין את המגמות וההשלכות של הפיגועים לאורך
            השנים.
          </Typography>
          <Typography variant="body1" paragraph>
            הנתונים באתר נאספים ממקורות אמינים ונבדקים לעיתים קרובות על מנת להבטיח את נכונותם.
          </Typography>
        </Box>

        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} md={4}>
          <NavLink style={{ textDecoration: 'none' }} to="/yearCharts">
            <CustomCard>
              <CardMedia
                component="img"
                alt="פיגועים במהלך השנים"
                height="300"
                image= '../../public/weapons.webp'
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  פיגועים במהלך השנים
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  הצגת נתונים לגבי מספר הפיגועים בעולם במהלך השנים האחרונות.
                </Typography>
              </CardContent>
            </CustomCard>
            </NavLink>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <NavLink style={{ textDecoration: 'none' }} to="/attackTypes">
            <CustomCard>
              <CardMedia
                component="img"
                alt="מגמות ניתוח"
                height="300"
                image='../../public/bludyDiaGram.webp'
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  מגמות ניתוח
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ניתוח מגמות וסטטיסטיקות מתוך הפיגועים, כולל סוגי הפיגועים.
                </Typography>
              </CardContent>
            </CustomCard>
            </NavLink>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
          <NavLink style={{ textDecoration: 'none' }} to="/countryAttacks">
              <CustomCard>
                  <CardMedia
                    component="img"
                    alt="מגמות ברחבי העולם"
                    height="300"
                    image='../../public/6b31379d-ce60-4331-b56a-bb4fa347c565.webp'
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      מגמות ברחבי העולם                    
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    סטטיסטיקות פיגועים לפי מיקומים בעולם: ניתוח גלובלי והשפעות אזוריות                    </Typography>
                  </CardContent>
                </CustomCard>
            </NavLink>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
          <NavLink style={{ textDecoration: 'none' }} to="/yearGroups">
            <CustomCard>
              <CardMedia
                component="img"
                height="300"
                image= '../../public/yearGroups.webp'
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  פעילות ארגוני טרור לאורך השנים
                 </Typography>
                <Typography variant="body2" color="text.secondary">
                  הצגת נתונים לגבי מספר הפיגועים של קבוצות בעולם במהלך השנים האחרונות.
                </Typography>
              </CardContent>
            </CustomCard>
            </NavLink>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
          <NavLink style={{ textDecoration: 'none' }} to="/countryGroups">
            <CustomCard>
              <CardMedia
                component="img"
                height="300"
                image= '../../public/countryGroupMap.webp'
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                ארגוני הטרור הקטלניים ביותר
                 </Typography>
                <Typography variant="body2" color="text.secondary">
                  הצגת נתונים לגבי מספר ההרוגים ופצועים של קבוצות במדינות ספציפיות במהלך השנים האחרונות.
                </Typography>
              </CardContent>
            </CustomCard>
            </NavLink>
          </Grid>
        </Grid>

        <Paper sx={{ marginTop: 4, marginBottom: 4, padding: '16px', borderRadius: '8px', boxShadow: 3, '&:hover': { boxShadow: 6 } }}>
          <Typography variant="h4" gutterBottom>
            סטטיסטיקות חשובות
          </Typography>
          <ul style={{ padding: '0 20px' }}>
            <li>
              <Typography variant="body1" paragraph>
                בין השנים 1970 ל-2017 התרחשו בעולם למעלה מ-180,000 תקיפות טרור מתועדות, המשקפות את העלייה המשמעותית בפעילות הטרור הגלובלית לאורך התקופה הזו.
              </Typography>
            </li>
            <li>
              <Typography variant="body1" paragraph>
                <strong>דאע"ש: מעל 69,000 נפגעים</strong><span>&nbsp;</span>המדינה האסלאמית בעיראק ובלבנט (<strong>דאע"ש</strong>) אחראית ל-69,595 נפגעים, בהם 38,923 הרוגים ו-30,672 פצועים. מדובר בארגון הטרור הקטלני ביותר בעולם.
              </Typography>
            </li>
            <li>
              <Typography variant="body1" paragraph>
                <strong>2014: שנה עם מספר נפגעים גבוה ביותר</strong><span>&nbsp;</span>בשנת 2014 נרשם מספר חסר תקדים של 85,618 נפגעים, כולל הרוגים ופצועים, מה שממקם את השנה הזו כקטלנית ביותר מבחינת תוצאות אלימות. נתון זה משקף את עוצמת הטרור והסכסוכים האלימים ברחבי העולם באותה תקופה.
              </Typography>
            </li>
            <li>
              <Typography variant="body1" paragraph>
                <strong>עיראק: המדינה עם הכי הרבה הרוגים</strong><span>&nbsp;</span>בעיראק נרשם מספר חסר תקדים של 12,345 הרוגים, מה שהופך אותה למדינה עם הכי הרבה הרוגים בעקבות סכסוכים ואלימות באזור. נתון זה משקף את ההשלכות הקשות של הסכסוכים המתמשכים והשפעתם על האוכלוסייה המקומית.
              </Typography>
            </li>
          </ul>
      </Paper>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6" paragraph>
            שתפו את האתר עם חברים או משפחה כדי להעלות את המודעות לנושא.
          </Typography>
          <Button variant="contained" color="primary" size="large" onClick={handleCopy}>
            שתף
          </Button>
        </Box>
        <Snackbar
          open={open}
          autoHideDuration={3000}
          message="הקישור הועתק!"
          onClose={handleCloseSnackbar}
      />
        <Box sx={{ textAlign: 'center', marginTop: 4 }}>
          <Typography variant="body2" color="text.secondary">
            האתר פותח על ידי צוות של חוקרים ואנשי מקצוע בתחום הביטחון.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
