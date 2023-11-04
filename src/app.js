import sampleData from "./data/data.js";

class App {
  constructor(rootSelector) {
    this.root = document.querySelector(rootSelector);
    this.data = localStorage.getItem("data")
      ? JSON.parse(localStorage.getItem("data"))
      : sampleData;
    this.render();
  }

  setToLocalStorage(key, value) {
    localStorage.setItem(key, value);
    this.render();
  }

  renderColumnSettings() {
    return `<div class="dialog__column">
    <div class="dialog__column--header">
      <div class="dialog__column-title">
        Title
      </div>
      <button aria-label="Close" class="dialog__column--close ButtonBase-sc-bqtwic-0 Button-sc-ybpnzh-0 Dialog__DialogCloseButton-sc-uaxjsn-7 dsMyGk gkMOfg lkgsOL"><svg aria-hidden="true" focusable="false" role="img" class="Octicon-sc-9kayk9-0" viewBox="0 0 16 16" width="16" height="16" fill="currentColor" style="display: inline-block; user-select: none; vertical-align: text-bottom; overflow: visible;">
          <path d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.749.749 0 0 1 1.275.326.749.749 0 0 1-.215.734L9.06 8l3.22 3.22a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L8 9.06l-3.22 3.22a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06Z"></path>
        </svg></button>
    </div>
    <form  class="dialog__column--form">
      <div class="dialog__column--body">
        <div class="form-group">
          <label for="column-title" class="form-label">Name</label>
           <input type="text" name="title" id="column-title" class="form-input">
        </div>
        <div class="form-group  radio">
          <label class="form-label">Colors</label>
          <div class="horizontal">
          ${this.data.colors.map((color, index) => {
            return `
            <label for="column-colors" class="form-label hidden">Name</label>
           <input ${index == 0 && 'checked'} type="radio" value="${color}" name="column-color" id="column-colors" data-radio-id=${color} class="form-input" style="background-color: ${color+80};">
           <style>
            #column-colors[data-radio-id="${color}"]:checked {
              outline-color: ${color};
            }
           </style>
           `
          }).join("")}
         
        </div>
          </div>
         <div class="form-group">
          <label for="column-description" class="form-label">Description</label>
           <textarea  name="description" id="column-description" class="form-input"></textarea>
        </div>
        
      </div>
      <div class="dialog__column--footer">
        <button class="btn__secondary" id="form-close-column" type="button"  formmethod="dialog">Cancel</button>
        <button class="btn__primary" type="submit">Submit</button>
      </div>
    </form>
  </div>`
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
      .join("");

