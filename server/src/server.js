require('./config/environment')
const app = require('./app')
const { port } = require('./config/environment')

app.listen(port, () => {
  console.log(`PortfolioHub server running on port ${port}`)
})
