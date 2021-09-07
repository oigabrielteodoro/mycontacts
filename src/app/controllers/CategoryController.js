const CategoriesRepository = require('../repositories/CategoriesRepository');

class CategoryController {
  index(request, response) {
    response.send('ok - index');
  }

  async store(request, response) {
    const { name } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const category = await CategoriesRepository.create({ name });

    response.json(category);
  }
}

module.exports = new CategoryController();
