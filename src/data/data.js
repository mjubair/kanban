export default {
  colors: ['#61bd4f', '#f2d600', '#ff9f1a', '#eb5a46', '#c377e0'],
  columns: [
    {
      id: 1,
      name: 'To Do',
      description: 'This is my first column',
      color: '#61bd4f',
      tasks: [
        {
          id: 1,
          name: 'Task 1',
          description: 'Description 1',
          order: 1,
        },
        {
          id: 2,
          name: 'Task 2',
          description: 'Description 2',
          order: 3,
        },
        {
          id: 3,
          name: 'Task 3',
          description: 'Description 3',
          order: 2,
        },
      ],
    },
    {
      id: 2,
      name: 'Doing',
      description: 'This is my second column',
      color: '#f2d600',
      tasks: [
        {
          id: 4,
          name: 'Task 4',
          description: 'Description 4',
          order: 1,
        },
        {
          id: 5,
          name: 'Task 5',
          description: 'Description 5',
          order: 2,
        },
        {
          id: 6,
          name: 'Task 6',
          description: 'Description 6',
          order: 3,
        },
      ],
    },
    {
      id: 3,
      name: 'Done',
      description: 'This is my third column',
      color: '#ff9f1a',
      tasks: [
        {
          id: 7,
          name: 'Task 7',
          description: 'Description 7',
          order: 3,
        },
        {
          id: 8,
          name: 'Task 8',
          description: 'Description 8',
          order: 2,
        },
        {
          id: 9,
          name: 'Task 9',
          description: 'Description 9',
          order: 1,
        },
      ],
    },
  ],
};
