import Navbar from "../components/Navbar";
import UploadCard from "../components/UploadCard";
import ChatBox from "../components/ChatBox";

import { Container, Typography } from "@mui/material";

export default function Home() {

    return (

        <>

            <Navbar />

            <Container sx={{ mt: 5 }}>

                <Typography
                    variant="h3"
                    fontWeight="bold"
                >
                    Ask-the-Handbook Knowledge Helper
                </Typography>

                <Typography sx={{ mt: 2 }}>
                    Upload your company handbook and ask AI questions instantly.
                </Typography>

                <UploadCard />

                <ChatBox />

            </Container>

        </>

    );

}