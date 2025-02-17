import { useState, useEffect } from "react"

export const usePasswordMatch = (password: string, confirmPassword: string) => {
    const [isMatch, setIsMatch] = useState<boolean>(() => false);
    const [errorMessage, setErrorMessage] = useState<string>(() => "");

    useEffect(() => {
        if (password && confirmPassword) {
            if (password === confirmPassword) {
                setIsMatch(true)
                setErrorMessage("")
            }
            else {
                setIsMatch(false)
                setErrorMessage("> The passwords do not match");
            }
        }
        else {
            setIsMatch(true);
            setErrorMessage("")
        }
    }, [password, confirmPassword]);


    return { isMatch, errorMessage };
}