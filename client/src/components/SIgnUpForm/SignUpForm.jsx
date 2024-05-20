import React from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import "./SignUpForm.scss";

const SignUpSchema = Yup.object({
    login: Yup.string()
    .min(2, "Must be longer than 2 characters")
    .max(15, "Nice try, nobody has a login that long")
    .required("Required"),
    password: Yup.string()
    .min(5, "Must be longer than 5 characters")
    .max(10, "Not longer than 10 characters")
    .required("Required field"),
});

export default function SignUpForm({ handleSignUp }) {
    return (
        <div className="SignUpForm">
            <h2>Sign up:</h2>
            <Formik
                initialValues={{
                    login: "",
                    password: "",
                }}
                validationSchema={SignUpSchema}
                onSubmit={(values, {resetForm}) => {
                    handleSignUp({
                        login: values.login,
                        password: values.password,
                    });
                    resetForm();
                }}
            >
                {({ errors }) => (
                    <Form>
                        <p>
                            {errors.login && (
                                <span className="error">{errors.login}</span>
                            )}
                            <Field
                                name="login"
                                type="text"
                                placeholder="Login"
                                as="input"
                            />
                        </p>
                        <p>
                            {errors.password && (
                                <span className="error">{errors.password}</span>
                            )}
                            <Field
                                name="password"
                                type="password"
                                placeholder="Password"
                            />
                        </p>
                        <input type="submit" value="Sign Up" />
                    </Form>
                )}
            </Formik>
        </div>
    );
}
