
require('dotenv').config();
const app = require('./index');

const PORT = 5432;

app.listen(PORT, () => {
  console.log(`started on PORT ${PORT}`);
});
