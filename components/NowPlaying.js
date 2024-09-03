import React, { useRef, useState, useEffect } from 'react';
import { Card, CardContent, Typography, IconButton, Box, CardMedia } from '@mui/material';
import Slider from '@mui/material/Slider';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import FastForwardIcon from '@mui/icons-material/FastForward';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';


const NowPlaying = ({ song, onNext, onPrevious }) => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [paused, setPaused] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);


    useEffect(() => {
        if (song && isPlaying) {
            audioRef.current.play();
        }
    }, [song, isPlaying]);


    useEffect(() => {
        const audio = audioRef.current;
        console.log(audio.duration)

        if (audio) {
            const updateTime = () => setCurrentTime(audio.currentTime);
            const updateDuration = () => setDuration(audio.duration);

            audio.addEventListener('timeupdate', updateTime);
            audio.addEventListener('loadedmetadata', updateDuration);

            return () => {
                audio.removeEventListener('timeupdate', updateTime);
                audio.removeEventListener('loadedmetadata', updateDuration);
            };
        }
    }, [song]);

    const handlePlay = () => {
        audioRef.current.play();
        setIsPlaying(true);
    };

    const handlePause = () => {
        audioRef.current.pause();
        setIsPlaying(false);
    };

    const handleSliderChange = (event, newValue) => {
        audioRef.current.currentTime = newValue;
        setCurrentTime(newValue);
    };
    console.log(duration)

    return (
        song && (
            <Card style={{
                background: 'transparent', color: 'white',
                width: "55%"
            }}>
                <CardContent>
                    <Typography variant="h5" style={{ fontWeight: 'bold' }}>
                        {song.name}
                    </Typography>
                    <Typography variant="subtitle1" style={{ fontWeight: 'lighter', color: 'grey' }}>
                        {song.artist}
                    </Typography>

                    <CardMedia
                        component="img"
                        image={`https://cms.samespace.com/assets/${song.cover}`}
                        alt={`${song.name} cover`}
                        style={{
                            marginTop: '20px',
                            height: '480px',
                            objectFit: 'cover',
                            borderRadius: '7px',
                            position: 'center',
                            repeat: 'no-repeat',
                            overflow: 'hidden'
                        }}
                    />
                    <Slider
                        style={{ margin: '10px 0px' }}
                        aria-label="time-indicator"
                        value={currentTime}
                        min={0}
                        max={duration}
                        onChange={handleSliderChange}
                        valueLabelDisplay='off'

                        sx={{
                            color: 'white',
                            height: 7,
                            '& .MuiSlider-thumb': {
                                backgroundColor: 'white',
                                border: '2px solid #fff',
                                width: 0,
                                height: 0,
                            },
                            '& .MuiSlider-track': {
                                backgroundColor: 'white',
                            },
                            '& .MuiSlider-rail': {
                                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                            }
                        }}
                    />
                    <Box display="flex" alignItems="center" justifyContent="space-between" px={1}>
                        <IconButton style={{ color: 'white', background: 'rgba(255, 255, 255, 0.09)' }}>
                            <MoreHorizIcon />
                        </IconButton>
                        <Box display="flex" alignItems="center" justifyContent="center" >
                            <IconButton aria-label="previous song" style={{ color: 'white' }} onClick={onPrevious}>
                                <FastRewindIcon fontSize="large" />
                            </IconButton>
                            <IconButton
                                aria-label={paused ? 'play' : 'pause'}
                                onClick={() => setPaused(!paused)}
                            >
                                {paused ? (
                                    <PlayCircleIcon sx={{ fontSize: '3rem', color: 'white' }} onClick={handlePlay} />
                                ) : (
                                    <PauseCircleIcon sx={{ fontSize: '3rem', color: 'white' }} onClick={handlePause} />
                                )}
                            </IconButton>
                            <IconButton aria-label="next song" style={{ color: 'white' }} onClick={onNext}>
                                <FastForwardIcon fontSize="large" />
                            </IconButton>
                        </Box>
                        <IconButton style={{ color: 'white', background: 'rgba(255, 255, 255, 0.09)' }}>
                            <VolumeUpIcon />
                        </IconButton>
                    </Box>
                    <audio ref={audioRef} src={`${song.url}`} preload='metadata' />
                </CardContent>
            </Card>
        )
    );
};

export default NowPlaying;
