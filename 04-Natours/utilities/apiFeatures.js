class APIFeautures {
  constructor(query, expressQueryObj) {
    this.query = query;
    this.expressQueryObj = expressQueryObj;
  }

  filter() {
    const queryObj = { ...this.expressQueryObj };
    const excludedFields = ['sort', 'fields', 'page', 'limit'];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    if (this.expressQueryObj.sort) {
      const sortBy = this.expressQueryObj.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  limit() {
    if (this.expressQueryObj.fields) {
      const limitStr = this.expressQueryObj.fields.split(',').join('');
      this.query = this.query.select(limitStr);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  paginate() {
    const limit = this.expressQueryObj.limit * 1 || 100;
    const page = this.expressQueryObj.page * 1 || 1;
    const skipedCount = (page - 1) * limit;
    this.query = this.query.skip(skipedCount).limit(limit);
    return this;
  }
}

module.exports = APIFeautures;
