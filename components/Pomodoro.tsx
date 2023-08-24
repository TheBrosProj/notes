import { Box, Button, Center, IconButton, Input, Stack, Text, Tooltip } from '@chakra-ui/react';
import { Slider, SliderTrack, SliderFilledTrack, SliderThumb, SliderMark } from "@chakra-ui/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faStop, faEdit } from '@fortawesome/free-solid-svg-icons';
// import chime from '@/public/chime.wav';
import { useEffect, useState } from 'react';

const PomodoroTimer: React.FC = () => {
    const [duration, setDuration] = useState<number>(25);
    const [timeLeft, setTimeLeft] = useState<number>(duration * 60);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    // const [playing, setPlaying] = useState<boolean>(false);
    const [showTooltip, setShowTooltip] = useState<boolean>(false);
    // const audio = new Audio(chime);

    useEffect(() => {
        if (isRunning) {
            const intervalId = setInterval(() => {
                setTimeLeft((timeLeft) => timeLeft - 1);
            }, 1000);
            return () => clearInterval(intervalId);
        }
    }, [isRunning]);

    // useEffect(() => {
    //     if (timeLeft === 0) {
    //         setIsRunning(false);
    //         if (playing) {
    //             audio.pause();
    //         } else {
    //             audio.loop = true;
    //             audio.play();
    //         }
    //         setPlaying(!playing);
    //     }
    // }, [timeLeft]);

    // const stopAudio = () => {
    //     audio.pause();
    //     audio.currentTime = 0;
    //     setPlaying(false);
    // }

    const handleStart = () => {
        setIsEditing(false)
        setIsRunning(true);
    };

    const handlePause = () => {
        setIsEditing(false)
        setIsRunning(false);
    };

    const handleStop = () => {
        setIsEditing(false)
        setIsRunning(false);
        setTimeLeft(duration * 60);
        // stopAudio();
    };

    const handleEdit = () => {
        if(isEditing){
            setIsEditing(false);
        }
        else{
            setIsEditing(true);
        }
    };

    const handleDurationChange = (value : number) => {
        if (value > 0) {
            setDuration(value);
            setTimeLeft(value * 60);
        }
        setIsRunning(false);
    };

    const formatTime = (time : number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const labelStyles = {
        mt: '4',
        ml: '-1',
        fontSize: 'md',
    }

    return (
        <Center>
            <Box
                p="2"
                m="2"
                w='3xl'
                h='200'
                border="1px solid gray"
                borderRadius="md"
                boxShadow='lg'
            >
                <Center m={'4'}>
                    <Stack direction="row" spacing={4}>
                        <IconButton aria-label='play timer' size={'lg'} onClick={handleStart} icon={<FontAwesomeIcon icon={faPlay} />}>
                            {/* Start */}
                        </IconButton>
                        <IconButton aria-label='pause timer' size={'lg'} onClick={handlePause} icon={<FontAwesomeIcon icon={faPause} />}>
                            {/* Pause */}
                        </IconButton>
                        <IconButton aria-label='stop timer' size={'lg'} onClick={handleStop} icon={<FontAwesomeIcon icon={faStop} />}>
                            {/* Stop */}
                        </IconButton>
                        <IconButton aria-label='edit timer duration' size={'lg'} onClick={handleEdit} icon={<FontAwesomeIcon icon={faEdit} />}>
                            {/* Edit */}
                        </IconButton>
                    </Stack>
                </Center>
                <Center mt={'4'}>
                    {isEditing ? (
                        <Slider colorScheme='gray' marginY={12} marginX={6} aria-label='time-slider'
                            min={10} max={70}
                            value={duration}
                            // onBlurCapture={setIsEditing(false)}
                            onChange={(val:number) => handleDurationChange(val)}
                            onMouseEnter={() => setShowTooltip(true)}
                            onMouseLeave={() => setShowTooltip(false)}
                        >
                            <SliderMark value={20}  {...labelStyles} >20</SliderMark>
                            <SliderMark value={40}  {...labelStyles} >40</SliderMark>
                            <SliderMark value={60}  {...labelStyles} >60</SliderMark>
                            <SliderTrack>
                                <SliderFilledTrack />
                            </SliderTrack>
                            <Tooltip
                                hasArrow
                                bg='gray.600'
                                color='white'
                                placement='top'
                                p={'2'}
                                isOpen={showTooltip}
                                label={`${duration}min`}
                            >
                                <SliderThumb />
                            </Tooltip>
                        </Slider>
                    ) : (
                        <Box textAlign={'left'}>
                            <Text fontSize="6xl" fontWeight={'bold'} mt={1} textAlign={'left'}>
                                {formatTime(timeLeft)}
                            </Text>
                        </Box>
                        // <Text fontSize="xl" mb={4} onClick={handleEdit}>
                        //   Duration: {duration} minutes
                        // </Text>
                    )}
                </Center>
            </Box>
        </Center>
    );
};

export default PomodoroTimer;
