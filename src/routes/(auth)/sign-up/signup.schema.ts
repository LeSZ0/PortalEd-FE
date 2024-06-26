import { z } from "zod";

export const signUpFormSchema = z.object({
    username: z.string({
        required_error: "El usuario es obligatorio"
    }),
    email: z.string({
        required_error: "El email es obligatorio"
    }).email("El email es inválido"),
    password: z.string({
        required_error: "La contraseña es obligatoria"
    }),
    passwordConfirm: z.string({
        required_error: "La contraseña es obligatoria"
    }),
    fullname: z.string({
        required_error: "El nombre es obligatorio"
    }),
    dni: z.string({
        required_error: "El DNI es obligatorio"
    }).min(
        7, "El DNI debe contener al menos 7 caracteres"
    ).max(10, "El DNI no puede superar los 10 caracteres"),
    birth_date: z.string({
        required_error: "La fecha de nacimiento es obligatoria"
    })
}).refine(data => data.password === data.passwordConfirm, {
    message: "Las contraseñas deben coincidir",
    path: ["passwordConfirm"],
})

export type SignUpFormSchema = typeof signUpFormSchema;
