const GridsService = require('../src/grids/grids-service');
const knex = require('knex');

describe(`Grids service object`, function () {
  let db;
  //
  let testGrids = [
    {
      id: 1,
      grid_id: null,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
      x: '4,9',
      y: '9,13',
      direction: '0,0',
      partial_transect_length: 5,
      partial_transect_count: 2,
      x_partial: '3,7',
      y_partial: '14,17',
      transect_count: 4,
      minimum: 3,
      comment: 'yeah im the best',
      user_id: null,
    },
    {
      id: 2,
      grid_id: null,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
      x: '8,20',
      y: '13,20',
      direction: '2,1',
      partial_transect_length: 5,
      partial_transect_count: 2,
      x_partial: '20,4',
      y_partial: '29,8',
      transect_count: 4,
      minimum: 3,
      comment: 'john sucks lol',
      user_id: null,
    },
  ];

  before(() => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    });
  });

  before(() => db('geb_grids').truncate());

  afterEach(() => db('geb_grids').truncate());

  after(() => db.destroy());

  context(`Given 'geb_grids' has data`, () => {
    beforeEach(() => {
      return db.into('geb_grids').insert(testGrids);
    });
    it(`getAllGrids() resolves all grids from 'geb_grids' table`, () => {
      return GridsService.getAllGrids(db).then((actual) => {
        expect(actual).to.eql(testGrids);
      });
    });

    it(`getById() resolves a grid by id from 'geb_grids' table`, () => {
      const secondId = 2;
      const secondTestGrid = testGrids[secondId - 1];
      return GridsService.getById(db, secondId).then((actual) => {
        expect(actual).to.eql({
          id: secondId,
          grid_id: secondTestGrid.grid_id,
          x: secondTestGrid.x,
          y: secondTestGrid.y,
          comment: secondTestGrid.comment,
          date_created: secondTestGrid.date_created,
          direction: secondTestGrid.direction,
          partial_transect_count: secondTestGrid.partial_transect_count,
          partial_transect_length: secondTestGrid.partial_transect_length,
          x_partial: secondTestGrid.x_partial,
          y_partial: secondTestGrid.y_partial,
          transect_count: secondTestGrid.transect_count,
          minimum: secondTestGrid.minimum,
          user_id: secondTestGrid.user_id,
        });
      });
    });

    it(`deleteGrid() removes a grid by id from 'geb_grids' table`, () => {
      const gridId = 2;
      return GridsService.deleteGrid(db, gridId)
        .then(() => GridsService.getAllGrids(db))
        .then((allGrids) => {
          // copy the test articles array without the "deleted" article
          const expected = testGrids.filter((grid) => grid.id !== gridId);
          expect(allGrids).to.eql(expected);
        });
    });
  });

  context(`Given 'geb_grids' has no data`, () => {
    it(`getAllGrids() resolves an empty array`, () => {
      return GridsService.getAllGrids(db).then((actual) => {
        expect(actual).to.eql([]);
      });
    });
    it(`insertGrid() inserts a new grid and resolves the new grid with an 'id'`, () => {
      const newGrid = {
        date_created: new Date('2029-01-22T16:28:32.615Z'),
        x: '17,23,30',
        y: '17',
        direction: '1,2',
        partial_transect_length: 5,
        partial_transect_count: 2,
        x_partial: '18,11',
        y_partial: '29,21',
        transect_count: 4,
        minimum: 3,
        comment: 'john smell lmao',
        user_id: null,
        grid_id: null,
      };
      console.log(newGrid);
      return GridsService.insertGrid(db, newGrid).then((actual) => {
        expect(actual).to.eql({
          id: 1,
          grid_id: newGrid.grid_id,
          x: newGrid.x,
          y: newGrid.y,
          comment: newGrid.comment,
          date_created: newGrid.date_created,
          direction: newGrid.direction,
          partial_transect_count: newGrid.partial_transect_count,
          partial_transect_length: newGrid.partial_transect_length,
          x_partial: newGrid.x_partial,
          y_partial: newGrid.y_partial,
          transect_count: newGrid.transect_count,
          minimum: newGrid.minimum,
          user_id: newGrid.user_id,
        });
      });
    });
  });
});
