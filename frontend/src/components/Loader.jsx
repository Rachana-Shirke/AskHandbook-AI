import {
    Box,
    CircularProgress,
    Typography
} from "@mui/material";

export default function Loader(){

    return(

        <Box
            sx={{
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
                mt:3
            }}
        >

            <CircularProgress/>

            <Typography ml={2}>

                AI is thinking...

            </Typography>

        </Box>

    );

}