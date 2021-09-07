const { v4: uuid } = require('uuid');

const contacts = [
  {
    id: uuid(),
    name: 'Gabriel',
    email: 'gabriel@mail.com',
    phone: '123123123',
    category_id: uuid(),
  },
];

class ContactsRepository {
  findAll() {
    return new Promise((resolve) => resolve(contacts));
  }
}

module.exports = new ContactsRepository();
