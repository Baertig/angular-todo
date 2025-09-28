export interface ToDo {
    id: number;
    title: string;
    description: string;
    state: ToDoState
    createdAt: Date;
    updatedAt: Date;
}

export type ToDoState = "Pending" | "Completed"