
import React from "react";
import { Formik, Form, Field } from "formik"
import { useRegister } from "./useRegister";
import { User } from '../../shared/interface'; 
import '../../shared/css/input.css'
import '../../shared/css/App.css'
interface Props {
    initialData?: User;
    isEditing?: boolean;
}
export const Register = ({initialData, isEditing = true}: Props) => {
    const { initialValues, formValidations, handleOnSubmit} = useRegister(initialData, isEditing);
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={formValidations}
            onSubmit={handleOnSubmit}
        >
        {({ values}) => (
            <Form className="App App-header" style={{marginTop: -50}}>
            <h3>{isEditing ? 'Editar' : 'registrar'}</h3>
                <Field placeholder="Nombre" className="input" name="name"/>
                <Field placeholder="Apellido" className="input" name="lastName"/>
                <Field placeholder="Email" className="input" name="email"/>
                <Field placeholder="Phone" className="input" name="phone"/>
                <Field placeholder="Nombre de usuario" className="input" name="username"/>
                <Field placeholder="Contraseña" className="input" name="password" type="password"/>
                <Field placeholder="Confirmar Contraseña" className="input" name="password2" type="password"/>
                <button type="submit" className="button" disabled={values.password2 !== values.password}>{initialData ? 'Editar usuario' : "Registrarse"}</button>
            </Form>
            )}
        </Formik>
    )
}