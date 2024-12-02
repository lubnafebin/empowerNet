import React from 'react'
import { useNavigate } from 'react-router-dom';
import SimpleReactValidator from 'simple-react-validator';
import { useImmer } from 'use-immer'

export const usePageSignUp = () => {
    const [_, setForceUpdate] = React.useState(0)
    const [state, setState] = useImmer({
        showConfirmPassword: false,
        showPassword: false,
        formData: {
            cds: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    });

    const navigate = useNavigate();

    const formValidator = React.useRef(new SimpleReactValidator({
        autoForceUpdate: { forceUpdate: setForceUpdate },
        validators: {
            confirmPassword: {
                message: "Passwords does not match",
                rule: ({ password, confirmPassword }) => {
                    return password === confirmPassword
                }
            }
        }
    }))

    const handlePasswordToggle = (name) => {
        setState(draft => {
            draft[name] = !draft[name]
        })
    }

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setState(draft => {
            draft.formData[name] = value
        })
    }

    const handleSignUp = (event) => {
        event.preventDefault();
        if (formValidator.current.allValid()) {
            // call signup api
            console.log("submitted data: ", state.formData);
            navigate("/", { replace: true })

        } else {
            formValidator.current.showMessages()
            setForceUpdate(1);
        }
    }

    return { formValidator, state, handleSignUp, handleFormChange, handlePasswordToggle }
}

