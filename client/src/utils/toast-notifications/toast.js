import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DEFAULT_TOAST_TIME_TO_AUTOCLOSE = 4000;

export const callSuccess = (message, autoClose = DEFAULT_TOAST_TIME_TO_AUTOCLOSE) => {
    toast.success(message, {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose,
    });
};

export const callError = (message, autoClose = DEFAULT_TOAST_TIME_TO_AUTOCLOSE) => {
    toast.error(message, {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose,
    });
};

export const callLoadingWithPromise = async(
    loadingMessage,
    promise,
    successMessage,
    errorMessage,
    autoClose = DEFAULT_TOAST_TIME_TO_AUTOCLOSE
) => {
    const result = await toast.promise(
        promise,
        {
            pending: {
                render: loadingMessage,
                autoClose: false,
            },
            success: {
                render: successMessage,
                autoClose,
            },
            error: {
                render: errorMessage,
                autoClose,
            },
        },
        {
            position: toast.POSITION.BOTTOM_LEFT,
        }
    );

    return result;
};
