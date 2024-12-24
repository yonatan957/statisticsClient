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
    <Box className="ltr-box" sx={{ height: "100vh", gap: 5, maxWidth: "100%", margin: "100px auto", padding: 2, display: "flex", flexDirection: "column", alignItems: "center" }}> 
      <SearchBar setSearchText={setSearchText}></SearchBar> 
      <Box sx={{ width: "200%", zIndex: 999, height: "50vh", boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)" }}> 
        <OpenLayersMapV2 mode={mode} markers={data.filter((event) => event.latitude && event.longitude).map((event) => ({ location: [event.longitude as number, event.latitude as number], info: event }))} setEvent={setEvent}></OpenLayersMapV2> 
      </Box> 
      {event && (<Box sx={{ width: "100%", position: "absolute", top: "75%", left: "50%", transform: "translate(-50%, -50%)" }}>{event && <EventCard event={event}></EventCard>}</Box>)} 
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}> 
        <Alert onClose={() => setOpenSnackbar(false)} severity="warning" sx={{ width: "100%" }}>{SnackbarMessage}</Alert> 
      </Snackbar> 
      {data.length > 0 && (<Box sx={{ width: "100%" }}><Stack className="ltr-box" spacing={2}><Typography>Page: {page}</Typography><Pagination page={page} onChange={(_, page) => setPage(page)} count={100} color="primary" /></Stack></Box>)} 
    </Box> 
  ); 
}
