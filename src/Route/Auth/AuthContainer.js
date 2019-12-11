import React, { useState } from "react";
import useInput from "../../Hooks/useInput";
import AuthPresenter from "./AuthPresenter";
import { useMutation } from "react-apollo-hooks";
import { LOGIN_IN, CREATE_ACCOUNT, CONFIRM_SECRET, LOCAL_LOG_IN } from "./AuthQueries";
import { toast } from "react-toastify";

export default () => {
    const [ action, setAction ] = useState("logIn");
    const username = useInput("");
    const firstName = useInput("");
    const lastName = useInput("");
    const secret = useInput("");
    const email = useInput("");

    const [requestSecretMutation] = useMutation(LOGIN_IN, {
        variables: { email: email.value },
    });

    const [createAccountMutataion] = useMutation(CREATE_ACCOUNT, {
        variables: {
            email: email.value,
            username: username.value,
            firstName: firstName.value,
            lastName: lastName.value
        }
    });

    const [confirmSecretMutation] = useMutation(CONFIRM_SECRET, {
        variables: {
            email: email.value,
            secret: secret.value
        }
    });

    const [localLogInMutation] = useMutation(LOCAL_LOG_IN);

    const onSubmit = async (e) => {
        e.preventDefault();
        if(action === "logIn") {
            if(email !== "") {
                try {
                    const { data: { requestSecret } } = await requestSecretMutation();
                    if(!requestSecret) {
                        toast.error("You don't have an account yet, create one");
                        setTimeout(() => setAction("signUp"), 3000);
                    }
                    else {
                        toast.success("Success! Check your email login secret");
                        setAction("confirm");
                    }
                } catch (error) {
                    toast.error("Can't request secret, try again")   
                }
            }
            else {
                toast.error("Email is required");
            }
        }
        else if (action === "signUp") {
            if (email.value !== "" &&
                username.value !== "" &&
                firstName.value !== "" &&
                lastName.value !== "") {
                    try {
                        const { data: { createAccount } } = await createAccountMutataion();
                        if(!createAccount) {
                            toast.error("Can't create account")
                        }
                        else {
                            toast.success("Account created! Log in now");
                            setTimeout(() => setAction("logIn"),3000);
                        }
                    } catch (error) {
                        toast.error("Can't create account, try again");
                    }
                    
                }
                else  {
                    toast.error("All field are required");
                }
        }
        else if (action === "confirm") {
            if(secret.value !== "") {
                try {
                    const { data: { confirmSecret: token } } = await confirmSecretMutation();
                    if(token !== "" && token !== undefined) {
                        localLogInMutation({variables: {token}});
                    } else {
                        throw Error();
                    }
                } catch (error) {
                    toast.error("Can't confirm secret");
                }
            }
        }
    };

    return <AuthPresenter 
                setAction={setAction} 
                action={action} 
                username={username} 
                firstName={firstName} 
                lastName={lastName} 
                email={email} 
                secret={secret}
                onSubmit={onSubmit}>
            </AuthPresenter>
};