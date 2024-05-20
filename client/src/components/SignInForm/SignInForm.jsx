import React from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import "./SignInForm.scss";

const SignInSchema = Yup.object({
    login: Yup.string()
        .min(2, "Must be longer than 2 characters")
        .max(15, "Nice try, nobody has a login that long")
        .required("Required"),
    password: Yup.string()
        .min(5, "Must be longer than 5 characters")
        .max(10, "Not longer than 10 characters")
        .required("Required field"),
});

export default function SignInForm({ handleSignIn }) {
    return (
        <div className="SignInForm">
            <h2>Sign in:</h2>
            <Formik
                initialValues={{
                    login: "",
                    password: "",
                }}
                validationSchema={SignInSchema}
                onSubmit={(values) => {
                    handleSignIn({
                        login: values.login,
                        password: values.password,
                    });
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
                        <input type="submit" value="Sign In" />
                    </Form>
                )}
            </Formik>
        </div>
    );
}
