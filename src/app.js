import sampleData from './data/data.js';

class App {
  constructor(rootSelector) {
    this.root = document.querySelector(rootSelector);
    this.data = localStorage.getItem('data')
      ? JSON.parse(localStorage.getItem('data'))
      : sampleData;
    this.render();
  }

  renderItems(items) {
    let tasks = items
      .sort((a, b) => a.order - b.order)
      .map((item, index) => {
        return `
      <div class="task" draggable="true" data-task-id=${item.id}>
      <div class="task__header">
        <div class="task__icon"><svg aria-hidden="false" focusable="false" aria-label="Draft issue" role="img" class="Octicon-sc-9kayk9-0 jqOtMK" viewBox="0 0 16 16" width="16" height="16" fill="currentColor" style="display: inline-block; user-select: none; vertical-align: text-bottom; overflow: visible;"><path d="M14.307 11.655a.75.75 0 0 1 .165 1.048 8.05 8.05 0 0 1-1.769 1.77.75.75 0 0 1-.883-1.214 6.552 6.552 0 0 0 1.44-1.439.75.75 0 0 1 1.047-.165Zm-2.652-9.962a.75.75 0 0 1 1.048-.165 8.05 8.05 0 0 1 1.77 1.769.75.75 0 0 1-1.214.883 6.552 6.552 0 0 0-1.439-1.44.75.75 0 0 1-.165-1.047ZM6.749.097a8.074 8.074 0 0 1 2.502 0 .75.75 0 1 1-.233 1.482 6.558 6.558 0 0 0-2.036 0A.751.751 0 0 1 6.749.097ZM.955 6.125a.75.75 0 0 1 .624.857 6.558 6.558 0 0 0 0 2.036.75.75 0 1 1-1.482.233 8.074 8.074 0 0 1 0-2.502.75.75 0 0 1 .858-.624Zm14.09 0a.75.75 0 0 1 .858.624c.13.829.13 1.673 0 2.502a.75.75 0 1 1-1.482-.233 6.558 6.558 0 0 0 0-2.036.75.75 0 0 1 .624-.857Zm-8.92 8.92a.75.75 0 0 1 .857-.624 6.558 6.558 0 0 0 2.036 0 .75.75 0 1 1 .233 1.482c-.829.13-1.673.13-2.502 0a.75.75 0 0 1-.624-.858Zm-4.432-3.39a.75.75 0 0 1 1.048.165 6.552 6.552 0 0 0 1.439 1.44.751.751 0 0 1-.883 1.212 8.05 8.05 0 0 1-1.77-1.769.75.75 0 0 1 .166-1.048Zm2.652-9.962A.75.75 0 0 1 4.18 2.74a6.556 6.556 0 0 0-1.44 1.44.751.751 0 0 1-1.212-.883 8.05 8.05 0 0 1 1.769-1.77.75.75 0 0 1 1.048.166Z"></path></svg></div>
        <div class="task_title">Draft</div>
      </div>
      <div class="task__content">${item.name}</div>
    </div>
        `;
      })
      .join('');

    // tasks += `<div class="task task__dropzone" data-task-id=${items.length}></div>`;
    return tasks;
  }

