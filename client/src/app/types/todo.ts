export interface ToDo {
    id: number;
    title: string;
    description: string;
    state: ToDoState
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}

export type ToDoState = "Pending" | "Completed"