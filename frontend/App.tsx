import {useEffect, useState, useCallback} from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import socket from "./lib/socket";
import {Navbar} from "./Component/Navbar/Navbar";
import {Event} from "../types/event";
import axios from "axios";

export const App = () => {
    const [events, setEvents] = useState<Event[]>([]);

    const handleNewEvent = (data: Event) => {
        setEvents((prevEvents) => [data, ...prevEvents]);
    };

    const fetchEvents = useCallback(async () => {
        try {
            const response = await axios.get('/api/events');
            setEvents(response.data);
        } catch (error) {
            console.error(error);
        }
    }, [])

    useEffect(() => {
        fetchEvents().catch(console.error);
        socket.on('event', handleNewEvent);

        return () => {
            socket.off('event');
        };
    }, [fetchEvents]);

    return (
        <>
            <Navbar/>
            <main>
                <Box sx={{width: '100%', my: 2}}>
                    <Grid container>
                        {events.map((event, index) => (
                            <Grid key={index}>
                                <Box sx={{border: '1px solid #D9D9D9', m: 2}}>
                                    <Typography variant="body1" sx={{mr: 1}} gutterBottom display="inline">
                                        {event.name}
                                    </Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </main>
        </>
    );
};