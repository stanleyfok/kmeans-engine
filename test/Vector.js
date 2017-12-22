const chai = require('chai');

const should = chai.should();
const Vector = require('../lib/Vector');

const set1 = { a: 1, b: 2, c: 3 };
const set2 = { b: 2, c: 1, d: 2 };

describe('Vector', () => {
  describe('clone()', () => {
    it('should be able to clone a vector', () => {
      const a = new Vector(set1);
      const v = a.clone();

      v.should.to.deep.equal(a);
    });
  });

  describe('getKeys()', () => {
    it('should be able to getKeys of a vector', () => {
      const a = new Vector(set1);
      const keys = a.getKeys();

      keys.should.to.have.members(['a', 'b', 'c']);
      keys.should.to.have.lengthOf(3);
    });
  });

  describe('get(key)', () => {
    it('should be able to get the value of a key', () => {
      const a = new Vector(set1);

      a.get('a').should.to.be.equal(1);
      a.get('b').should.to.be.equal(2);
      a.get('c').should.to.be.equal(3);
    });
  });

  describe('set(key, value)', () => {
    it('should be able to set the value of a key', () => {
      const a = new Vector(set1);
      a.set('a', 10);

      const newSet = Object.assign({}, set1);
      newSet.a = 10;
      const b = new Vector(newSet);

      a.should.to.deep.equal(b);
    });
  });

  describe('toObject()', () => {
    it('should be able to convert vector to object', () => {
      const a = new Vector(set1);

      a.toObject().should.to.deep.equal(set1);
    });
  });

  describe('isEqual(vector)', () => {
    it('should be able to check if target vector is equal to itself', () => {
      const a = new Vector(set1);
      const b = new Vector(set2);

      a.isEqual(a).should.to.be.equal(true);
      a.isEqual(b).should.to.be.equal(false);
    });
  });

  describe('getDistance(vector)', () => {
    const a = new Vector(set1);
    const b = new Vector(set2);
    const d = a.getDistance(b);

    it('should be able to calculate the distane to the target vector', () => {
      d.should.to.be.equal(3);
    });

    it('the vectors under operation should be untouched', () => {
      a.toObject().should.to.deep.equal(set1);
    });
  });

  describe('getLength()', () => {
    const a = new Vector(set1);
    const l = a.getLength();

    it('should be able to the length of itself', () => {
      l.should.to.be.equal(Math.sqrt(14));
    });

    it('the vectors under operation should be untouched', () => {
      a.toObject().should.to.deep.equal(set1);
    });
  });

  describe('normalize()', () => {
    const a = new Vector(set1);
    const v = a.normalize();

    it('should be able to get a normalized vector', () => {
      const l = Math.sqrt(14);

      v.toObject().should.to.deep.equal({ a: 1 / l, b: 2 / l, c: 3 / l });
    });

    it('the vectors under operation should be untouched', () => {
      a.toObject().should.to.deep.equal(set1);
    });
  });

  describe('add(vector)', () => {
    const a = new Vector(set1);
    const b = new Vector(set2);
    const v = a.add(b);

    it('should be able to add two vector', () => {
      v.toObject().should.to.deep.equal({
        a: 1, b: 4, c: 4, d: 2,
      });
    });

    it('the vectors under operation should be untouched', () => {
      a.toObject().should.to.deep.equal(set1);
      b.toObject().should.to.deep.equal(set2);
    });
  });

  describe('subtract(vector)', () => {
    const a = new Vector(set1);
    const b = new Vector(set2);
    const v = a.subtract(b);

    it('should be able to subtract two vector', () => {
      v.toObject().should.to.deep.equal({
        a: 1, b: 0, c: 2, d: -2,
      });
    });

    it('the vectors under operation should be untouched', () => {
      a.toObject().should.to.deep.equal(set1);
      b.toObject().should.to.deep.equal(set2);
    });
  });

  describe('multiply(vector)', () => {
    const a = new Vector(set1);
    const v = a.multiply(10);

    it('should be able to multiply a vector', () => {
      v.toObject().should.to.deep.equal({ a: 10, b: 20, c: 30 });
    });

    it('the vectors under operation should be untouched', () => {
      a.toObject().should.to.deep.equal(set1);
    });
  });

  describe('divide(vector)', () => {
    const a = new Vector(set1);
    const v = a.divide(10);

    it('should be able to divide a vector', () => {
      v.toObject().should.to.deep.equal({ a: 0.1, b: 0.2, c: 0.3 });
    });

    it('the vectors under operation should be untouched', () => {
      a.toObject().should.to.deep.equal(set1);
    });
  });

  describe('getDotProduct(vector)', () => {
    const a = new Vector(set1);
    const b = new Vector(set2);

    it('should be able to get dot product with the target vector', () => {
      a.getDotProduct(b).should.to.be.equal(7);
    });

    it('the vectors under operation should be untouched', () => {
      a.toObject().should.to.deep.equal(set1);
      b.toObject().should.to.deep.equal(set2);
    });
  });
});
