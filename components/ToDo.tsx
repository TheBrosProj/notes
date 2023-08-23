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
    useToast
} from "@chakra-ui/react";
import { faCheck, faPlus, faRepeat, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "./AuthContext";
import Cookies from 'js-cookie';

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
    const toast = useToast();
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            fetchTodos();
        } else {
            getCookies();
        }
    }, [user]);

    const setCookies = (todoArray: Todo[]) => {
        Cookies.set('todos', JSON.stringify(todoArray));
    };

    const getCookies = () => {
        const CookieTodos: string | undefined = Cookies.get('todos');
        if (CookieTodos) {
            setTodos(JSON.parse(CookieTodos) as Todo[]);
            setIsLoading(false);
        }
    };

    const fetchTodos = async () => {
        try {
            const response = await fetch(`/api/todo/${user.uid}`);

            if (response.ok) {
                const todosData = await response.json();
                setTodos(todosData);
                setCookies(todosData);
            } else {
                handleError();
            }
        } catch (error) {
            handleError();
        } finally {
            setIsLoading(false);
        }
    };

    const handleError = () => {
        toast({
            title: 'Error',
            description: "Could not complete action, try again",
            status: 'error',
            duration: 3000,
            isClosable: true,
        })
    }

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
                handleError();
            }
        } catch (error) {
            handleError();
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
                setCookies([...todos.filter((t) => t.id !== todo.id)]);
            }else{
                handleError();
                getCookies();
            }
        } catch (error) {
            handleError();
            getCookies();
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
                setCookies([...todos.filter(t => t.id !== todo.id), updatedTodo]);
            } else {
                handleError();
                getCookies();
            }
        } catch (error) {
            handleError();
            getCookies();
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
                setCookies([...todos.filter(t => t.id !== todo.id), updatedTodo]);
            } else {
                handleError();
                getCookies();
            }
        } catch (error) {
            handleError();
            getCookies();
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
