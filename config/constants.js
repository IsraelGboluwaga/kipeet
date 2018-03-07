let self = this;

module.exports.constants = {
    ALREADY_REGISTERED_USER: 'Looks like you\'re already a registered user. Kindly login.',
    APP_NAME: 'kipeet',
    EMAIL_ALREADY_EXISTS: 'This email is linked to an already registered user.',
    EMPTY_PARAMS: 'The fields are empty',
    ERROR_OCCURRED: 'An error occurred. Try again.',
    PATH_NOT_UNIQUE: 'Error, expected {PATH} to be unique.',
    INVALID_EMAIL: 'Kindly enter a valid email address',
    INVALID_PARAMS: 'Invalid inputs',
    INVALID_PHONE: 'Kindly enter a valid phone number',
    INVALID_USERNAME: 'Username must contain only letters and numbers',
    MIN_PASSWORD_LENGTH: 'Password cannot be less than 6 characters.',
    PASSWORD_CANNOT_BE_EMPTY: 'The password field cannot be empty',
    PASSWORDS_DONT_MATCH: 'The two passwords don\'t match. Please try again',
    PHONE_ALREADY_EXISTS: 'This phone number is linked to an already registered user.',
    USER_WELCOME: 'Welcome back! I kept all your stuff safe for you. Just the way you left it.',
    USERNAME_ALREADY_EXISTS: 'This username is linked to an already registered user.',
    WELCOME_MESSAGE: ' makes sure you have your secrets kept. Todos, memories, plans,\n' +
    '                    structures... name it! In cases\n' +
    '                    of a lost or damaged device, guess who you could count on?',
};

module.exports.figures = {
    MIN_PASSWORD_LENGTH: 6
};

module.exports.templateText = {
    title: self.constants.APP_NAME,
    header: self.constants.APP_NAME,
    welcome_message: self.constants.WELCOME_MESSAGE
};

module.exports.loginTemplate = {
    title: self.constants.APP_NAME,
    header: self.constants.APP_NAME,
    welcome_message: self.constants.USER_WELCOME
};

module.exports.dashboard = {
    title: self.constants.APP_NAME
};

module.exports.responseMessages = {
    SUCCESS: 'success',
    ERROR: 'error',
    TASK_SAVED: 'Task successfully saved',
    TASK_DELETED: 'Task successfully deleted',
    NOT_AUTHORIZED: 'You are not authorized to access this resource',
    NOT_USER: `You\'re not registered in ${self.constants.APP_NAME} yet. Kindly click on register to signup.`,
};