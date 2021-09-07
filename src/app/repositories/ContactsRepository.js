const { v4: uuid } = require('uuid');

const db = require('../../database');

let contacts = [
  {
    id: uuid(),
    name: 'Gabriel',
    email: 'gabriel@mail.com',
    phone: '123123123',
    category_id: uuid(),
  },
  {
    id: uuid(),
    name: 'Mateus',
    email: 'mateus@mail.com',
    phone: '123123123',
    category_id: uuid(),
  },
];

class ContactsRepository {
  async findAll() {
    const rows = await db.query('SELECT * FROM contacts');
    return rows;
  }

  async findById(id) {
    const [row] = await db.query('SELECT * FROM contacts WHERE id = $1', [id]);
    return row;
  }

  async findByEmail(email) {
    const [row] = await db.query('SELECT * FROM contacts WHERE email = $1', [email]);
    return row;
  }

  delete(id) {
    return new Promise((resolve) => {
      contacts = contacts.filter((contact) => contact.id !== id);
      resolve();
    });
  }

  async create({
    name, email, phone,
  }) {
    const [row] = await db.query(`
      INSERT INTO contacts(name, email, phone)
      VALUES($1, $2, $3)
      RETURNING *
    `, [name, email, phone]);

    return row;
  }

  update(id, {
    name, email, phone, category_id,
  }) {
    return new Promise((resolve) => {
      const updatedContact = {
        id, name, email, phone, category_id,
      };

      contacts = contacts.map((contact) => (
        contact.id === id ? updatedContact : contact
      ));

      resolve(updatedContact);
    });
  }
}

module.exports = new ContactsRepository();
