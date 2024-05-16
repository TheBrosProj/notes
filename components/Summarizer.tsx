/**
 * Summarize content using llms
 * from youtube video, article or a document
 * might be implemented to release
 * but in bet right now
 */

import React, { useState } from "react";
import {
    Box,
    Button,
    Center,
    Input,
    InputGroup,
    Slider,
    SliderFilledTrack,
    SliderMark,
    SliderThumb,
    SliderTrack,
    Text,
    Textarea,
    Tooltip,
} from "@chakra-ui/react";
import OpenAI from "openai";

const Summarizer: React.FC = () => {
    const [input, setInput] = useState<string>("");
    const [summary, setSummary] = useState<string | null>(null);
    const [word, setWord] = useState<number>(100);
    const [showTooltip, setShowTooltip] = useState<boolean>(false);

    const handleSummarize = async (text: string, word: number) => {
        const response = await fetch("/api/ai/summarize", {
            method: "POST",
            body: JSON.stringify({ text: text, word: Number }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        setSummary(data.text);
    }

    const handleSubmit = async () => {

        await handleSummarize(input, word);
    };

    return (
        <>
            <Center>
                <Box
                    p="2"
                    m="2"
                    w={'3xl'}
                    h={'sm'}
                    border="1px solid gray"
                    borderRadius="md"
                    boxShadow='lg'
                    overflowY="auto"
                >
                    <Center>
                        <Textarea
                            w={'md'}
                            h={'36'}
                            placeholder="Add content to summarize"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                    </Center>
                    <Center m={4} pt={4}>
                        <Slider
                            w={'md'}
                            defaultValue={100}
                            min={50}
                            max={150}
                            colorScheme='gray'
                            onChange={(v) => setWord(v)}
                            onMouseEnter={() => setShowTooltip(true)}
                            onMouseLeave={() => setShowTooltip(false)}
                        >
                            <SliderMark value={50} mt='1' ml='-2.5' fontSize='sm'>
                                50
                            </SliderMark>
                            <SliderMark value={100} mt='1' ml='-2.5' fontSize='sm'>
                                100
                            </SliderMark>
                            <SliderMark value={150} mt='1' ml='-2.5' fontSize='sm'>
                                150
                            </SliderMark>
                            <SliderTrack>
                                <SliderFilledTrack />
                            </SliderTrack>
                            <Tooltip
                                hasArrow
                                placement='top'
                                isOpen={showTooltip}
                                label={`${word} words`}
                            >
                                <SliderThumb />
                            </Tooltip>
                        </Slider>
                    </Center>
                    <Center mt={12}>
                        <Button onClick={handleSubmit}>Summarize</Button>
                    </Center>
                </Box>
            </Center>
            {summary &&
                <Center>
                    <Box
                        p="2"
                        m="2"
                        w={'3xl'}
                        border="1px solid gray"
                        borderRadius="md"
                        boxShadow='lg'
                        overflowY="auto"
                    >
                        <Text m={'4'}>
                            {summary}
                        </Text>
                    </Box>
                </Center>
            }
        </>
    );
};

export default Summarizer;
