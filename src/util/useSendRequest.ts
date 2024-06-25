import { useContext } from "react";
import { AppContext, AppContextType } from "@/appContext.tsx";

export const apiUrl = "http://localhost:8000/api/";

interface ExtraArgumentType {
    body?: unknown;
    options?: RequestInit;
    forceToken?: string;
    isJSON?: boolean;
}

export default function useSendRequest() {
    const { token, clearAuth, toggleNotification } = useContext(AppContext) as AppContextType;

    return async <T>(
        url: string,
        { body, options = { method: "get" }, forceToken, isJSON = true }: ExtraArgumentType = {},
    ) => {
        const headers: HeadersInit = {
            Authorization: forceToken ? `Bearer ${forceToken}` : token ? `Bearer ${token}` : "",
            ...options.headers,
        };
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (isJSON) headers["Content-Type"] = "application/json";

        const response = await fetch(`${apiUrl}${url}`, {
            body: body ? JSON.stringify(body) : undefined,
            ...options,
            headers,
        });

        if (!response.ok) {
            const error = await response.json();
            toggleNotification({
                type: "error",
                message: error.detail ? error.detail : error.toString(),
            });
            if (response.status === 401) {
                clearAuth();
                console.log("unauthenticated");
                return { data: null as T, isOK: false };
            }
        }

        if (options.method !== "get" && options.method !== "GET" && response.status < 400) {
            toggleNotification({ type: "success", message: "موفقیت آمیز." });
        }

        const dataText = await response.text();

        const data: T = dataText.length > 0 ? await JSON.parse(dataText) : null;

        return { data, isOK: true };
    };
}
