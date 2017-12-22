class Vector {
  constructor(vector) {
    this.vector = vector || {};
  }

  clone() {
    return new Vector(this.toObject());
  }

  getKeys() {
    return Object.keys(this.vector);
  }

  get(key) {
    return this.vector[key];
  }

  set(key, value) {
    this.vector[key] = value;
  }

  toObject() {
    return Object.assign({}, this.vector);
  }

  isEqual(vector) {
    const target = vector.toObject();
    const keys = this.getKeys();

    for (let i = 0; i < keys.length; i += 1) {
      const k = keys[i];

      if (this.vector[k] !== target[k]) {
        return false;
      }
    }

    return true;
  }

  getDistance(vector) {
    const tmpVector = this.clone().subtract(vector);
    const tmp = tmpVector.toObject();
    let d = 0;

    tmpVector.getKeys().forEach((k) => {
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

  getDotProduct(vector) {
    const target = vector.toObject();
    let dotProduct = 0;

    this.getKeys().forEach((k) => {
      if (target[k] !== undefined) {
        dotProduct += this.vector[k] * target[k];
      }
    });

    return dotProduct;
  }
}

module.exports = Vector;
