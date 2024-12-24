import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import { IEvent } from '../updates/Create';

const EventCard = ({ event }: { event: IEvent }) => {
  const fieldLabels = {
    _id: 'ID',
    country_txt: 'Country',
    region_txt: 'Region',
    city: 'City',
    attacktype1_txt: 'Attack Type',
    targtype1_txt: 'Target Type',
    target1: 'Target',
    gname: 'Group Name',
    weaptype1_txt: 'Weapon Type',
    nkill: 'Killed',
    nwound: 'Wounded',
    ransomamt: 'Ransom Amount',
    summary: 'Summary',
    nperps: 'Perpetrators'
  };

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ maxWidth: 345, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' ,direction: 'ltr'}}>
            {event.city ? `${event.city}, ${event.country_txt}` : event.country_txt}
          </Typography>

          <Typography sx={{direction: 'ltr'}} variant="subtitle1" color="textSecondary">
            {event.iyear}-{event.imonth}-{event.iday}
          </Typography>

          <Box sx={{ mt: 2 }}>
            {Object.entries(fieldLabels).map(([field, label]) => {
              if (event[(field as keyof IEvent)] !== null && event[(field as keyof IEvent)] !== undefined && event[(field as keyof IEvent)] !== '') {
                return (
                  <Typography sx={{direction: 'ltr'}} key={field} variant="body2" color="textPrimary">
                    <strong>{label}:</strong> {event[(field as keyof IEvent)]}
                  </Typography>
                );
              }
              return null;
            })}
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};
export default EventCard;