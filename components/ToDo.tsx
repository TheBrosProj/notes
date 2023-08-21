import React, { useEffect, useState } from "react";
import {
    Text,
    Box,
    Center,
    Editable,
    EditablePreview,
    EditableInput,
    Flex,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Skeleton,
} from "@chakra-ui/react";
import { faCheck, faPlus, faRepeat, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "./AuthContext";

interface Todo {
    id: number;
    details: string;
    state: "active" | "completed";
    time: number;
}

const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [input, setInput] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            fetchTodos();
        }
    }, [user]);

    const fetchTodos = async () => {
        try {
            const response = await fetch(`/api/todo/${user.uid}`);

            if (response.ok) {
                const todosData = await response.json();
                setTodos(todosData);
            } else {
                console.error("Failed to fetch todos");
            }
        } catch (error) {
            console.error("Error fetching todos", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddTodo = async () => {
        try {
            const response = await fetch(`/api/todo/${user.uid}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    details: input,
                    state: "active",
                }),
            });

            if (response.ok) {
                const newTodo = await response.json();
                setTodos([...todos, newTodo]);
                setInput("");
            } else {
                console.error("Failed to add todo");
            }
        } catch (error) {
            console.error("Error adding todo", error);
        }
    };

    const handleDelete = async (todo: Todo) => {
        try {
            const response = await fetch(`/api/todo/${user.uid}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    todo_id: todo.id,
                }),
            });

            if (response.ok) {
                setTodos([...todos.filter((t) => t.id !== todo.id)]);
            } else {
                console.error("Failed to delete todo");
            }
        } catch (error) {
            console.error("Error deleting todo", error);
        }
    };

    const handleCompletion = async (todo: Todo) => {
        try {
            const response = await fetch(`/api/todo/${user.uid}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    todo_id: todo.id,
                    state: "completed",
                }),
            });

            if (response.ok) {
                const updatedTodo: Todo = { ...todo, state: "completed" };
                setTodos([...todos.filter(t => t.id !== todo.id), updatedTodo]);
            } else {
                console.error("Failed to complete todo");
            }
        } catch (error) {
            console.error("Error completing todo", error);
        }
    };

    const handleRevive = async (todo: Todo) => {
        try {
            const response = await fetch(`/api/todo/${user.uid}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    todo_id: todo.id,
                    state: "active",
                }),
            });

            if (response.ok) {
                const updatedTodo: Todo = { ...todo, state: "active" };
                setTodos([...todos.filter(t => t.id !== todo.id), updatedTodo]);
            } else {
                console.error("Failed to revive todo");
            }
        } catch (error) {
            console.error("Error reviving todo", error);
        }
    };
    return (
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
                <InputGroup
                    p={'4'} marginBottom={'2'}
                >
                    <Input
                        placeholder="Enter a new task"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={e => {
                            if (e.key === 'Enter') {
                                handleAddTodo
                            }
                        }}
                        onSubmit={handleAddTodo}
                    />
                    <InputRightElement>
                        <IconButton
                            // size={'sm'}
                            aria-label="Add todo"
                            icon={<FontAwesomeIcon icon={faPlus} />}
                            onClick={handleAddTodo}
                        />
                    </InputRightElement>
                </InputGroup>
                {isLoading ?
                    <>
                        <Skeleton m={'2'} boxShadow={'md'} borderRadius={'2xl'}>
                            <div>please wait while we load todos</div>
                            <div>please wait while we load todos</div>
                        </Skeleton>
                        <Skeleton m={'2'} boxShadow={'md'} borderRadius={'2xl'}>
                            <div>please wait while we load todos</div>
                            <div>please wait while we load todos</div>
                        </Skeleton>
                        <Skeleton m={'2'} boxShadow={'md'} borderRadius={'2xl'}>
                            <div>please wait while we load todos</div>
                            <div>please wait while we load todos</div>
                        </Skeleton>
                    </> :
                    <Box mt="4">
                        {todos
                            .filter(todo => todo["state"] === 'active')
                            .map((todo) => (
                                <Flex
                                    key={todo["id"]} align="center" m="2" p="2" justify="space-between"
                                    // border={'1px solid gray'} 
                                    borderRadius={'md'}
                                    boxShadow={'md'}
                                >
                                    <Editable defaultValue={todo.details} fontWeight={"bold"}>
                                        <EditablePreview />
                                        <EditableInput />
                                    </Editable>
                                    <Flex>
                                        <IconButton
                                            aria-label="Complete todo"
                                            icon={<FontAwesomeIcon icon={faCheck} />}
                                            onClick={() => handleCompletion(todo)}
                                        />
                                        <IconButton
                                            aria-label="Delete todo"
                                            icon={<FontAwesomeIcon icon={faTrash} />}
                                            ml="2"
                                            onClick={() => handleDelete(todo)}
                                        />
                                    </Flex>
                                </Flex>
                            ))}
                        {todos
                            .filter((t) => t["state"] === "completed")
                            .map((todo) => (
                                <Flex
                                    key={todo["id"]} align="center" m="2" p="2" paddingX="2" justify="space-between"
                                    // border={'1px solid gray'} 
                                    borderRadius={'md'}
                                    boxShadow={'md'}
                                >
                                    <Text as="s" fontWeight={"bold"}>{todo["details"]}</Text>
                                    <Flex>
                                        <IconButton
                                            aria-label="Revive todo"
                                            icon={<FontAwesomeIcon icon={faRepeat} />}
                                            onClick={() => handleRevive(todo)}
                                        />
                                        <IconButton
                                            aria-label="Delete todo"
                                            icon={<FontAwesomeIcon icon={faTrash} />}
                                            ml="2"
                                            onClick={() => handleDelete(todo)}
                                        />
                                    </Flex>
                                    {/* <Editable isDisabled defaultValue={todo["data"]} fontWeight={"bold"} >
                                    <EditablePreview />
                                    <EditableInput disabled />
                                </Editable> */}
                                </Flex>
                            ))}
                    </Box>}
            </Box>
        </Center>
    );
};

export default TodoList;
