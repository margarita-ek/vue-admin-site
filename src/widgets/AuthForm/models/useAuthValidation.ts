
export function useAuthValidation(message: string) {
    if(message === "Username cannot be blank.\nPassword cannot be blank.") return "Введите данные пользователя";
    if(message === "Username cannot be blank.") return "Введите имя пользователя";
    if(message === "Password cannot be blank.") return "Введите пароль";
    return "Ошибка авторизации"
};