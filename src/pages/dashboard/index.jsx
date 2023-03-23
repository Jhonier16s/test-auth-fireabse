/* eslint-disable @next/next/no-img-element */

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/authContex";
import Image from "next/image";
import { getFirestore, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { app } from "../../firebase";

const Dashboard = () => {
  const tasks = [
    {
      id: 1,
      name: "tarea 1",
      description: "descripcion tarea 1",
    },
  ];
  const [task, setTask] = useState({
    id: 0,
    name: "",
    description: "",
  })
  const [data, setData] = React.useState([]);
  const firestore = getFirestore(app);

  /* console.log(firestore) */
  const { user, logout } = useAuth();
  const router = useRouter();
  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  const getDocument = async (idDoc) => {
    const docRef = doc(firestore, `users/${idDoc}`);
    const consulta = await getDoc(docRef);

    if (consulta.exists()) {
      //info del documento
      console.log("Document data:", consulta.data());
      setData(consulta.data());
    } else {
      await setDoc(docRef, { tasks: [...tasks] });
      const consulta = await getDoc(docRef);
      setData(consulta.data());
    }
  };
  const deleteTask = async (id) => {
    const docRef = doc(firestore, `users/${user.email}`);
    const consulta = await getDoc(docRef);
    const data = consulta.data();
    const newTasks = data.tasks.filter((task) => task.id !== id);
    await setDoc(docRef, { tasks: [...newTasks] });
    const consulta2 = await getDoc(docRef);
    setData(consulta2.data());
  }

  const addTask = async () => {    
    const docRef = doc(firestore, `users/${user.email}`);
    const consulta = await getDoc(docRef);
    const data = consulta.data();
    const newTask = { ...task, id: data.tasks.length + 1 };
    const newTasks = [...data.tasks, newTask];
    await updateDoc(docRef, { tasks: [...newTasks] });
    const consulta2 = await getDoc(docRef);
    setData(consulta2.data());
  }
  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  }

  useEffect(() => {
    if (user && user.uid) {
      //pasandole el id del documento, por su email
      getDocument(user.email);
    }
  }, [user]);

  return (
    <div>
      {user ? (
        <div>
          <h1>Dashboard</h1>
          <p>{user.email}</p>
          <div>
            {user.photoURL ? (
              <img src={user.photoURL} alt="user" />
            ) : (
              <p>loading..</p>
            )}
          </div>
          <button onClick={handleLogout}>Logout</button>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <div
              style={{
                margin: "10px",
                display: "flex",
                flexDirection: "column",
              }}
            > 
              Tareas
              <input onChange={handleChange} name="name" type="text" placeholder="nombre tarea" />
              <input onChange={handleChange} name="description" type="text" placeholder="descripcion tarea" />              
              <button onClick={()=>addTask()}>agregar tareas</button>
              
            </div>

            <div>Listado tareas</div>
            {data.tasks &&
              data.tasks.map((task) => (
                <div style={{
                  margin: "10px",
                  display: "flex",
                  flexDirection: "column",
                  border: "1px solid white",
                  padding: "10px",
                  borderRadius: "10px",
                  width: "120px"
                
                
                }} key={task.id}>
                  <p>{task.name}</p>
                  <p>{task.description}</p>
                  <button onClick={()=>deleteTask(task.id)}>Delete</button>
                </div>
              ))}
          </div>
        </div>
      ) : (
        <div>
          <p>loading...</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
