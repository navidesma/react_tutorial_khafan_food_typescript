import React from "react";

export default function useError(): [boolean, React.Dispatch<React.SetStateAction<boolean>>] {
    const [error, setError] = React.useState(false);

    React.useEffect(() => {
        if (error) {
            const setErrorToFalseTimeout = setTimeout(() => setError(false), 3000);

            return () => clearTimeout(setErrorToFalseTimeout);
        }
    }, [error]);

    return [error, setError];
}
