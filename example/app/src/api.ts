declare global {
    interface Window {
        pywebview: {
            api: {
                invoke: (command: string, ...args: any[]) => Promise<string>;
                emit: (event: string, ...args: any[]) => Promise<void>;
            };
        };
    }
}

interface PyWuiResponse<T = any> {
    status: "success" | "error";
    data?: T;
    message?: string;
}

// `invoke` function to call Python commands
export async function invoke<T = any>(command: string, ...args: any[]): Promise<T> {
    try {
        const response: PyWuiResponse<T> = await (window as any).pywebview.api.invoke(command, ...args);
        if (response.status === "success" && response.data !== undefined) {
            return response.data;
        } else {
            throw new Error(response.message || "Unknown error occurred.");
        }
    } catch (error) {
        console.error("Error calling Python command:", error);
        throw error;
    }
}

type PyWuiEvent<T> = {
    event: string
    data?: T
}

export function listen<T = any>(event: string, callback: (type: string, data: T) => void) {
    window.addEventListener(`pywui:${event}`, e => {
        const payload = e['detail'] as PyWuiEvent<T>
        callback(payload.event, payload.data);
    })
    function unlisten(callback?: (e) => void) {
        const defaultCallback = (ev) => {
        }
        window.removeEventListener(`pywui:${event}`, callback ?? defaultCallback)
    }

    return unlisten
}

export async function emit<T>(event: string, data: T): Promise<void> {
    try {
        await (window as any).pywebview.api.emit(event, data);
    } catch (error) {
        console.error("Error emitting  event:", error);
        throw error;
    }
}


