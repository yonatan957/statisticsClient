import React from "react";
import { Box } from "@mui/material";
import errorImage from "../../public/error.jpg";

const FullPageImage: React.FC = () => {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundImage: `url(${errorImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
    </Box>
  );
};

export default FullPageImage;
