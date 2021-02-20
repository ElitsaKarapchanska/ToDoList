const taskStorage = (function () {
  class Task {
    constructor(content) {
      this.id = Task.counter++;
      this.content = content;
      this.isDone = false;
    }

    static counter = 1;
  }

  class TaskManager {
    constructor() {
      if (localStorage.getItem("tasks")) {
        this.tasks = JSON.parse(localStorage.getItem("tasks"));
        Task.counter = parseInt(localStorage.getItem("lastId")) + 1;
      } else {
        this.tasks = [];
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
        localStorage.setItem("lastId", 0);
      }
    }

    searchTasks(id) {
      for (let i = 0; i < this.tasks.length; i++) {
        if (this.tasks[i].id === id) return i;
      }
      return -1;
    }

    createNewTask(content) {
      if (content.trim().length > 0) {
        let newTask = new Task(content);
        this.tasks.push(newTask);

        localStorage.setItem("tasks", JSON.stringify(this.tasks));
        localStorage.setItem("lastId", newTask.id);
      }
    }

    doTask(id) {
      let index = this.searchTasks(id);
      if (index > -1) this.tasks[index].isDone = !this.tasks[index].isDone;

      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    }

    removeTask(id) {
      let index = this.searchTasks(id);
      if (index > -1) this.tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    }

    removeAllTasks() {
      this.tasks.length = 0;
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    }
  }
  return new TaskManager();
})();
