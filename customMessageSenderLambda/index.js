const { createTemporaryPasswordTemplate, createResetCodeTemplate } = require('./helper')

const handler = async (event) => {
    if (event.triggerSource === "CustomMessage_AdminCreateUser") {
        const message = createTemporaryPasswordTemplate(event.request.userAttributes["custom:userType"], event.request.usernameParameter, event.request.codeParameter);
        event.response.smsMessage = message;
        event.response.emailMessage = message;
        event.response.emailSubject = "GlobalRecruits: Invitation Email";
    } else if (event.triggerSource === "CustomMessage_ResendCode"
        || event.triggerSource === "CustomMessage_ForgotPassword"
        || event.triggerSource === "CustomMessage_UpdateUserAttribute") {
        const message = createResetCodeTemplate(event.triggerSource, event.request.userAttributes["email"] ?? "there", event.request.codeParameter);
        event.response.smsMessage = message;
        event.response.emailMessage = message;
        event.response.emailSubject = "GlobalRecruits: Verification Code";
    }
    return event;
};

module.exports = { handler }