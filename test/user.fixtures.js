function makeUserArray() {
  return [
    {
      id: 1,
      user_name: 'Test1',
      full_name: 'Test1',
      password: 'testPassword1!',
    },
    {
      id: 2,
      user_name: 'Test2',
      full_name: 'Test1',
      password: 'testPassword1!',
    },
    {
      id: 3,
      user_name: 'Test3',
      full_name: 'Test1',
      password: 'testPassword1!',
    },
    {
      id: 4,
      user_name: 'Test4',
      full_name: 'Test1',
      password: 'testPassword1!',
    },
  ];
}

function makeMaliciousUser() {
  const maliciousUser = {
    user_name: 'Naughty naughty very naughty <script>alert("xss");</script>',
    password: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`,
  };
  const expectedUser = {
    ...maliciousUser,
    user_name:
      'Naughty naughty very naughty &lt;script&gt;alert("xss");&lt;/script&gt;',
    password: `Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`,
  };
  return {
    maliciousUser,
    expectedUser,
  };
}

function cleanTables(db) {
  return db.transaction((trx) =>
    trx
      .raw(
        `TRUNCATE
        geb_users,
        geb_grids,
        geb_templates
      `
      )
      .then(() =>
        Promise.all([
          trx.raw(`ALTER SEQUENCE geb_users_id_seq minvalue 0 START WITH 1`),
          trx.raw(`ALTER SEQUENCE geb_grids_id_seq minvalue 0 START WITH 1`),
          trx.raw(
            `ALTER SEQUENCE geb_templates_id_seq minvalue 0 START WITH 1`
          ),
          trx.raw(`SELECT setval('geb_users_id_seq', 0)`),
          trx.raw(`SELECT setval('geb_grids_id_seq ', 0)`),
          trx.raw(`SELECT setval('geb_templates_id_seq ', 0)`),
        ])
      )
  );
}

module.exports = {
  makeUserArray,
  makeMaliciousUser,
  cleanTables,
};
