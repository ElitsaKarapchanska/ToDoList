(function () {
  let form = document.getElementById("addItem");
  let container = document.getElementById("container");
  let wrapper = document.getElementById("wrapper");
  let removeAllButton = document.getElementById("removeAll");
  switchContainerContent();

  removeAllButton.addEventListener("click", function () {
    taskStorage.removeAllTasks();
    switchContainerContent();
  });

  function switchContainerContent() {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks.length === 0) {
      wrapper.style.display = "none";
    }
    const source = document.getElementById("todoItem").innerHTML;
    const template = Handlebars.compile(source);

    const html = template(tasks);

    container.innerHTML = html;

    let allTasks = document.querySelectorAll(".text");
    allTasks.forEach((task) => {
      task.addEventListener("click", crossThrough);
    });

    let allDeleteButtons = document.querySelectorAll(".bin");
    allDeleteButtons.forEach((button) => {
      button.addEventListener("click", deleteItem);
    });
  }

  function crossThrough(event) {
    taskStorage.doTask(parseInt(event.target.parentElement.id));
    switchContainerContent();
  }

  function deleteItem(event) {
    taskStorage.removeTask(parseInt(event.target.parentElement.id));
    switchContainerContent();

    if (document.getElementsByClassName("items").length === 0) {
      wrapper.style.display = "none";
    }
  }

  form.addEventListener("submit", function (event) {
    let submittedItem = event.target[0].value;

    if (submittedItem.trim().length > 0) {
      taskStorage.createNewTask(submittedItem);
      switchContainerContent(tasks);

      wrapper.style.display = "block";
    }

    event.target[0].value = "";
    event.preventDefault();
  });
})();
