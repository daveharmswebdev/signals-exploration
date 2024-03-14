import { ITodoListItem } from './ITodo';

export interface PagedTodoList {
  items: ITodoListItem[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}
