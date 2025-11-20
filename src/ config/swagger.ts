import swaggerJsdoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Auth API",
      version: "1.0.0",
      description: "User login, register, logout",
    },
    servers: [{ url: "http://localhost:4000" }],
  },
  apis: ["./src/routes/*.ts"], // Routes will contain swagger docs
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default swaggerSpec;
