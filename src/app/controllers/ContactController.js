const ContactsRepository = require('../repositories/ContactsRepository');

class ContactController {
  index(request, response) {
    const contacts = ContactsRepository.findAll();

    response.json(contacts);
  }
}

// Singleton
module.exports = new ContactController();