    // tasks += `<div class="task task__dropzone" data-task-id=${items.length}></div>`;
    return tasks;
  }

  renderColumns() {
    let columns = this.data.columns
      .map((column) => {
        return `
            <div class="lane" data-col-id=${column.id}>
  <div class="lane__head">
    <div class="lane__header">
    <div class="lane__img" style="border-color: ${column.color}; background-color: ${column.color}+90;">
      
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
      .join("");

    const lastCol = `
  <div class="lane lane__last">
  <button id="add_board_btn" data-component="IconButton" type="button" aria-label="Add a new column to the board" data-testid="add-new-column-button" data-size="large" data-no-visuals="true" class="types__StyledButton-sc-ws60qy-0 iTETFQ"><svg aria-hidden="true" focusable="false" role="img" class="octicon octicon-plus" viewBox="0 0 16 16" width="16" height="16" fill="currentColor" style="display: inline-block; user-select: none; vertical-align: text-bottom; overflow: visible;"><path d="M7.75 2a.75.75 0 0 1 .75.75V7h4.25a.75.75 0 0 1 0 1.5H8.5v4.25a.75.75 0 0 1-1.5 0V8.5H2.75a.75.75 0 0 1 0-1.5H7V2.75A.75.75 0 0 1 7.75 2Z"></path></svg></button>
  </div>
  `;

    columns += lastCol;

    return columns;
  }

  moveTask(taskId, newIndex, originColId, destinationColId) {
    const task = this.findAndRemoveTask(taskId, originColId);
    const column = this.data.columns.find((column) => column.id == destinationColId)
    if(newIndex !== -1) {
      column.tasks.splice(newIndex, 0, task);
    } else  {
      column.tasks.push(task);
    }
    column.tasks.map((task, index) => {
      task.order = index;
    })

    this.setToLocalStorage("data", JSON.stringify(this.data));

  }

  findAndRemoveTask(taskId, columnId) {
    const column = this.data.columns.find((column) => column.id == columnId);
    const task = column.tasks.find((task) => {
      return task.id == parseInt(taskId);
    });
    column.tasks = column.tasks.filter((task) => task.id != taskId)
    return task;
  }

  addTask(e) {
    const task = prompt("Enter task name");
    const colId = e.currentTarget.dataset.colId;
    const newTask = {
      id: Date.now(),
      name: task,
      description: "New Task Description",
    };

    this.data.columns[colId - 1].tasks.push(newTask);
    this.setToLocalStorage("data", JSON.stringify(this.data));
  }

  getTheClosestElement(lane, yAxis) {
    const tasks = lane.querySelectorAll(".task:not(.task__is-dragging)");
    let closestElement = null;
    let closestDistance = Number.NEGATIVE_INFINITY;
    
    tasks.forEach((task) => {
      const rect = task.getBoundingClientRect();
      const distance = yAxis - rect.top;
      if (distance < 0 && distance > closestDistance) {
        closestDistance = distance;
        closestElement = task;
      }
    });
    return closestElement
  }

  render() {
    this.root.innerHTML = this.renderColumns();
    this.addEventListeners();
  }

  // updateTaskOrder(taskId, newIndex, newColumn) {
  //   const task = this.data.tasks.find(task => task.id === taskId);
  
  //   if (task) {
  //     this.data.tasks = this.state.tasks.filter(task => task.id !== taskId);
  //     this.state[newColumn].splice(newIndex, 0, task);
  //   }
  // }

  addEventListeners() {

    let draggedElementSize = { width: 0, height: 0 };

    this.root.querySelectorAll(".lane__add-tasks").forEach((el) => {
      el.addEventListener("click", (e) => this.addTask(e));
    });

    // TODO: Change this
    document.getElementById("add_board_btn").addEventListener("click", (e) => {

      const dialog = document.createElement('dialog');
      dialog.innerHTML = this.renderColumnSettings();
      document.body.appendChild(dialog);
      dialog.querySelector('.dialog__column--close').style.cursor = 'pointer';
      dialog.querySelector('.dialog__column--close').addEventListener('click', () => {
        dialog.close();
      });

      dialog.addEventListener('close', () => {
        dialog.close();
      });

      document.querySelector('#form-close-column').addEventListener('click', () => {
        dialog.close();
      });

      document.querySelector('.dialog__column--form').addEventListener('submit', (e) => {
        e.preventDefault();
        const form = document.querySelector('.dialog__column--form');
        const formData = new FormData(form);
        const nextBoardId = this.data.columns.length + 1;
        console.log(formData.get('column-color'));
        const newBoardData = {
          description: formData.get('description'),
          name: formData.get('title'),
          id: nextBoardId,
          color: formData.get('column-color'),
          tasks: [],
        };
        this.data.columns.push(newBoardData);
        this.setToLocalStorage("data", JSON.stringify(this.data));
        form.reset();
        dialog.close();
      });
      //   const boardName = prompt("Enter the name for new board");
      // const description = prompt("Enter the description for new board");
      
      
      dialog.showModal();

      // Add a new board

      

    });

    

    this.root.querySelectorAll(".task").forEach((el) => {
      let wrapper;
      
      el.addEventListener("dragstart", (e) => {
        e.dataTransfer.effectAllowed = "move";
        el.classList.add("task__is-dragging");
        
        const clone = el.cloneNode(true);
        wrapper = document.createElement('div');
        wrapper.appendChild(clone);
        wrapper.firstChild.classList.add("task__dragging");
        wrapper.style.position = 'fixed';
        wrapper.style.left = '-10000px';
        wrapper.style.top = '-10000px';
        wrapper.style.width = el.offsetWidth + "px";
        
        document.body.appendChild(wrapper);

        const rect = el.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;

        e.dataTransfer.setDragImage(wrapper, offsetX, offsetY);

        const columnId = e.target.closest(".lane").dataset.colId;
        e.dataTransfer.setData("taskId", e.target.dataset.taskId);
        e.dataTransfer.setData("colId", columnId);

        draggedElementSize.width = e.target.offsetWidth + "px";
        draggedElementSize.height = e.target.offsetHeight + "px";

        setTimeout(() => {
          el.style.opacity = 0.5;
        }, 0);
      });

      el.addEventListener("dragenter", (e) => {
        e.preventDefault();

      })

      el.addEventListener("dragleave", (e) => {
        e.preventDefault();

        if(document.querySelector('.task__is-dragging')) {
          document.querySelector('.task__is-dragging').remove();
        }

      })

      el.addEventListener("dragend", (e) => {
        el.classList.remove("task__dragging");
        if(wrapper) {
          document.body.removeChild(wrapper);
          wrapper = null;
        }
      });


    });

    this.root.querySelectorAll(".lane").forEach((el) => {
      let placeholder;
      let closestElement;

      el.addEventListener("dragenter", (e) => {
        e.preventDefault();
      });

      el.addEventListener("dragover", (e) => {
        e.preventDefault();
        
        closestElement = this.getTheClosestElement(el, e.clientY)

        if (!placeholder) {
          placeholder = document.createElement('div');
          placeholder.classList.add('placeholder');
          placeholder.style.height = draggedElementSize.height; // Set the height to match the dragged element
          placeholder.style.width = draggedElementSize.width; // Set the height to match the dragged element
          placeholder.style.marginBottom = `4px`;
        }

        if (closestElement) {
          closestElement.insertAdjacentElement('beforebegin', placeholder);
        } else {
          el.querySelector('.lane__tasks').append(placeholder);
        }
      });

      el.addEventListener("dragleave", (e) => {
        e.preventDefault();
        if (placeholder) {
          placeholder.remove();
          placeholder = null;
        }
      });

      el.addEventListener("drop", (e) => {
        e.preventDefault();
        const taskId = e.dataTransfer.getData("taskId");
        const originColId = e.dataTransfer.getData("colId");
        const destinationColId = e.currentTarget.dataset.colId;

        if (placeholder ) {
          placeholder.remove();
          placeholder = null;
        }

        const newIndex = Array.from(e.currentTarget.querySelectorAll('.task')).indexOf(closestElement);

        this.moveTask(taskId, newIndex, originColId, destinationColId);
      });
    });
  }
}

new App("#app");
