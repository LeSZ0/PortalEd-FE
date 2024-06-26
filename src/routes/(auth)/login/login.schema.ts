import { z } from "zod";

export const loginFormSchema = z.object({
    username: z.string({
        required_error: "El usuario es obligatorio"
    }),
    password: z.string({
        required_error: "La contraseña es obligatoria"
    }),
})

export type LoginFormSchema = typeof loginFormSchema;
