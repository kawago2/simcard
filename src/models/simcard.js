// models/Simcard.js
import pool from '../configs/database.js';

class Simcard {
  constructor({ id, number, operator, balance, createdAt, updatedAt }) {
    this.id = id;
    this.number = number;
    this.operator = operator;
    this.balance = balance;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static async findAll() {
    const [rows] = await pool.query('SELECT * FROM ??', ['Simcards']);
    return rows.map(row => new Simcard(row));
  }

  static async findByPk(id) {
    const [rows] = await pool.query('SELECT * FROM ?? WHERE id = ?', ['Simcards', id]);

    if (rows.length === 0) {
      return null;
    }

    return new Simcard(rows[0]);
  }

  async save() {
    const { id, ...data } = this;

    if (id) {
      // Update existing record
      await pool.query('UPDATE ?? SET ? WHERE id = ?', ['Simcards', data, id]);
    } else {
      // Insert new record
      const [result] = await pool.query('INSERT INTO ?? SET ?', ['Simcards', data]);
      this.id = result.insertId;
    }
  }
}

export default Simcard;