  renderColumns() {
    let columns = this.data
      .map((column) => {
        return `
            <div class="lane" data-col-id=${column.id}>
  <div class="lane__head">
    <div class="lane__header">
    <div class="lane__img">
      
    </div>
    <div class="lane__title">
    ${column.name} <span class="lane__tasks-count">${column.tasks.length}</span>
    </div>
      </div>
      <div class="lane__subtitle">${column.description}</div>
    
  </div>
  <div class="lane__tasks"> ${this.renderItems(column.tasks)}</div>
  <div class="lane__add-tasks" data-col-id=${column.id}>
    <button><span data-component="buttonContent" class="Box-sc-g0xbh4-0 kkrdEu"><span data-component="leadingVisual" class="Box-sc-g0xbh4-0 trpoQ"><svg aria-hidden="true" focusable="false" role="img" class="octicon octicon-plus" viewBox="0 0 16 16" width="16" height="16" fill="currentColor" style="display: inline-block; user-select: none; vertical-align: text-bottom; overflow: visible;"><path d="M7.75 2a.75.75 0 0 1 .75.75V7h4.25a.75.75 0 0 1 0 1.5H8.5v4.25a.75.75 0 0 1-1.5 0V8.5H2.75a.75.75 0 0 1 0-1.5H7V2.75A.75.75 0 0 1 7.75 2Z"></path></svg></span><span data-component="text">Add item</span></button>
  </div>
</div>
        `;
      })
      .join('');

    const lastCol = `
  <div class="lane lane__last">
  <button data-component="IconButton" type="button" aria-label="Add a new column to the board" data-testid="add-new-column-button" data-size="large" data-no-visuals="true" class="types__StyledButton-sc-ws60qy-0 iTETFQ"><svg aria-hidden="true" focusable="false" role="img" class="octicon octicon-plus" viewBox="0 0 16 16" width="16" height="16" fill="currentColor" style="display: inline-block; user-select: none; vertical-align: text-bottom; overflow: visible;"><path d="M7.75 2a.75.75 0 0 1 .75.75V7h4.25a.75.75 0 0 1 0 1.5H8.5v4.25a.75.75 0 0 1-1.5 0V8.5H2.75a.75.75 0 0 1 0-1.5H7V2.75A.75.75 0 0 1 7.75 2Z"></path></svg></button>
  </div>
  `;

    columns += lastCol;

    return columns;
  }

  moveTask(taskId, originColId, destinationColId) {
    const task = this.findAndRemoveTask(taskId, originColId);
    this.data.find((column) => column.id == destinationColId).tasks.push(task);
    localStorage.setItem('data', JSON.stringify(this.data));
  }

  findAndRemoveTask(taskId, columnId) {
    const column = this.data.find((column) => column.id == columnId);
    const task = column.tasks.find((task) => {
      return task.id == parseInt(taskId);
    });
    column.tasks = column.tasks.filter((task) => task.id != taskId);
    // localStorage.setItem('data', JSON.stringify(this.data));
    return task;
  }

  addTask(e) {
    const task = prompt('Enter task name');
    const colId = e.currentTarget.dataset.colId;
    const newTask = {
      id: new Date().getTime(),
      name: task,
      description: 'New Task Description',
    };

    this.data[colId - 1].tasks.push(newTask);
    localStorage.setItem('data', JSON.stringify(this.data));

    this.render();
  }

  render() {
    this.root.innerHTML = this.renderColumns();
    this.addEventListeners();
  }

  addEventListeners() {
    this.root.querySelectorAll('.lane__add-tasks').forEach((el) => {
      el.addEventListener('click', (e) => this.addTask(e));
    });

    this.root.querySelectorAll('.task').forEach((el) => {
      el.draggable = true;
      el.addEventListener('dragstart', (e) => {
        // get the closest parent with the class lane and get the colId from dataset
        const columnId = e.target.closest('.lane').dataset.colId;
        // send the taskId and columnId to the drop event
        e.dataTransfer.setData('taskId', e.target.dataset.taskId);

        e.dataTransfer.setData('colId', columnId);
      });
    });

    this.root.querySelectorAll('.lane').forEach((el) => {
      el.addEventListener('dragover', (e) => {
        e.preventDefault();
      });

      el.addEventListener('drop', (e) => {
        e.preventDefault();
        const taskId = e.dataTransfer.getData('taskId');
        const originColId = e.dataTransfer.getData('colId');
        const destinationColId = e.currentTarget.dataset.colId;

        this.moveTask(taskId, originColId, destinationColId);
        this.render();
      });
    });
  }
}

new App('#app');
