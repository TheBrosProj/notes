export interface Todo {
    id: number;
    details: string;
    state: "active" | "completed";
    time: number;
}

export type Note = {
    id: number;
    details: string;
    src: string | null;
};