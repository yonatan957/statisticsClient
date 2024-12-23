import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFoundPage: React.FC = () => {
    const navigate =useNavigate();
  return (
    <Container
      sx={{
        height: "70vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 400,
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: "#f8f9fa",
        }}
      >
        <Typography variant="h1" color="error">
          404
        </Typography>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          עמוד לא נמצא
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 3 }}>
          אנחנו מצטערים, אך העמוד שביקשת לא נמצא.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={()=>{navigate("/")}}
          sx={{
            padding: "10px 20px",
            fontSize: "16px",
          }}
        >
          חזרה לדף הבית
        </Button>
      </Box>
    </Container>
  );
};

export default NotFoundPage;
