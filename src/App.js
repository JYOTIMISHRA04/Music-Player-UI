import React, { useState } from 'react';
import Grid from '@mui/material/Grid2';
import SideBar from './components/SideBar';
import Logo from './components/Logo';
import NowPlaying from './components/NowPlaying';
import data from './data.json';
import Profile from './components/Profile'
import { Box } from '@mui/material';

function App() {
  const [currentSong, setCurrentSong] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const songs = data.data;

  const handleSongSelect = (song) => {
    setCurrentSong(song);
    // Find the index of the selected song
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

  return (
    <Box style={{
      position: "absolute",
      bottom: 0,
      top: 0,
      left: 0,
      right: 0,
      margin: 0,
      height: '100vh',
      overflow: 'hidden',
      backgroundImage: `linear-gradient(to left, ${currentSong?.accent}2c 0%, 
    ${currentSong?.accent}4e 50%, ${currentSong?.accent} 100%)`
    }}>
      <Grid container columns={16} style={{ height: '100%' }} >
        <Grid item size={{ xs: 2 }} style={{ height: "100%" }}>
          <Box p={2}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '90%'
            }}>
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
          <Box mt={10} style={{ display: 'flex', justifyContent: 'center', width: "100%", height: "100%" }}>
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
