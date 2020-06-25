function cleanTables(db) {
  return db.raw(
    `TRUNCATE
      geb_grids,
      geb_templates,
      geb_users
      RESTART IDENTITY CASCADE`
  );
}

module.exports = {
  cleanTables,
};
