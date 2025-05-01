/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
                ALTER TABLE comments
                RENAME COLUMN contents TO body
        `);
};

exports.down = (pgm) => {
  pgm.sql(`
        ALTER TABLE comments
        RENAME COLUMN body TO contents
`);
};
