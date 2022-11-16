
import React from "react";
import { Formik, Form, Field } from "formik"
import { useClientForm } from "./useClientForm";
import { Client } from "../../shared/interface/Client";
import '../../shared/css/input.css'
import '../../shared/css/App.css'

interface Props {
    initialData?: Client;
    isEditing: boolean;
}
export const ClientForm = ({initialData, isEditing}: Props) => {
    const { initialValues, formValidations, handleOnSubmit} = useClientForm(initialData, isEditing);
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={formValidations}
            onSubmit={handleOnSubmit}
        >
            <Form className="App App-header">
                <Field placeholder="Nombre" className="input" name="name"/>
                <Field placeholder="Apellido" className="input" name="lastName"/>
                <Field placeholder="sexo" className="input" name="sex"/>
                <Field placeholder="Direccion" className="input" name="address"/>
                <Field placeholder="edad" className="input" name="age"/>
                <button type="submit" className="button">Agregar</button>
            </Form>
        </Formik>
    )
}