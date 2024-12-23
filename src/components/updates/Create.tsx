import { useEffect, useState } from "react";
import { Box, TextField, Button, Typography, Grid, Snackbar, Alert } from "@mui/material";
import OpenLayersMap from "../maps/OpenLayersMap";

export interface IEventFormProps {
  isEdit: boolean;
  mode: "light"| "dark"
}

export interface IEvent{
  eventid: number;
  _id: number;
  iyear: number;
  imonth: number;
  iday: number;
  country_txt: string;
  region_txt: string;
  city?: string;
  latitude?: number;
  longitude?: number;
  attacktype1_txt: string;
  targtype1_txt: string;
  target1?: string;
  gname: string;
  weaptype1_txt: string;
  nkill?: number;
  nwound?: number;
  ransomamt?: number;
  summary?: string;
  nperps?: number;
}

export default function Create({ isEdit, mode }: IEventFormProps) {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [SnackbarMessage, setSnackbarMessage] = useState("");
  const [lat, setLat] = useState(0)
  const [lng, setLng] = useState(0)
  const [changedFields, setChangedFields] = useState<Partial<IEvent>>({
    latitude: lat,
    longitude: lng,
  });

  const [formData, setFormData] = useState<Partial<IEvent>>({
    _id: undefined,
    iyear: undefined,
    imonth: undefined,
    iday: undefined,
    country_txt: "",
    region_txt: "",
    city: "",
    latitude: lat,
    longitude: lng,
    attacktype1_txt: "",
    targtype1_txt: "",
    target1: "",
    gname: "",
    weaptype1_txt: "",
    nkill: undefined,
    nwound: undefined,
    ransomamt: undefined,
    summary: "",
    nperps: undefined,
    eventid: 0
  });
  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      latitude: lat,
      longitude: lng,
    }));
    setChangedFields((prevChangeFields)=>({...prevChangeFields, latitude:lat, longitude:lng}))
  }, [lat, lng]);

  const fields = [
    { label: "Event ID", key: "_id", type: "text", required: !isEdit },
    { label: "Year", key: "iyear", type: "number", required: !isEdit },
    { label: "Month", key: "imonth", type: "number", required: !isEdit },
    { label: "Day", key: "iday", type: "number", required: !isEdit },
    { label: "Country", key: "country_txt", type: "text", required: !isEdit },
    { label: "Region", key: "region_txt", type: "text", required: !isEdit },
    { label: "City", key: "city", type: "text", required: false },
    { label: "Latitude", key: "latitude", type: "number", required: false },
    { label: "Longitude", key: "longitude", type: "number", required: false },
    { label: "Attack Type", key: "attacktype1_txt", type: "text", required: !isEdit },
    { label: "Target Type", key: "targtype1_txt", type: "text", required: !isEdit },
    { label: "Target", key: "target1", type: "text", required: false },
    { label: "Group Name", key: "gname", type: "text", required: !isEdit },
    { label: "Weapon Type", key: "weaptype1_txt", type: "text", required: !isEdit },
    { label: "Number Killed", key: "nkill", type: "number", required: false },
    { label: "Number Wounded", key: "nwound", type: "number", required: false },
    { label: "Ransom Amount", key: "ransomamt", type: "number", required: false },
    { label: "Summary", key: "summary", type: "text", required: false },
    { label: "Number of Perpetrators", key: "nperps", type: "number", required: false },
    { label: "eventid", key: "eventid", type: "number", required: true },
  ];

  const handleChange = (field: keyof IEvent, value: any) => {
    setFormData((prevFormData) => {
      const updatedFormData = { ...prevFormData, [field]: value }; 
      setChangedFields((prevChangedFields) => {
        const updatedChangedFields = { ...prevChangedFields };
          updatedChangedFields[field] = value;        
        for (const key in updatedChangedFields) {
          if ((updatedChangedFields as any)[key] === null || (updatedChangedFields as any)[key] === undefined || (updatedChangedFields as any)[key] === "") {
            delete (updatedChangedFields as any)[key];
          }
        }
        return updatedChangedFields;
      });
      return updatedFormData;
    });
  };
  

  const handleSubmit = () => {
    if (isEdit) {
      if (!formData._id || Object.keys(changedFields).length === 0) {
        setSnackbarMessage("במצב עריכה, יש לספק ID ולשנות לפחות שדה אחד.");
        setOpenSnackbar(true);
        return;
      }
    } else {
      const requiredFields = Object.keys(formData).filter(
        (key) => key !== "_id" && formData[key as keyof IEvent] === undefined
      );
      if (requiredFields.length > 0) {
        setSnackbarMessage("אנא מלא את כל השדות הדרושים.");
        setOpenSnackbar(true);
        return;
      }
    }
      onSubmit(changedFields);
  };

  const onSubmit = async (data: Partial<IEvent>) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/events`, {
        method: isEdit ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setSnackbarMessage(isEdit ? "האירוע עודכן בהצלחה." : "האירוע יוצר בהצלחה.");
        setOpenSnackbar(true);
      } else {
        throw new Error(`${(await response.json()).error}`);
      }
    } catch (error) {
      setSnackbarMessage((error as Error).message);
      setOpenSnackbar(true);
    }
  };

  return (
    <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 600, mx: "auto" }}>
      <Typography variant="h5">
        {isEdit ? "ערוך אירוע" : "צור אירוע חדש"}
      </Typography>
      <Grid container spacing={2}>
        {fields
          .filter((field) => field.key !== "latitude" && field.key !== "longitude" && (isEdit || field.key !== "_id"))
          .map((field) => (
            <Grid item xs={12} sm={6} md={4} key={field.key}>
              <TextField
                label={field.label}
                value={formData[field.key as keyof IEvent] || ""}
                onChange={(e) => handleChange(field.key as keyof IEvent, e.target.value)}
                type={field.type}
                required={field.required}
                fullWidth
              />
            </Grid>
          ))}
      </Grid>
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        {isEdit ? "שמור שינויים" : "צור אירוע"}
      </Button>
      <Box sx={{filter:mode === 'light' ? '' : 'brightness(0.5)', boxShadow:"0px 1px 5px grey",width:"100%", height:"50vh"}}>
        <OpenLayersMap setLat={setLat} setLng={setLng} markers={[{location:[lng, lat],info:[{name:"country", value:""}]}]}>          
        </OpenLayersMap>
      </Box>
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity="warning" sx={{ width: "100%" }}>
          {SnackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}