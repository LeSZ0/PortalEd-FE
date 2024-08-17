import { z } from "zod";

export const filterFormSchema = z.object({
    name: z.string(),
    order_by: z.string(),
});

export type FilterFormSchema = typeof filterFormSchema;
