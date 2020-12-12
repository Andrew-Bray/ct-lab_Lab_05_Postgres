const pool = require('../utils/pool');

module.exports = class Fish {
    id;
    species;
    description;

    constructor(row) {
      this.id = row.id;
      this.species = row.species;
      this.description = row.description;

    }

    static async insert({ species, description }) {
      const { rows } = await pool.query(
        `INSERT INTO fishies (species, description)
      VALUES ($1, $2) RETURNING *`,
        [species, description]
      );

      return new Fish(rows[0]);
    }

    static async findById(id) {
      const { rows } = await pool.query(
        `SELECT * FROM fishies
    WHERE id=$1`,
        [id]
      );

      if(!rows[0]) throw new Error('where\'s my super fish?');
      return new Fish(rows[0]);
    }

    static async find() {
      const { rows } = await pool.query(
        `SELECT * 
        FROM fishies`
      );

      if(!rows[0]) throw new Error('where\'s my super fish?');
      return rows.map(row => new Fish(row));
    }

    static async update( id, { species, description }) {
      const { rows } = await pool.query(
        `UPDATE fishies
          SET species=$1,
              description=$2,
          WHERE id=$3
          RETURNING *`,
        [species, description, id]
      );

      return new Fish(rows[0]);
    }

    static async delete(id) {
      const { rows } = await pool.query(
        `DELETE * FROM fishies
          WHERE id=$1
          RETURNING *`,
        [id]
      );

      return new Fish(rows[0]);
    }
};
