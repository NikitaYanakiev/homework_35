import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { API_TODOS, API_URL } from "../../urls";
import "./AddTodoItemForm.scss";

const TodoSchema = Yup.object().shape({
    value: Yup.string()
        .min(2, "Todo cannot be short")
        .required("Todo cannot be empty"),
});

export default function AddTodoItemForm({ token, onAddTodo }) {
    return (
        <Formik
            initialValues={{
                value: "",
            }}
            validationSchema={TodoSchema}
            onSubmit={async (values, { resetForm }) => {
                const { data } = await axios.post(
                    API_URL + API_TODOS,
                    {
                        title: values.value,
                    },
                    {
                        headers: {
                            Authorization: token,
                        },
                    }
                );
                onAddTodo({
                    title: data.title,
                    id: data.id,
                });
                resetForm();
            }}
        >
            {({ errors }) => (
                <Form className="form-todo">
                    {errors.value && (
                        <div className="error">{errors.value}</div>
                    )}
                    <div className="form-todo__body">
                        <Field
                            name="value"
                            type="text"
                            className={
                                errors.value
                                    ? "form-todo__input form-todo__input_error"
                                    : "form-todo__input"
                            }
                            placeholder="Enter new todo value"
                        />

                        <input
                            type="submit"
                            value="Save"
                            className="form-todo__btn"
                        />
                    </div>
                </Form>
            )}
        </Formik>
    );
}
