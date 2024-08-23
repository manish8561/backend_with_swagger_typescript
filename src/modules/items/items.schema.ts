import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

export const itemSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    description: z.string().min(1, { message: "Description is required" }),
  })
  .describe("My neat object schema");

export type ItemSchema = z.infer<typeof itemSchema>;

// Convert the Zod schema to JSON Schema
export const itemJsonSchema = zodToJsonSchema(itemSchema, "Item");
