const { v4: uuid } = require('uuid');

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
  findAll() {
    return new Promise((resolve) => resolve(contacts));
  }

  findById(id) {
    return new Promise((resolve) => resolve(
      contacts.find((contact) => contact.id === id),
    ));
  }

  findByEmail(email) {
    return new Promise((resolve) => resolve(
      contacts.find((contact) => contact.email === email),
    ));
  }

  delete(id) {
    return new Promise((resolve) => {
      contacts = contacts.filter((contact) => contact.id !== id);
      resolve();
    });
  }

  create({
    name, email, phone, category_id,
  }) {
    return new Promise((resolve) => {
      const contact = {
        id: uuid(), name, email, phone, category_id,
      };

      contacts = [...contacts, contact];
      resolve(contact);
    });
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
