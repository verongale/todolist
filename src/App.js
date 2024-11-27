import React, { useEffect, useState } from "react";
import {
  fetchTasks,
  createTask,
  fetchTaskTypes,
  updateTaskStatus,
} from "./autenticazione.js"; // Aggiungi la funzione updateTaskStatus
import "./nav.js";

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDeadline, setTaskDeadline] = useState("");
  const [taskType, setTaskType] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false); 

  useEffect(() => {
    fetchTasks()
      .then((data) => setTasks(data.data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    fetchTaskTypes()
      .then((data) => {
        if (Array.isArray(data.data)) {
          setTaskType(data.data);
        } else {
          console.error("Data fetched for task types is not an array:", data);
        }
      })
      .catch((error) => console.error("Error fetching task types:", error));
  }, []);

  const addTask = async () => {
    if (!taskName) {
      alert("Inserire un task valido");
      return;
    }

    try {
      const newTask = {
        name: taskName,
        description: taskDescription,
        deadline: taskDeadline,
        task_type_id: taskType.length > 0 ? taskType[0].id : 1,
        status: "draft", // Default status for new tasks
      };

      const createdTask = await createTask(newTask);
      console.log("task creato:", createdTask);

      setTasks((prevTasks) => [...prevTasks, createdTask.data]);
      setTaskName("");
      setTaskDescription("");
      setTaskDeadline("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Funzione per alternare lo stato del task (draft / published)
  const toggleTaskStatus = async (taskId, currentStatus) => {
    const newStatus = currentStatus === "published" ? "draft" : "published";

    // Ottimizzazione: aggiorna l'UI subito senza aspettare la risposta dal server
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );

    try {
      // Aggiorna lo stato della task sul server
      const updatedTask = await updateTaskStatus(taskId, newStatus);

      // Non è necessario fare altro, perché la UI è già aggiornata
    } catch (error) {
      console.error("Error updating task status:", error);
      // In caso di errore, torna allo stato precedente
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, status: currentStatus } : task
        )
      );
    }
  };
  const getBgColorByTaskType = (taskTypeId) => {
  switch (taskTypeId) {
    case 1:
      return "bg-rose-200";
    case 2:
      return "bg-amber-200";
    case 3:
      return "bg-blue-200";
  }
};
  

  return (
    <div className="h-full text-gray-800">
      <div className="container mx-auto p-4">
        <h1 className="text-7xl font-bold mb-8">To Do:</h1>
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`bg-amber-200 p-4 rounded-md text-2xl ${
                task.status === "published" ? "line-through" : ""
              } ${getBgColorByTaskType(task.task_type_id)}`}
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={task.status === "published"}
                  onChange={() => toggleTaskStatus(task.id, task.status)}
                  className="mr-4 w-6 h-6 rounded-2xl border-2 "
                />
                <span>{task.name}</span>
               
              </div>
            </li>
          ))}
        </ul>
        <div className="flex items-center w-full justify-center">
          <button
            onClick={() => setIsFormVisible(!isFormVisible)}
            className="mt-8 w-20 h-20 bg-pink-600 text-white rounded-full text-2xl"
          >
            {isFormVisible ? "-" : "+"}
          </button>
        </div>
        {isFormVisible && (
          <div>
            <h2 className="text-3xl font-bold mt-8 mb-4">
              Aggiungi un nuovo task:
            </h2>

            <form className="space-y-4">
              <div>
                <label className="block text-2xl font-medium w-full">
                  Nome:
                </label>
                <input
                  type="text"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                  className="w-full p-2 border rounded-md text-2xl bg-amber-200"
                />
              </div>
              <div>
                <label className="block text-2xl font-medium">
                  Descrizione:
                </label>
                <input
                  type="text"
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                  className="w-full p-2 border rounded-md text-2xl bg-amber-200"
                />
              </div>
              <div>
                <label className="block text-2xl font-medium">
                  Da fare entro:
                </label>
                <input
                  type="date"
                  value={taskDeadline}
                  onChange={(e) => setTaskDeadline(e.target.value)}
                  className="w-full p-2 border rounded-md text-2xl bg-amber-200"
                />
              </div>
              <div>
                <label className="block text-2xl font-medium">Categoria:</label>
                <select
                  value={taskType.length > 0 ? taskType[0].id : ""}
                  onChange={(e) =>
                    setTaskType([
                      taskType.find(
                        (type) => type.id === parseInt(e.target.value)
                      ),
                    ])
                  }
                  className="w-full p-2 border rounded-md text-2xl bg-amber-200"
                >
                  {taskType &&
                    taskType.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                </select>
              </div>
            </form>
            <div className="flex justify-center">
              <button
                onClick={addTask}
                className="mt-8 w-32 h-16 p-4 rounded-full bg-pink-600 text-white text-2xl"
              >
                Aggiungi
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
