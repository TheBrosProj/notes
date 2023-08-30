/**
 * Todos : 
 * This is store what you need to do
 * consists of id, details, state, time
 * time is not being used right now
 * but it will be used for notifications
 * and importances in future
 */

import React, { useEffect, useState } from "react";
import {
    Text,
    Box,
    Center,
    Flex,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Skeleton,
    useToast,
    SlideFade
} from "@chakra-ui/react";
import { faCheck, faPlus, faRepeat, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "./AuthContext";
import { getLocal, setLocal } from "@/lib/storage";
import { Todo } from "@/lib/types";


const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [input, setInput] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const toast = useToast();
    const { user } = useAuth();

    useEffect(() => {
        setTodos(JSON.parse(getLocal('todos')) as Todo[]);
        setIsLoading(false);
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
                setLocal('todos', todosData);
            } else {
                handleError("failed to reach database");
            }
        } catch (error) {
            console.log(error);
            handleError("failed to fetch todos");
        } finally {
            setIsLoading(false);
        }
    };

    const handleError = (title?: string, reason?: string) => {
        toast({
            title: title ? title : 'Error',
            description: reason ? reason : 'Could not complete action, try again',
            status: 'error',
            duration: 3000,
            isClosable: true,
        })
    }

    const handleAddTodo = async () => {
        if (user === null) {
            handleError("Log in to use Todo", "you must sign in to store your todos in the database.")
            return;
        }
        if (input) {
            const newTempTodo: Todo = { id: 999999, details: input, state: "active", time: Date.now() };
            setTodos((prev) => { return [...prev, newTempTodo] });
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
                    setTodos((prev) => {
                        setLocal('todos', [...prev.filter((t) => t.id !== newTempTodo.id), newTodo]);
                        return [...prev.filter((t) => t.id !== newTempTodo.id), newTodo];
                    });
                    setInput("");
                } else {
                    handleError("failed to reach database");
                    setTodos(JSON.parse(getLocal('todos')) as Todo[]);
                }
            } catch (error) {
                handleError();
                setTodos(JSON.parse(getLocal('todos')) as Todo[]);

            }
        }
    };

    const handleDelete = async (todo: Todo) => {
        setTodos(prev => [...prev.filter((t) => t.id !== todo.id)]);
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
                setLocal('todos', [...todos.filter((t) => t.id !== todo.id)]);
            } else {
                handleError("failed to reach database");
                setTodos(JSON.parse(getLocal('todos')) as Todo[]);
            }
        } catch (error) {
            handleError();
            setTodos(JSON.parse(getLocal('todos')) as Todo[]);
        }
    };

    const handleCompletion = async (todo: Todo) => {
        const updatedTodo: Todo = { ...todo, state: "completed" };
        setTodos([...todos.filter(t => t.id !== todo.id), updatedTodo]);
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
                setLocal('todos', [...todos.filter(t => t.id !== todo.id), updatedTodo]);
            } else {
                handleError("failed to reach database");
                setTodos(JSON.parse(getLocal('todos')) as Todo[]);
            }
        } catch (error) {
            handleError();
            setTodos(JSON.parse(getLocal('todos')) as Todo[]);
        }
    };

    const handleRevive = async (todo: Todo) => {
        const updatedTodo: Todo = { ...todo, state: "active" };
        setTodos([...todos.filter(t => t.id !== todo.id), updatedTodo]);
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
                setLocal('todos', [...todos.filter(t => t.id !== todo.id), updatedTodo]);
            } else {
                handleError("failed to reach database");
                setTodos(JSON.parse(getLocal('todos')) as Todo[]);
            }
        } catch (error) {
            handleError();
            setTodos(JSON.parse(getLocal('todos')) as Todo[]);
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
                            .filter(todo => todo.state === 'active')
                            .map((todo) => (
                                <SlideFade key={todo.id} in={true}>
                                    <Flex
                                        key={todo.id} align="center" m="2" p="2" justify="space-between"
                                        // border={'1px solid gray'} 
                                        borderRadius={'md'}
                                        boxShadow={'md'}
                                    >
                                        <Text fontWeight={"bold"}>{todo.details}</Text>
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
                                </SlideFade>
                            ))}
                        {todos
                            .filter((t) => t.state === "completed")
                            .map((todo) => (
                                <SlideFade key={todo.id} in={true}>
                                    <Flex
                                        key={todo.id} align="center" m="2" p="2" paddingX="2" justify="space-between"
                                        borderRadius={'md'}
                                        boxShadow={'md'}
                                    >
                                        <Text as="s" fontWeight={"bold"}>{todo.details}</Text>
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
                                    </Flex>
                                </SlideFade>
                            ))}
                    </Box>}
            </Box>
        </Center>
    );
};

export default TodoList;
