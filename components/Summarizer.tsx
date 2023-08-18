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
    const [apikey, setApikey] = useState<string | null>(null);
    const [word, setWord] = useState<number>(100);
    const [showTooltip, setShowTooltip] = useState<boolean>(false);

    const handleSubmit = async () => {
        if (!apikey) {
            return;
        }
        const openai = new OpenAI({
            apiKey: apikey,
        });

        const chatCompletion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo-16k",
            messages: [{ role: "system", content: `You are a helpful assistant that summarizes transcript in around ${word} words .` }, { role: "user", content: input }],
        });

        const generatedSummary = chatCompletion.choices[0].message.content;

        setSummary(generatedSummary);
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
                    <InputGroup
                        p={'4'} marginBottom={'2'}
                    >
                        <Input
                            placeholder="Add OpenAI API key"
                            value={apikey || ''}
                            onChange={(e) => setApikey(e.target.value)}
                        />
                    </InputGroup>
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
