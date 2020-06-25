const GridsService = require('../src/grids/grids-service');
const knex = require('knex');

describe(`Grids service object`, function () {
  let db;
  //
  let testGrids = [
    {
      id: 1,
      template_id: null,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
      x: '4,9',
      y: '9,13',
      partial_transect_length: 5,
      x_partial: '3,7',
      y_partial: '14,17',
      user_id: null,
    },
    {
      id: 2,
      template_id: null,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
      x: '8,20',
      y: '13,20',
      partial_transect_length: 5,
      x_partial: '20,4',
      y_partial: '29,8',
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
          template_id: secondTestGrid.template_id,
          x: secondTestGrid.x,
          y: secondTestGrid.y,
          date_created: secondTestGrid.date_created,
          partial_transect_length: secondTestGrid.partial_transect_length,
          x_partial: secondTestGrid.x_partial,
          y_partial: secondTestGrid.y_partial,
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
        partial_transect_length: 5,
        x_partial: '18,11',
        y_partial: '29,21',
        user_id: null,
        template_id: null,
      };
      return GridsService.insertGrid(db, newGrid).then((actual) => {
        expect(actual).to.eql({
          id: 1,
          template_id: newGrid.template_id,
          x: newGrid.x,
          y: newGrid.y,
          date_created: newGrid.date_created,
          partial_transect_length: newGrid.partial_transect_length,
          x_partial: newGrid.x_partial,
          y_partial: newGrid.y_partial,
          user_id: newGrid.user_id,
        });
      });
    });
  });
});
