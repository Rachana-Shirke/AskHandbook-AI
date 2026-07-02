import { useState, useRef, useEffect } from "react";
import {
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
  Avatar,
  Card,
  CardContent,
  Divider
} from "@mui/material";

import SmartToyIcon from "@mui/icons-material/SmartToy";
import PersonIcon from "@mui/icons-material/Person";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { askQuestion } from "../services/chatApi";

export default function ChatBox() {

  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendQuestion = async () => {

    if (!question.trim()) return;

    const userQuestion = question;

    setMessages(prev => [
      ...prev,
      {
        type: "user",
        text: userQuestion
      }
    ]);

    setQuestion("");

    setLoading(true);

    try {

      const result = await askQuestion(userQuestion);

      setMessages(prev => [
        ...prev,
        {
          type: "ai",
          text: result.answer,
          sources: result.sources || []
        }
      ]);

    } catch (err) {

      setMessages(prev => [
        ...prev,
        {
          type: "ai",
          text: "Something went wrong."
        }
      ]);

    }

    setLoading(false);

  };

  return (

    <Paper
      elevation={3}
      sx={{
        p:3,
        borderRadius:3,
        height:650,
        display:"flex",
        flexDirection:"column"
      }}
    >

      <Typography
        variant="h5"
        fontWeight="bold"
      >
        💬 Handbook AI
      </Typography>

      <Divider sx={{ my:2 }}/>

      <Box
        sx={{
          flex:1,
          overflowY:"auto",
          pr:1
        }}
      >

        {

          messages.map((msg,index)=>(

            <Box
              key={index}
              sx={{
                display:"flex",
                mb:2,
                justifyContent:
                  msg.type==="user"
                  ? "flex-end"
                  : "flex-start"
              }}
            >

              {

                msg.type==="ai" &&

                <Avatar sx={{mr:1,bgcolor:"#1976d2"}}>

                  <SmartToyIcon/>

                </Avatar>

              }

              <Card
                sx={{
                  maxWidth:"75%",
                  bgcolor:
                    msg.type==="user"
                    ? "#1976d2"
                    : "#f5f5f5",
                  color:
                    msg.type==="user"
                    ? "white"
                    : "black",
                  borderRadius:3
                }}
              >

                <CardContent>

                  <Typography>

                    {msg.text}

                  </Typography>

                  {

                    msg.sources &&
                    msg.sources.length>0 &&

                    <Box mt={2}>

                      <Typography
                        fontWeight="bold"
                      >

                        Sources

                      </Typography>

                      {

                        msg.sources.map((s,i)=>(

                          <Typography
                            key={i}
                            variant="body2"
                          >

                            📄 {s.source} (Page {s.page})

                          </Typography>

                        ))

                      }

                    </Box>

                  }

                </CardContent>

              </Card>

              {

                msg.type==="user" &&

                <Avatar sx={{ml:1,bgcolor:"#43a047"}}>

                  <PersonIcon/>

                </Avatar>

              }

            </Box>

          ))

        }

        {

          loading &&

          <Box
            display="flex"
            alignItems="center"
          >

            <Avatar sx={{mr:2,bgcolor:"#1976d2"}}>

              <SmartToyIcon/>

            </Avatar>

            <CircularProgress size={22}/>

            <Typography ml={2}>

              AI is thinking...

            </Typography>

          </Box>

        }

        <div ref={bottomRef}></div>

      </Box>

      <Divider sx={{my:2}}/>

      <Box
        display="flex"
        gap={2}
      >

        <TextField
          fullWidth
          placeholder="Ask anything from the handbook..."
          value={question}
          onChange={(e)=>setQuestion(e.target.value)}
          onKeyDown={(e)=>{

            if(e.key==="Enter")
              sendQuestion();

          }}
        />

        <Button
          variant="contained"
          onClick={sendQuestion}
          disabled={loading}
        >

          Send

        </Button>

      </Box>

    </Paper>

  );

}