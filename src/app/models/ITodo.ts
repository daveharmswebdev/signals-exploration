import { TodoStatus } from './TodoStatus';

export interface ITodoListItem {
  id: number;
  title: string;
  description: string;
  status: TodoStatus;
  createdAt: Date;
  modifiedAt: Date;
}

export interface ICreateTodoDto {
  title: string;
  description: string;
}
