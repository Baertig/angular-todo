export type ToDoState = "Pending" | "Completed";

export interface ToDo {
    id: number;
    title: string;
    description: string;
    state: ToDoState;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}

let NEXT_ID = 1;

export class ToDo implements ToDo {
    id: number;
    title: string;
    description: string;
    state: ToDoState;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;

    constructor(title: string) {
        this.id = NEXT_ID++;
        this.title = title;
        this.state = "Pending";
        this.description = "";
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.deletedAt = null;
    }
}