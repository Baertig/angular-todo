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