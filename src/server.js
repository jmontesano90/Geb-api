const app = require('./app');
const knex = require('knex');
const { PORT, DATABASE_URL } = require('./config');
const GridsService = require('./grids/grids-service');

const db = knex({
  client: 'pg',
  connection: DATABASE_URL,
});

//console.log(GridsService.getAllGrids());

app.set('db', db);

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
