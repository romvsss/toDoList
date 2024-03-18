{
    let tasks = [];
    let hideDoneTasks = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];
        render();
    }

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    }

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            { ...tasks[taskIndex], done: !tasks[taskIndex].done },
            ...tasks.slice(taskIndex + 1),
        ]
        render();
    }

    const toggleAllTasksDone = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        })
        );
        render();
    }

    const hideAllTasksDone = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    }

    const bindRemoveEvents = () => {
        const removeButtons = document.querySelectorAll(".js-removeButton");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        }
        );
    }

    const bindToggleDoneEvents = () => {
        const toggleButtons = document.querySelectorAll(".js-toggleButton");

        toggleButtons.forEach((toggleButton, index) => {
            toggleButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        }
        );
    }

    const bindButtonsEvents = () => {
        const markAllDone = document.querySelector(".js-markAllTasks");

        if (markAllDone) {
            markAllDone.addEventListener("click", toggleAllTasksDone);
        }
        const hideAllDone = document.querySelector(".js-hideAllDoneTasks");

        if (hideAllDone) {
            hideAllDone.addEventListener("click", hideAllTasksDone);

        }
    }
    const render = () => {
        renderText();
        renderButtons();

        bindRemoveEvents();
        bindToggleDoneEvents();
        bindButtonsEvents();
    };

    const renderText = () => {
        let htmlStringText = "";

        for (const task of tasks) {
            htmlStringText += `
            <li class="taskList--li${task.done && hideDoneTasks ? " taskList--hiddenItems" : ""}">
            <button class="taskList--toggle js-toggleButton">
            ${task.done ? "✔" : ""}
            </button>
            <span class="taskList--text ${task.done ? " taskList--textDone" : ""}">${task.content}</span>
            <button class="taskList--remove js-removeButton">✖</button>
            
            </li>
            <hr class="hr">
        `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlStringText;
    }

    const renderButtons = () => {
        let htmlStringButtons = "";

        if (tasks.length)
            htmlStringButtons += `
            <button class="hideAllDoneButton js-hideAllDoneTasks">${hideDoneTasks ? "Pokaż" : "Ukryj"} wszystkie ukończone zadania</button>
            <button class="markAllButton js-markAllTasks" ${tasks.every(({ done }) => done) ? "disabled" : ""}>Zaznacz wszystkie zadania jako ukończone</button>
            `

        document.querySelector(".js-buttons").innerHTML = htmlStringButtons;
    }

    const onFormSubmit = (event) => {
        event.preventDefault();

        document.querySelector(".js-button").addEventListener("click", () => {
            document.querySelector(".js-newTask").focus();
        });

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