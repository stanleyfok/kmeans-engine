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
    return Object.assign({}, this.vector);
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

  getLength() {
    let l = 0;

    this.getKeys().forEach((k) => {
      l += this.vector[k] * this.vector[k];
    });

    return Math.sqrt(l);
  }

  normalize() {
    const result = this.clone();
    const l = result.getLength();

    return result.divide(l);
  }

  add(vector) {
    const result = this.toObject();
    const target = vector.toObject();

    vector.getKeys().forEach((k) => {
      if (result[k] === undefined) { result[k] = 0; }

      result[k] += target[k];
    });

    return new Vector(result);
  }

  subtract(vector) {
    const result = this.toObject();
    const target = vector.toObject();

    vector.getKeys().forEach((k) => {
      if (result[k] === undefined) { result[k] = 0; }

      result[k] -= target[k];
    });

    return new Vector(result);
  }

  multiply(c) {
    const result = this.toObject();

    this.getKeys().forEach((k) => {
      result[k] *= c;
    });

    return new Vector(result);
  }

  divide(c) {
    const result = this.toObject();

    this.getKeys().forEach((k) => {
      result[k] /= c;
    });

    return new Vector(result);
  }
}

module.exports = Vector;
