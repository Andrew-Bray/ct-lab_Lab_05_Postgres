
require('dotenv').config();
const app = require('./index');

const PORT = 1234;

app.listen(PORT, () => {
  console.log(`started on PORT ${PORT}`);
});
