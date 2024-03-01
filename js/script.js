{
    const tasks = [
        {
            content: "Zrobić szósty moduł kursu",
            done: true,
        },
        {
            content: "Zrobić obiad",
            done: true,
        },
    ];

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        })
        render();
    }

    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);
        render();
    }

    const toggleTaskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;
        render();
    }

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-removeButton");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        }
        );
        const toggleButtons = document.querySelectorAll(".js-toggleButton");

        toggleButtons.forEach((toggleButton, index) => {
            toggleButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        }
        );
    }

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class="taskList--li">
            <button class="taskList--toggle js-toggleButton"><img src="img/check.png" alt="check" class="${task.done ? "taskList--img" : "taskList--imgDone"}"></button>
            <span class="taskList--text ${task.done ? " taskList--textDone" : ""}">${task.content}</span>
            <button class="taskList--remove js-removeButton">Delete</button>
            
            </li>
            <hr class="hr">
        `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;
        bindEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        document.querySelector(".js-button").addEventListener("click", () => {
            document.querySelector(".js-newTask").focus();
        })

        const newTaskContent = document.querySelector(".js-newTask").value.trim();

        if (newTaskContent === "") {
            return;
        }
        addNewTask(newTaskContent);
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form")
        form.addEventListener("submit", onFormSubmit);
    }
    init();
}