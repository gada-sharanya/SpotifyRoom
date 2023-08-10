import React, { useState, useEffect } from "react";
import RoomJoinPage, { RoomJoinPageWithRouter } from "./RoomJoinPage";
import CreateRoomPage, { CreateRoomPageWithRouter } from "./CreateRoomPage";
import { Grid, Typography, Button, ButtonGroup } from '@material-ui/core';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Room from "./Room";

function HomePage() {
    const [roomCode, setRoomCode] = useState(null);

    useEffect(() => {
        fetch('/api/user-in-room')
            .then((response) => response.json())
            .then((data) => {
                setRoomCode(data.code);
            });
    }, []);

    function renderHomePage() {
        return (
            <Grid container spacing={3}>
                <Grid item xs={12} align="center">
                    <Typography variant="h3" component="h3">
                        House Party
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <ButtonGroup disableElevation variant="contained" color="primary">
                        <Button color="primary" component={Link} to="/join">
                            Join A Room
                        </Button>
                        <Button color="secondary" component={Link} to="/create">
                            Create A Room
                        </Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
        );
    };
    
    const clearRoomCode = () =>{
        setRoomCode(null);
    }


    return (
        <Router>
            <Routes>
                <Route path="/" element={roomCode ? <Navigate to={`/room/${roomCode}`} /> : renderHomePage()} />
                <Route path="/join" element={<RoomJoinPageWithRouter />} />
                <Route path="/create" element={<CreateRoomPageWithRouter />} />
                <Route 
                path="/room/:roomCode" 
                element={<Room roomCode={roomCode} leaveRoomCallback={clearRoomCode}/>} 
                />
            </Routes>
        </Router>
    );
}

export default HomePage;
