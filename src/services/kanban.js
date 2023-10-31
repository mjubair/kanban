import data from '../data/data.js';

class Column {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.tasks = data.tasks;
    return this.render()
  }

  render() {
    var tpl = document.createElement('template');
    tpl.innerHTML = `
        <div class="column">
            <div class="column__title">${this.name}</div>
        </div>
    `;
    const fragment = document.createDocumentFragment();
    fragment.appendChild(tpl.content);
    return fragment
  }
}

class Items {
    constructor() {
        return this.render()
    }
    
    render() {
        var tpl = document.createElement('template');
        tpl.innerHTML = `
            <div class="items">
                <div class="items__item">Task 1</div>
                <div class="items__item">Task 2</div>
                <div class="items__item">Task 3</div>
            </div>
        `;
        const fragment = document.createDocumentFragment();
        fragment.appendChild(tpl.content);
        return fragment
    }
}

class Kanban {
  constructor(root) {
    this.root = root;
    this.data = data;
    this.render();
  }

  render() {
    this.data.forEach((column) => {
      const newColumn = new Column(column.id, column.name);
      this.root.appendChild(newColumn);
    });
  }
}

export default Kanban;