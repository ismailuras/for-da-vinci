import { type Resolver } from "react-hook-form";
import type { CreatePostValues } from "./types";

export const resolver: Resolver<CreatePostValues> = async (values) => {
    return {
        values: values.title && values.body ? values : {},
        errors: {
            ...(!values.title && {
                title: {
                    type: "required",
                    message: "This field required.",
                },
            }),
            ...(!values.body && {
                body: {
                    type: "required",
                    message: "This field required.",
                },
            }),
        },
    };
};