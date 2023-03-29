import { CheckboxField, PasswordField, TextField, useAuthenticator } from "@aws-amplify/ui-react";
import { useState } from "react";

import { TiTick } from "react-icons/ti";
import { AiOutlineCloseCircle } from "react-icons/ai";

export const AmplifyComponents = {
    SignUp: {
        FormFields() {
            const { validationErrors } = useAuthenticator();

            const NumberRegex: RegExp = /\d/;
            const LowerCaseLetterRegex = /[a-z]/;
            const UpperCaseLetterRegex = /[A-Z]/;
            const SpecialCharactersRegex: RegExp = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;

            const [passwordLengthValid, setPasswordLengthValid] = useState<boolean>(false);
            const [passwordNumberValid, setPasswordNumberValid] = useState<boolean>(false);
            const [passwordLowerCaseValid, setPasswordLowerCaseValid] = useState<boolean>(false);
            const [passwordUpperCaseValid, setPasswordUpperCaseValid] = useState<boolean>(false);
            const [passwordSpecialCharacterValid, setPasswordSpecialCharacterValid] = useState<boolean>(false);

            function validatePassword(event: any) {
                const password = event.target?.value;
                if (password) {
                    if (password.length >= 8) {
                        setPasswordLengthValid(true);
                    } else {
                        setPasswordLengthValid(false);
                    }
                    if (NumberRegex.test(password)) {
                        setPasswordNumberValid(true);
                    } else {
                        setPasswordNumberValid(false);
                    }
                    if (LowerCaseLetterRegex.test(password)) {
                        setPasswordLowerCaseValid(true);
                    } else {
                        setPasswordLowerCaseValid(false);
                    }
                    if (UpperCaseLetterRegex.test(password)) {
                        setPasswordUpperCaseValid(true);
                    } else {
                        setPasswordUpperCaseValid(false);
                    }
                    if (SpecialCharactersRegex.test(password)) {
                        setPasswordSpecialCharacterValid(true);
                    } else {
                        setPasswordSpecialCharacterValid(false);
                    }
                } else {
                    setPasswordLengthValid(false);
                    setPasswordNumberValid(false);
                    setPasswordLowerCaseValid(false);
                    setPasswordUpperCaseValid(false);
                    setPasswordSpecialCharacterValid(false);
                }
            }

            return (
                <>
                    <TextField
                        label="Full Name:"
                        placeholder="Enter your Full Name"
                        name="name"
                        errorMessage={validationErrors['name'] as string}
                        hasError={!!validationErrors['name']}
                    />
                    <TextField
                        label="Email Address:"
                        placeholder="Enter your email address"
                        name="email"
                        errorMessage={validationErrors.email as string}
                        hasError={!!validationErrors.email}
                        type="email"
                    />
                    <PasswordField
                        label="Password:"
                        placeholder="Enter your password"
                        name="password"
                        errorMessage={validationErrors.password as string}
                        hasError={!!validationErrors.password}
                        onChange={validatePassword}
                    />
                    <PasswordField
                        label="Confirm Pasword:"
                        placeholder="Enter your password"
                        name="confirm_password"
                        errorMessage={validationErrors.confirm_password as string}
                        hasError={!!validationErrors.confirm_password}
                    />
                    <div className="text-sm">
                        <span className="font-bold">Password Conditions:</span>
                        <div className="flex items-center my-2">
                            {
                                passwordLengthValid ? <TiTick className="shrink-0" size="20" /> : <AiOutlineCloseCircle className="shrink-0" size="20" />
                            }
                            <div className={"pl-2 " + (passwordLengthValid ? "text-green-600" : "text-[#950404]")}>Password length is between 8 and 50 characters</div>
                        </div>
                        <div className="flex items-center my-2">
                            {
                                passwordUpperCaseValid ? <TiTick className="shrink-0" size="20" /> : <AiOutlineCloseCircle className="shrink-0" size="20" />
                            }
                            <div className={"pl-2 " + (passwordUpperCaseValid ? "text-green-600" : "text-[#950404]")}>One upper case letter is required</div>
                        </div>
                        <div className="flex items-center my-2">
                            {
                                passwordLowerCaseValid ? <TiTick className="shrink-0" size="20" /> : <AiOutlineCloseCircle className="shrink-0" size="20" />
                            }
                            <div className={"pl-2 " + (passwordLowerCaseValid ? "text-green-600" : "text-[#950404]")}>One lower case letter is required</div>
                        </div>
                        <div className="flex items-center my-2">
                            {
                                passwordNumberValid ? <TiTick className="shrink-0" size="20" /> : <AiOutlineCloseCircle className="shrink-0" size="20" />
                            }
                            <div className={"pl-2 " + (passwordNumberValid ? "text-green-600" : "text-[#950404]")}>One number is required</div>
                        </div>
                        <div className="flex items-center my-2">
                            {
                                passwordSpecialCharacterValid ? <TiTick className="shrink-0" size="20" /> : <AiOutlineCloseCircle className="shrink-0" size="20" />
                            }
                            <div className={"pl-2 " + (passwordSpecialCharacterValid ? "text-green-600" : "text-[#950404]")}>One special character is required</div>
                        </div>
                    </div>
                    <CheckboxField
                        errorMessage={validationErrors.acknowledgement as string}
                        hasError={!!validationErrors.acknowledgement}
                        name="acknowledgement"
                        value="yes"
                        label="I agree with the Terms & Conditions"
                    />
                </>
            )
        },
    }
};
