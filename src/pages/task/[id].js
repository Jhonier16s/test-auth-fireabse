import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { app } from "../../firebase";
import { useAuth } from "@/context/authContex";
import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  collection,
} from "firebase/firestore";
const Task = () => {
  const router = useRouter();
  const { id } = router.query;
  const [task, setTask] = useState([]);

  const firestore = getFirestore(app);
  const { user } = useAuth();

  const getTasks = async (userId) => {
    const docRef = doc(firestore, `users/${userId}`);

    const consulta = await getDoc(docRef);

    const tasks = consulta.data().tasks;

    const task = tasks.find((task) => task.id.toString() === id);
    setTask(task);
  };

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (user) {
      getTasks(user.email);
    }
  }, [user]);

  const editTask = async () => {
    const docRef = doc(firestore, `users/${user.email}`);
    const consulta = await getDoc(docRef);
    const tasks = consulta.data().tasks;
    // busca la tarea que se quiere editar 
    const newTasks = tasks.filter((task) => task.id.toString() !== id);
    // agrega la tarea editada
    newTasks.push(task);
    // actualiza la base de datos
    await updateDoc(docRef, { tasks: [...newTasks]});
    router.push("/dashboard"); 

  };

  return (
    <div>
      <h1>Task</h1>
      

      <p>Task ID: {id}</p>

      <div style={
        {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "200px",
          width: "200px",
          backgroundColor: "#eee",
          margin: "0 auto",
          flexDirection: "column",
          color: "#000"
          
        }
      }>
         Editar tarea
              <input
                onChange={handleChange}
                name="name"
                type="text"
                placeholder="nombre tarea"
                value={task.name}
              />
              <input
                onChange={handleChange}
                name="description"
                type="text"
                placeholder="descripcion tarea"
                value={task.description}
              />
              <button onClick={() => editTask(user.email, id)}>Editar tareas</button>

      </div>
    </div>
  );
};

export default Task;
