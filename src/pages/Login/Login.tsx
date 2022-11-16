
import React from "react";
import { Formik, Form, Field } from "formik"
import { useLogin } from "./useLogin"
import '../../shared/css/input.css'
import '../../shared/css/App.css'

export const Login = () => {
    const { initialValues, formValidations, handleOnSubmit, handleRegister} = useLogin();
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={formValidations}
            onSubmit={handleOnSubmit}
        >
            <Form className="App App-header" style={{width: '600px', marginLeft: '27%'}}>
                <Field placeholder="Usuario" className="input" name="username"/>
                <Field placeholder="password" className="input" type="password" name="password"/>
                <button type="submit" className="button">Entrar</button>
                <button type="submit" className="button" onClick={handleRegister}>Registrarme</button>
            </Form>
        </Formik>
    )
}