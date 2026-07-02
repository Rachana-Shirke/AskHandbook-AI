import { useState } from "react";
import {
  Paper,
  Typography,
  Button,
  LinearProgress,
  Alert,
  Box,
  List,
  ListItem,
  ListItemText
} from "@mui/material";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { uploadHandbook } from "../services/uploadApi";

export default function UploadCard() {

  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const uploadFiles = async () => {

    if (files.length === 0) {
      setMessage("Please select one or more PDF files.");
      return;
    }

    setLoading(true);

    try {

      for (const file of files) {
        await uploadHandbook(file);
      }

      setMessage(`${files.length} PDF(s) uploaded successfully.`);

      setFiles([]);

    } catch (err) {

      console.log(err);

      setMessage("Upload failed.");

    }

    setLoading(false);

  };

  return (

    <Paper
      elevation={3}
      sx={{
        p:3,
        borderRadius:3
      }}
    >

      <Typography
        variant="h5"
        fontWeight="bold"
      >
        Upload Handbooks
      </Typography>

      <Typography
        color="text.secondary"
        mt={1}
      >
        Select one or multiple PDF files
      </Typography>

      <Box mt={3}>

        <Button
          component="label"
          variant="outlined"
          startIcon={<CloudUploadIcon />}
          fullWidth
        >

          Choose PDFs

          <input
            hidden
            multiple
            type="file"
            accept=".pdf"
            onChange={(e)=>{

              setFiles(Array.from(e.target.files));

            }}
          />

        </Button>

      </Box>

      {files.length > 0 && (

        <List dense sx={{ mt:2 }}>

          {files.map((file,index)=>(

            <ListItem key={index}>

              <ListItemText
                primary={file.name}
              />

            </ListItem>

          ))}

        </List>

      )}

      {loading && (

        <LinearProgress sx={{ mt:2 }}/>

      )}

      <Button
        variant="contained"
        fullWidth
        sx={{ mt:3 }}
        onClick={uploadFiles}
        disabled={loading}
      >

        Upload {files.length > 0 ? `(${files.length})` : ""}

      </Button>

      {message && (

        <Alert
          sx={{ mt:2 }}
          severity="success"
        >
          {message}
        </Alert>

      )}

    </Paper>

  );

}