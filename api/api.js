
const { swaggerUi, specs } = require("./swagger/swagger");
const express = require('express')
const app = express()

app.use("/", swaggerUi.serve, swaggerUi.setup(specs))
app.listen(8080, () => {
  console.log(' 8080 포트에서 api 확인 가능')
})