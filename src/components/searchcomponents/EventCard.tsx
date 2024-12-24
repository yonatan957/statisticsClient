import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
import { IEvent } from "../../Types/event";

const EventCard = ({ event }: { event: IEvent }) => {
  const fieldLabels = {
    _id: "ID",
    country_txt: "Country",
    region_txt: "Region",
    city: "City",
    attacktype1_txt: "Attack Type",
    targtype1_txt: "Target Type",
    target1: "Target",
    gname: "Group Name",
    weaptype1_txt: "Weapon Type",
    nkill: "Killed",
    nwound: "Wounded",
    ransomamt: "Ransom Amount",
    nperps: "Perpetrators",
  };

  return (
    <Grid item xs={12} sm={12} md={12}>
      <Card sx={{ boxShadow: 3, width: "100%" }}>
        <CardContent>
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: "bold", direction: "ltr", textAlign: "center" }}
          >
            {event.city
              ? `${event.city}, ${event.country_txt}`
              : event.country_txt}
          </Typography>

          <Typography
            sx={{ direction: "ltr", textAlign: "center" }}
            variant="subtitle1"
            color="textSecondary"
          >
            {event.iyear}-{event.imonth}-{event.iday}
          </Typography>

          <Box sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              {Object.entries(fieldLabels).map(([field, label]) => {
                const fieldValue = event[field as keyof IEvent];
                if (
                  fieldValue !== null &&
                  fieldValue !== undefined &&
                  fieldValue !== ""
                ) {
                  return (
                    <Grid item xs={12} sm={6} md={4} key={field}>
                      <Typography variant="body2" color="textSecondary">
                        <strong>{label}:</strong>
                      </Typography>
                      <Typography variant="body1" color="textPrimary">
                        {fieldValue}
                      </Typography>
                    </Grid>
                  );
                }
                return null;
              })}
            </Grid>
            {event.summary && (
              <Box sx={{ mt: 2, borderTop: "1px solid #ccc", pt: 2 }}>
                <Typography variant="h6" color="textSecondary">
                  <strong>Summary:</strong>
                </Typography>
                <Typography variant="body1" color="textPrimary">
                  {event.summary}
                </Typography>
              </Box>
            )}
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default EventCard;
