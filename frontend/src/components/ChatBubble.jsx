import {
  Avatar,
  Box,
  Card,
  CardContent,
  Typography
} from "@mui/material";

import SmartToyIcon from "@mui/icons-material/SmartToy";
import PersonIcon from "@mui/icons-material/Person";

export default function ChatBubble({ message }) {

  const isUser = message.type === "user";

  return (

    <Box
      sx={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        mb: 2
      }}
    >

      {!isUser && (
        <Avatar sx={{ mr: 1, bgcolor: "#1976d2" }}>
          <SmartToyIcon />
        </Avatar>
      )}

      <Card
        sx={{
          maxWidth: "70%",
          bgcolor: isUser ? "#1976d2" : "#f5f5f5",
          color: isUser ? "white" : "black",
          borderRadius: 3
        }}
      >
        <CardContent>

          <Typography>

            {message.text}

          </Typography>

        </CardContent>

      </Card>

      {isUser && (
        <Avatar sx={{ ml: 1, bgcolor: "#43a047" }}>
          <PersonIcon />
        </Avatar>
      )}

    </Box>

  );

}