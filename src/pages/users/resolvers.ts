import { type Resolver } from "react-hook-form";
import type { CreateUserValues } from "./types";

export const createUserResolver: Resolver<CreateUserValues> = async (values) => {
    return {
        values: values.name ? values : {},
        errors: !values.name
            ? {
                name: {
                    type: "required",
                    message: "This field required.",
                },
            }
            : {},
    };
};
