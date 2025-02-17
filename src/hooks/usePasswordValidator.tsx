import { useState, useEffect } from "react"

export const usePasswordValidator = (password: string, confirmPassword: string) => {
    const [isValid, setIsValid] = useState<boolean>(() => false);
    const [error_Valid_Message, setError_Valid_Message] = useState<string>(() => "");

    useEffect(() => {
        if (password && confirmPassword) {
            const has8Characters = password.length >= 8 && confirmPassword.length >= 8
            const has1UpperCase = /[A-Z]/.test(password) && /[A-Z]/.test(confirmPassword) 
            const has1Number = /[0-9]/.test(password) && /[0-9]/.test(confirmPassword)
        
            if (!has8Characters || !has1UpperCase || !has1Number) {
                setIsValid(false);
                setError_Valid_Message("> Password must be at least 8 characters long, has one uppercase letter, and one number.");
            }
            else {
                setIsValid(true);
                setError_Valid_Message("");
            }
        }
        else {
            setIsValid(true);
            setError_Valid_Message("");
        }
    }, [password, confirmPassword])
    
    return { isValid, error_Valid_Message }
}