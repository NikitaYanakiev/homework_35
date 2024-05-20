import axios from "axios";
import { useEffect, useState } from "react";
import { API_TODOS, API_URL } from "../urls";
import TodoList from "../components/TodoList/TodoList";
import AddTodoItemForm from "../components/AddTodoItemForm/AddTodoItemForm";
import "./TodosPage.scss";

export default function TodosPage({ token, handleQuit }) {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(API_URL + API_TODOS, {
                headers: {
                    Authorization: token,
                },
            });
            console.log(result);
            setTodos(result.data);
        };
        fetchData();
    }, [token]);

    const deleteItem = async (id) => {
        await axios.delete(`${API_URL}${API_TODOS}/${id}`, {
            headers: {
                Authorization: token,
            },
        });
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const editItem = async (id, newTitle) => {
        const { data } = await axios.put(`${API_URL + API_TODOS}/${id}`, {
            title: newTitle,
        }, {
            headers: {
                Authorization: token,
            },
        });
        setTodos(todos.map(todo => todo.id === id ? { ...todo, title: data.title } : todo));
    };

    const addTodo = (newTodo) => {
        setTodos([...todos, newTodo]);
    };

    return (
        <div className="TodosPage">
            <h2>Todos Page</h2>
            <button className="quit" onClick={handleQuit}>Quit</button>
            {!todos.length && <p>No todos available</p>}

            {!!todos.length && (
                <TodoList values={todos} onDelete={deleteItem} onEdit={editItem} />
            )}

            <AddTodoItemForm token={token} onAddTodo={addTodo} />
        </div>
    );
}
