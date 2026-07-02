import {
    Box,
    Typography
} from "@mui/material";

export default function Footer(){

    return(

        <Box
            sx={{
                mt:5,
                textAlign:"center"
            }}
        >

            <Typography
                variant="body2"
                color="text.secondary"
            >

                © 2026 HandbookIQ

            </Typography>

        </Box>

    );

}