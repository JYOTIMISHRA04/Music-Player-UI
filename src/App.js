import { Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import React, { useState } from 'react';
import Logo from './components/Logo';
import NowPlaying from './components/NowPlaying';
import Profile from './components/Profile';
import SideBar from './components/SideBar';
import data from './data.json';

function App() {
  const [currentSong, setCurrentSong] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const songs = data.data;

  const handleSongSelect = (song) => {
    setCurrentSong(song);
    const index = songs.findIndex(s => s.id === song.id);
    setCurrentIndex(index);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % songs.length);
    setCurrentSong(songs[(currentIndex + 1) % songs.length]);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + songs.length) % songs.length);
    setCurrentSong(songs[(currentIndex - 1 + songs.length) % songs.length]);
  };

  const gradient = currentSong?.accent ? {
    backgroundImage: `linear-gradient(to left, ${currentSong?.accent || "#0e0e0e"}2c 0%, 
  ${currentSong?.accent || "#0e0e0e"}4e 50%, ${currentSong?.accent || "#0e0e0e"} 100%)`
  } : {}

  return (
    <Box className="container-box default" style={gradient}>
      <Grid container columns={16} style={{ height: '100%' }} >
        <Grid item size={{ xs: 2 }} style={{ height: "100%" }}>
          <Box p={2} className="sidebarContainer">
            <Logo />
            <Profile />
          </Box>

        </Grid>
        <Grid item size={{ xs: 5 }}>
          <Box p={4}>
            <SideBar songs={data.data}
              onSongSelect={handleSongSelect}
              currentSong={currentSong}
            />
          </Box>

        </Grid>
        <Grid item size={{ xs: 9 }} style={{ height: "100%" }}>
          <Box className="nowPlaying-container" mt={10}>
            {currentSong &&
              <NowPlaying
                song={currentSong}
                onNext={handleNext}
                onPrevious={handlePrevious}
              />}
          </Box>

        </Grid>
      </Grid>
    </Box>

  );
}


export default App;
