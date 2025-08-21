import { useTheme } from "./context/ThemeContext";
import TextField from "@mui/material/TextField";

export default function ThemedTextField(props) {
  const { isDarkMode } = useTheme();

  return (
    <TextField
      {...props}
      sx={{
        "& .MuiOutlinedInput-root": {
          backgroundColor: isDarkMode ? "#2d2d2d" : "#fff",
          color: isDarkMode ? "#fff" : "#000",
        },
        "& .MuiInputLabel-root": {
          color: isDarkMode ? "#ccc" : "#555",
        },
      }}
    />
  );
}
