const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

app.listen(config.PORT, () => {
  console.log(`Server is up and running at port ${config.PORT}`)
})
