import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Todo API",
      version: "1.0.0",
      description: "API documentation for the Todo application",
    },
    servers: [
      {
        url: "https://todo-api-documentation.onrender.com/api-docs/",
      },
    ],
    
    tags: [
      {
        name: "Users",
        description: "User authentication and profile management",
      },
      {
        name: "Todos",
        description: "Todo management and tracking",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export const swaggerDocs = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("✅ Swagger docs available at http://localhost:5000/api-docs");
};
