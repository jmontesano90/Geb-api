const TemplatesService = require('../src/templates/templates-service');
const knex = require('knex');
const helpers = require('./test-helpers');

describe(`templates service objects`, function () {
  let db;

  let testTemplates = [
    {
      id: 1,
      user_id: null,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
      name: 'Joe',
      transect_count: 5,
      minimum: 3,
      partial_transect_count: 1,
      partial_transect_length: 5,
    },
    {
      id: 2,
      user_id: null,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
      name: 'John',
      transect_count: 4,
      minimum: 4,
      partial_transect_count: 1,
      partial_transect_length: 7,
    },
  ];

  before(() => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    });
  });

  before('cleanup', () => helpers.cleanTables(db));

  afterEach('cleanup', () => helpers.cleanTables(db));

  after(() => db.destroy());

  context(`Given 'geb_templates' has data`, () => {
    beforeEach(() => {
      return db.into('geb_templates').insert(testTemplates);
    });
    it(`getAllTemplates() resolves all templates from 'geb_templates' table`, () => {
      return TemplatesService.getAllTemplates(db).then((actual) => {
        expect(actual).to.eql(testTemplates);
      });
    });

    it(`getById() resolves a template by id from 'geb_templates' table`, () => {
      const secondId = 2;
      const secondTestTemplate = testTemplates[secondId - 1];
      return TemplatesService.getById(db, secondId).then((actual) => {
        expect(actual).to.eql({
          id: secondTestTemplate.id,
          user_id: null,
          date_created: secondTestTemplate.date_created,
          name: secondTestTemplate.name,
          transect_count: secondTestTemplate.transect_count,
          minimum: secondTestTemplate.minimum,
          partial_transect_count: secondTestTemplate.partial_transect_count,
          partial_transect_length: secondTestTemplate.partial_transect_length,
        });
      });
    });

    it(`deleteTemplate() removes a template by id from 'geb_templates' table`, () => {
      const templateId = 2;
      return TemplatesService.deleteTemplate(db, templateId)
        .then(() => TemplatesService.getAllTemplates(db))
        .then((allTemplates) => {
          // copy the test articles array without the "deleted" article
          const expected = testTemplates.filter(
            (template) => template.id !== templateId
          );
          expect(allTemplates).to.eql(expected);
        });
    });
  });

  context(`Given 'geb_templates' has no data`, () => {
    it(`getAllTemplates() resolves an empty array`, () => {
      return TemplatesService.getAllTemplates(db).then((actual) => {
        expect(actual).to.eql([]);
      });
    });
    it(`insertTemplate() inserts a new template and resolves the new template with an 'id'`, () => {
      const newTemplate = {
        user_id: null,
        date_created: new Date('2029-01-22T16:28:32.615Z'),
        name: 'TEST',
        transect_count: 8,
        minimum: 4,
        partial_transect_count: 2,
        partial_transect_length: 6,
      };
      return TemplatesService.insertTemplate(db, newTemplate).then((actual) => {
        expect(actual).to.eql({
          id: 1,
          user_id: null,
          date_created: newTemplate.date_created,
          name: newTemplate.name,
          transect_count: newTemplate.transect_count,
          minimum: newTemplate.minimum,
          partial_transect_count: newTemplate.partial_transect_count,
          partial_transect_length: newTemplate.partial_transect_length,
        });
      });
    });
  });
});
