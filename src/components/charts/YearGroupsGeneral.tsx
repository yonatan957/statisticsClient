import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useState } from "react";
import GroupYears from "./GroupYears";
import { Box, Divider } from "@mui/material";
import YearGroups from "./YearGroups";

export default function YearGroupsGeneral() {
  const [isByYears, setIsByYears] = useState<boolean>(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsByYears(event.target.value === "true");
  };

  return (
    <Box>
      <Box
        sx={{
          width: "100vh",
          display: "flex",
          justifyContent: "right",
          padding: 2,
        }}
      >
        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">
            אנה בחר
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={isByYears ? "true" : "false"}
            onChange={handleChange}
          >
            <FormControlLabel
              value="true"
              control={<Radio />}
              label="קבוצות חזקות לפי שנה"
            />
            <FormControlLabel
              value="false"
              control={<Radio />}
              label="סדר שנים של קבוצה מסויימת"
            />
          </RadioGroup>
        </FormControl>
      </Box>

      <Divider
        sx={{
          marginY: 2,
          borderColor: "gray",
          borderWidth: 1,
          borderStyle: "solid",
        }}
      />

      {isByYears ? <YearGroups /> : <GroupYears />}
    </Box>
  );
}
