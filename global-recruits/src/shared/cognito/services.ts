import { Auth } from "aws-amplify";

export const AmplifyServices = {
    /**
     * Validator for Sign Up
     * @param formData The Sign-Up Form Data 
     * @returns Sets Blank Validation Error on Acknowledgement
     */
    async validateCustomSignUp(formData: any) {
        const PasswordRegex: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>?~]).*$/;
        const { name, email, password, confirm_password, acknowledgement } = formData;
        const passwordValidation = password && (password.length >= 8) && PasswordRegex.test(password);
        if (!name || !email || !confirm_password || !acknowledgement || !passwordValidation) {
            return {
                acknowledgement: ''
            }
        }
    },

    /**
     * Function that Handles Sign-Up Submissions
     * @param formData The Sign-Up Form Data (Extra Fields Encapsulated in Attributes)
     * @returns Sign-Up Call Made to Cognito
     */
    async handleSignUp(formData: any) {
        let { username, password, attributes: {
            name, email
        } } = formData;
        username = username.toLowerCase();
        return Auth.signUp({
            username,
            password,
            attributes: {
                email,
                name
            }
        });
    },
};