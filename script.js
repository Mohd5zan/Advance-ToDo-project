const progressBar = document.querySelector("#progress-bar");
const progressText = document.querySelector("#progress-text");
const ib = document.querySelector("#input-box");
const ct = document.querySelector(".list-container");
const prioritySelect = document.querySelector("#priority");
const priorityOrder = {
  high: 1,
  medium: 2,
  low: 3,
};

function addTask() {
  if (ib.value === "") {
    alert("Please type task to Add");
  } else {
    let li = document.createElement("li");
    li.innerHTML = ib.value;
    const priority = prioritySelect.value;
    li.classList.add(priority);
    ct.appendChild(li);
    sortTasksByPriority();
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
  }
  ib.value = "";
  updateProgress();
  saveData();
}
function sortTasksByPriority() {
  const tasks = Array.from(ct.children);

  tasks.sort((a, b) => {
    return priorityOrder[a.classList[0]] - priorityOrder[b.classList[0]];
  });

  tasks.forEach((task) => ct.appendChild(task));
}
function updateProgress() {
  const totalTasks = ct.children.length;
  const completedTasks = ct.querySelectorAll(".checked").length;

  if (totalTasks === 0) {
    progressBar.style.width = "0%";
    progressText.textContent = "0% Completed";
    return;
  }

  const percent = Math.round((completedTasks / totalTasks) * 100);
  progressBar.style.width = percent + "%";
  progressText.textContent = `${percent}% Completed`;
}

ct.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      updateProgress();
      saveData();
    } else if (e.target.tagName === "SPAN") {
      const task = e.target.parentElement;
      task.classList.add("fade-out");
      setTimeout(() => {
        task.remove();
        updateProgress();
        saveData();
      }, 400);
    }
  },
  false
);
function saveData() {
  localStorage.setItem("data", ct.innerHTML);
}
function showTask() {
  ct.innerHTML = localStorage.getItem("data");
  sortTasksByPriority();
  updateProgress();
}
showTask();
