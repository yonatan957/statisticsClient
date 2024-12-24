import { Alert, Box, Pagination, Snackbar, Stack, Typography } from "@mui/material"; 
import SearchBar from "./SearchBar"; 
import { useEffect, useRef, useState } from "react"; 
import EventCard from "./EventCard"; 
import OpenLayersMapV2 from "../maps/OpenLayersMapV2"; 
import { IEvent } from "../../Types/event"; 

interface props { mode: "light" | "dark"; }

export default function SearchGenerl({ mode }: props) { 
  const [searchText, setSearchText] = useState(""); 
  const [event, setEvent] = useState<IEvent | null>(null); 
  const [data, setData] = useState<IEvent[]>([]); 
  const [page, setPage] = useState(1); 
  const [openSnackbar, setOpenSnackbar] = useState(false); 
  const [SnackbarMessage, setSnackbarMessage] = useState(""); 
  const isIntial = useRef(true); 

  const handleSearchClick = async () => { 
    try { 
      if (searchText === "") { 
        setSnackbarMessage("Please enter a search term."); 
        setOpenSnackbar(true); 
        return; 
      } 
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/freeSearch?search=${searchText}&page=${page}`); 
      const data = await response.json(); 
      if (!response.ok) throw new Error(`${data.error}`); 
      setData(data); 
    } catch (error) { 
      setSnackbarMessage((error as Error).message); 
      setOpenSnackbar(true); 
    } 
  }; 

  useEffect(() => { 
    if (isIntial.current) { 
      isIntial.current = false; 
      return; 
    } 
    handleSearchClick(); 
  }, [page, searchText]); 

  return ( 
    <>
    <Box sx={{ marginBottom: 4 ,display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
      <Typography variant="h3" gutterBottom>
        חיפוש חופשי
      </Typography>
      <Typography variant="body1" paragraph>
        בדף זה תוכלו לבצע חיפוש על מאגר המתקפות במאגר לפי תיאור האירוע.
      </Typography>
    </Box>
    <Box>
      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        חפשו על פי טקסט באנגלית בלבד ולאחר מכן לחצו על הנווטן על המפה כדי לראות פרטים על האירוע.
      </Typography>
    </Box>
    <Box className="ltr-box" sx={{ height: "auto", gap: 5,width: "200vh", maxWidth: "100%", margin: "100px auto", padding: 2, display: "flex", flexDirection: "column", alignItems: "center" }}> 
      <SearchBar setSearchText={setSearchText}></SearchBar> 

      <Box sx={{ width: "100%", zIndex: 999, height: "60vh", boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)" }}> 
        <OpenLayersMapV2 mode={mode} markers={data.filter((event) => event.latitude && event.longitude).map((event) => ({ location: [event.longitude as number, event.latitude as number], info: event }))} setEvent={setEvent}></OpenLayersMapV2> 
      </Box> 
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}> 
        <Alert onClose={() => setOpenSnackbar(false)} severity="warning" sx={{ width: "100%" }}>{SnackbarMessage}</Alert> 
      </Snackbar>

      {data.length > 0 && (<Box sx={{gap: 3, width: "100%",display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>       
      <Typography variant="body2" sx={{ color: "text.secondary" }}>בכל דף יש 100 אירועים דפדפו הלאה כדי לראות עוד.</Typography>
      <Stack className="ltr-box" spacing={2}>
        <Typography>Page: {page}</Typography><Pagination page={page} onChange={(_, page) => setPage(page)} count={100} color="primary" />
      </Stack></Box>)} 
      <Box>{event && <EventCard event={event}></EventCard>}</Box>

    </Box> 
    </>
  ); 
}
