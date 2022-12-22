let tasks = [
  {
    id: 1,
    name: "Doing homework",
    status: true,
  },
  {
    id: 2,
    name: "Playing football",
    status: false,
  },
  {
    id: 3,
    name: "Sleeping",
    status: false,
  },
];

let selected = 0;

const add_task_input = document.getElementById("add_task_input");

const add_task_btn = document.getElementById("add_task_btn");

add_task_btn.addEventListener("click", function (e) {
  e.preventDefault();
  if (add_task_input.value) {
    if (!selected) {
      let new_task = {};
      new_task.id = tasks.length + 1;
      new_task.name = add_task_input.value;
      new_task.status = false;

      tasks.push(new_task);
      getNotDoneTasks();
      add_task_input.value = "";
    } else {
      tasks = tasks.map((task) => {
        if (task.id === selected) {
          return { ...task, name: add_task_input.value };
        } else {
          return task;
        }
      });
      add_task_btn.innerHTML = "Add";
      add_task_input.value = "";
      selected = 0;
      getNotDoneTasks();
    }
  } else {
    alert("Please fill the input.");
  }
  getProgress();
});

const createTaskName = (i, name) => {
  const task_name = document.createElement("input");
  task_name.type = "text";
  task_name.readOnly = true;
  task_name.className = "form-control";
  task_name.value = `${i + 1}. ${name}`;

  return task_name;
};

const createTaskBtn = (id, text, status) => {
  let task_btn = document.createElement("button");
  task_btn.className = `btn btn-${status}`;
  task_btn.innerHTML = text;
  task_btn.id = id;

  return task_btn;
};

const getNotDoneTasks = () => {
  const not_done_tasks = document.getElementById("not_done_tasks");
  not_done_tasks.innerHTML = "";
  tasks
    .filter((item) => !item.status)
    .forEach((item, index) => {
      const task = document.createElement("div");
      task.className = "input-group mb-3";

      const task_name = createTaskName(index, item.name);
      task_name.addEventListener("click", () => {
        edit_task = tasks.find((task) => task.id == item.id);
        add_task_input.value = edit_task.name;
        add_task_btn.innerHTML = "Save";
        selected = item.id;
      });

      const task_btn_add = createTaskBtn(item.id, "Done", "success");
      task_btn_add.addEventListener("click", function () {
        done_task = tasks.find((task) => task.id == item.id);
        done_task.status = true;
        getDoneTasks();
        getNotDoneTasks();
        getProgress();
      });

      task.appendChild(task_name);
      task.appendChild(task_btn_add);

      not_done_tasks.appendChild(task);
    });
  if (!tasks.filter((task) => !task.status).length) {
    not_done_tasks.innerHTML = getFree();
  }
};

getNotDoneTasks();

const getDoneTasks = () => {
  const done_tasks = document.getElementById("done_tasks");
  done_tasks.innerHTML = "";
  tasks
    .filter((item) => item.status)
    .forEach((item, index) => {
      const task = document.createElement("div");
      task.className = "input-group mb-3";

      const task_name = createTaskName(index, item.name);

      const task_btn_delete = createTaskBtn(item.id, "Delete", "danger");

      task_btn_delete.addEventListener("click", () => {
        tasks = tasks.filter((task) => task.id !== item.id);
        getDoneTasks();
        getProgress();
      });

      task.append(task_name);
      task.append(task_btn_delete);
      done_tasks.append(task);
    });
  if (!tasks.filter((task) => task.status).length) {
    done_tasks.innerHTML = getFree();
  }
};

getDoneTasks();

const getProgress = () => {
  const progress = document.querySelector(".progress").firstElementChild;
  let procent = parseInt(
    (tasks.filter((task) => !task.status).length * 100) / tasks.length
  );
  progress.style.width = `${procent}%`;
  progress.setAttribute("aria-valuenow", procent);
  console.log(procent);
};

getProgress();

function getFree() {
  return `
    <div class="alert alert-info" role="alert">
      No task
    </div>
  `;
}
