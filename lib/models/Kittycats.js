const pool = require('../utils/pool');

module.exports = class Kittycat {
    id;
    breed;
    description;
    url;

    constructor(row) {
      this.id = row.id;
      this.breed = row.breed;
      this.description = row.description;
      this.url = row.url;

    }

    // this is where the CRDU methods happen
    static async insert({ breed, description, url }) {
      const { rows } = await pool.query(
        'INSERT INTO kittycats (breed, description, url) VALUES ($1, $2, $3) RETURNING *',
        [breed, description, url]
      );

      return new Kittycat(rows[0]);
    }

    static async findById(id) {
      const { rows } = await pool.query(
        `SELECT * FROM kittycats 
        WHERE id=$1`,
        [id]
      );


      if(!rows[0]) throw new Error(`No kitties with id ${id}`);
      return new Kittycat(rows[0]);
    }

    static async find() {
      const { rows } = await pool.query(
        `SELECT * 
        FROM kittycats`
      );
        
      if(!rows[0]) throw new Error('No kitties');
      return rows.map(row => new Kittycat(row)
      );
    }

    static async update(id, { breed, description, url }) {
      const { rows } = await pool.query(
        `UPDATE kittycats
                SET breed=$1,
                    description=$2,
                    url=$3
                WHERE id=$4
                RETURNING *
            `,
        [breed, description, url, id]
      );

      return new Kittycat(rows[0]);
    }

    static async delete(id) {
      const { rows } = await pool.query(
        `DELETE FROM kittycats 
        WHERE id=$1 
        RETURNING *`,
        [id]
      );

      return new Kittycat(rows[0]);
    }
};
