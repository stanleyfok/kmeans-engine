const _ = require('underscore');

class Vector {
  constructor(vector) {
    this.vector = vector || {};
  }

  clone() {
    return new Vector(Object.assign({}, this.toObject()));
  }

  getKeys() {
    return Object.keys(this.vector);
  }

  toObject() {
    return this.vector;
  }

  isEqual(vector) {
    return _.isEqual(this.vector, vector.toObject());
  }

  getDistance(vector) {
    const tmpVector = this.clone().subtract(vector);
    const tmp = tmpVector.toObject();
    let d = 0;

    tmpVector.getKeys().forEach((k) => {
      // only need to consider the overlapping keys
      d += tmp[k] * tmp[k];
    });

    return Math.sqrt(d);
  }

  add(vector) {
    const tmp = vector.toObject();

    vector.getKeys().forEach((k) => {
      if (this.vector[k] === undefined) { this.vector[k] = 0; }

      this.vector[k] += tmp[k];
    });

    return this;
  }

  subtract(vector) {
    const tmp = vector.toObject();

    vector.getKeys().forEach((k) => {
      if (this.vector[k] === undefined) { this.vector[k] = 0; }

      this.vector[k] -= tmp[k];
    });

    return this;
  }

  multiply(c) {
    this.getKeys().forEach((k) => {
      this.vector[k] *= c;
    });

    return this;
  }

  divide(c) {
    this.getKeys().forEach((k) => {
      this.vector[k] /= c;
    });

    return this;
  }
}

module.exports = Vector;
