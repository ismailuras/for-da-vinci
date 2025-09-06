import toast from "react-hot-toast";

type ToastType = "success" | "error" | "loading" | "default";

export const showToast = (
    message: string,
    type: ToastType = "default"
) => {
    console.log(message, type);

    switch (type) {
        case "success":
            toast.success(message);
            break;
        case "error":
            toast.error(message);
            break;
        case "loading":
            toast.loading(message);
            break;
        default:
            toast(message);
    }
};
