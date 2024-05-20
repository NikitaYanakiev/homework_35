import { useState } from "react";
import * as Yup from "yup";
import { Formik, Field, Form } from "formik";
import "./TodoList.scss";

const EditTodoSchema = Yup.object().shape({
    newTitle: Yup.string()
        .min(2, "Todo cannot be short")
        .required("Todo cannot be empty"),
});

export default function TodoList({ values = [], onDelete, onEdit }) {
    const [editingId, setEditingId] = useState(null);
    const [newTitle, setNewTitle] = useState("");

    const handleEdit = (id, title) => {
        setEditingId(id);
        setNewTitle(title);
    };

    const handleSave = (id, values) => {
        onEdit(id, values.newTitle);
        setEditingId(null);
        setNewTitle("");
    };

    return (
        <ul className="list">
            {values.map((item) => {
                if (editingId === item.id) {
                    return (
                        <Formik
                            key={item.id}
                            initialValues={{ newTitle }}
                            validationSchema={EditTodoSchema}
                            onSubmit={(values) => handleSave(item.id, values)}
                        >
                            {({ errors }) => (
                                <li className="list__item">
                                    <Form className="edit-form">
                                        {errors.newTitle && (<div className="error">{errors.newTitle}</div>)}
                                        <div className="edit-form__body">
                                            <Field
                                                className={errors.newTitle ? "edit-form__input edit-form__input_error" : "edit-form__input "}
                                                name="newTitle"
                                                type="text"
                                                placeholder="Edit todo"
                                            />
                                            <div className="btns">
                                                <button className="btn btn_save" type="submit">
                                                    Save
                                                </button>
                                                <button
                                                    className="btn btn_cancel"
                                                    type="button"
                                                    onClick={() => setEditingId(null)}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    </Form>
                                </li>
                            )}
                        </Formik>
                    );
                } else {
                    return (
                        <li className="list__item" key={item.id}>
                            <span className="list__title">{item.title}</span>
                            <div className="btns">
                                <button
                                    className="btn btn_edit"
                                    onClick={() => handleEdit(item.id, item.title)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn_delete"
                                    onClick={() => onDelete(item.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    );
                }
            })}
        </ul>
    );
}
