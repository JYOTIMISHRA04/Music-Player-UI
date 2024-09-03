import SearchIcon from '@mui/icons-material/Search';
import { Avatar, Box, Button, InputAdornment, List, ListItem, ListItemAvatar, ListItemText, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FormatDuration } from './FormatDuration';

const SideBar = ({ onSongSelect, currentSong }) => {
    const [songs, setSongs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('For You');

    useEffect(() => {
        if (!songs.length)
            fetch('https://cms.samespace.com/items/songs')
                .then((response) => response.json())
                .then(async (data) => {
                    const arr = await data.data.map(item => {
                        let au = document.createElement('audio')
                        au.src = item.url
                        au.onloadedmetadata = (e) => {
                            item.duration = au.duration
                        }
                        au.remove()
                        return item
                    })
                    setSongs(arr)
                })
                .catch((error) => console.error('Error fetching songs:', error));
    }, []);

    const filteredSongs = songs.filter((song) => {
        const matchesSearch = song.name.toLowerCase().includes(searchTerm.toLowerCase()) || song.artist.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesTab = activeTab === 'Top Tracks' ? song.top_track : true;
        return matchesSearch && matchesTab;
    });

    return (
        <Box p={2} style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "start" }}>
            <Box width="100%" pb={2}>
                <Button
                    onClick={() => setActiveTab('For You')}
                    style={{
                        textTransform: 'none',
                        fontWeight: 'bold',
                        fontSize: '23px',
                        color: activeTab === 'For You' ? 'white' : 'grey'
                    }}
                >
                    For You
                </Button>
                <Button
                    onClick={() => setActiveTab('Top Tracks')}
                    style={{
                        textTransform: 'none',
                        fontWeight: 'bold',
                        fontSize: '23px',
                        color: activeTab === 'Top Tracks' ? 'white' : 'grey'
                    }}
                >
                    Top Tracks
                </Button>
            </Box>
            <TextField
                variant="outlined"
                placeholder="Search Song, Artist"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.09)', borderRadius: 8, color: 'white', width: '100%' }}
                InputProps={{
                    style: { color: 'white' },
                    endAdornment: (
                        <InputAdornment position="end">
                            <SearchIcon style={{ color: 'white' }} />
                        </InputAdornment>
                    ),
                }}
            />
            <Box pt={2} style={{ height: "100%", width: "100%" }}>
                <List sx={{ width: '100%' }}>
                    {filteredSongs.length && filteredSongs.map((song) => {
                        return (<ListItem className={` ${currentSong?.id === song.id ? "selectedListItem" : "hoverList"}`} onClick={() => onSongSelect(song)} style={{ cursor: "pointer" }}>
                            <ListItemAvatar>
                                <Avatar src={`https://cms.samespace.com/assets/${song.cover}`} variant="rounded"
                                    style={{ borderRadius: '50%' }} />
                            </ListItemAvatar>
                            <ListItemText secondaryTypographyProps={{ style: { color: "gray" } }} primary={song.name} secondary={song.artist} />
                            <Typography variant="body2"
                                style={{ color: "gray", fontSize: '18px' }}
                            >
                                {song.duration ? FormatDuration(song.duration) : null}
                            </Typography>
                        </ListItem>)
                    })}
                </List>
            </Box>
        </Box>
    );
};

export default SideBar;
