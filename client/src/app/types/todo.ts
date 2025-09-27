export interface ToDo {
    id: number;
    title: string;
    description: string;
    done: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}