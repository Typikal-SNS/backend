const swaggerUi = require("swagger-ui-express")
const swaggereJsdoc = require("swagger-jsdoc")
const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      version: "0.0.1",
      title: "Typikal-SNS",
    },
    servers: [
      {
        url: 'typikal-api-docs', // 요청 URL
      },
    ],
  },
  apis: ["./routes/*.js"], //Swagger 파일 연동
}
const specs = swaggereJsdoc(options)
module.exports = { swaggerUi, specs }