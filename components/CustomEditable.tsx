import React from 'react';
import {
    Box,
    Flex,
    Editable,
    IconButton,
    EditablePreview,
    EditableInput,
} from "@chakra-ui/react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface CustomEditableProps {
    content: string;
    handleDelete: () => void;
}

const CustomEditable: React.FC<CustomEditableProps> = ({ content, handleDelete }) => {
    return (
        <Flex key={content} align="center" m="2" justify="space-between">
            <Editable fontSize='md' defaultValue={content} isTruncated>
                <EditablePreview />
                <EditableInput />
            </Editable>
            <Flex>
                <IconButton
                    aria-label="Delete todo"
                    icon={<FontAwesomeIcon icon={faTrash} />}
                    ml="2"
                    onClick={() => handleDelete()}
                />
            </Flex>
        </Flex>
    );
}

export default CustomEditable;
