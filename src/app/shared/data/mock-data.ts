import { ITodo } from 'src/app/todo/models/todo.interface';

export const categories = ['House', 'Entertainment', 'Bills', 'Learning', 'Mind Care', 'Body Care', 'Next Week', 'Others'];
export const mockTodoItems: ITodo[] = [
  {
    label: 'Kitchen Cleanup',
    description: 'I have to clean the kitchen',
    category: 'Mind Care',
    done: false,
    created: new Date(),
    id: 1,
  },
  {
    label: 'Taxes',
    description: 'Need to do taxes next week',
    category: 'Body Care',
    done: '2022-02-02T09:28:03.573Z',
    created: new Date(),
    id: 3,
  },
];
