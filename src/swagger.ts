import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import { itemJsonSchema } from "./modules/items/items.schema";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express API with TypeScript",
      version: "1.0.0",
      description:
        "A simple CRUD API application made with Express and TypeScript",
    },
    components: {
      schemas: {
        Item: itemJsonSchema,
      },
    },
    servers: [
      {
        url: "http://localhost:3000/api",
      },
    ],
  },
  apis: ["./src/modules/*/*.*.ts"], // Paths to files containing OpenAPI definitions
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
