import { useState } from 'react';
import { TextField, Button, Alert, Box, Snackbar } from '@mui/material';

export default function Delete() {
  const [eventId, setEventId] = useState('');
  const [message, setMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleDelete = async () => {
    if (!eventId.trim()) {
        setMessage('הכנס ID של אירוע!');
        setOpenSnackbar(true);
        return
    }
    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/events/${eventId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
            setMessage('האירוע נמחק בהצלחה!');
            setOpenSnackbar(true);
        } else {
          throw new Error(`${(await response.json()).error}`);
        }
      } catch (error) {
        setMessage((error as Error).message);
        setOpenSnackbar(true);
      }
  };

  return (
    <Box sx={{height:"70vh",
        display:"flex"
    }}>
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: 400,
        margin: 'auto',
        padding: 2,
        borderRadius: 1,
        boxShadow: 3,
        backgroundColor: 'background.paper'
      }}
    >
      <h2>מחק אירוע</h2>
      <TextField
        label="ID של אירוע"
        variant="outlined"
        value={eventId}
        onChange={(e) => setEventId(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleDelete}
        sx={{ marginBottom: 2 }}
      >
        שלח למחיקה
      </Button>   
      </Box>
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
        {message}
        </Alert>
      </Snackbar> 
    </Box>
    
  );
}
