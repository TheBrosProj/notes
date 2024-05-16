/**
 * Summarize content using llms
 * from youtube video, article or a document
 * might be implemented to release
 * but in beta right now
 */

import React, { useState } from "react";
import {
    Box,
    Button,
    Center,
    Text,
    Textarea,
} from "@chakra-ui/react";

const Summarizer: React.FC = () => {
    const [input, setInput] = useState<string>("");
    const [summary, setSummary] = useState<string | null>(null);

    const handleSummarize = async (text: string ) => {
        const response = await fetch("/api/ai/summarize", {
            method: "POST",
            body: JSON.stringify({"text": text}),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        setSummary(data.text);
    }

    const handleSubmit = async () => {

        await handleSummarize(input);
    };

    return (
        <>
            <Center>
                <Box
                    p="2"
                    m="2"
                    w={'3xl'}
                    h={'xs'}
                    border="1px solid gray"
                    borderRadius="md"
                    boxShadow='lg'
                    overflowY="auto"
                >
                    <Center>
                        <Textarea
                            mt={12}
                            w={'md'}
                            h={'36'}
                            placeholder="Add content to summarize"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
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
