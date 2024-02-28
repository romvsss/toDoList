{
    const tasks = [
        {
            content: "Zrobić moduł 6 kursu",
            done: false,
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
        tasks.slice(taskIndex, 1);
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
            <button class="taskList--toggle js-toggleButton">Done?</button>
            <span class="taskList--text" ${task.done ? "style=\"text-decoration: line-through\"" : ""}>${task.content}</span>
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