const chai = require('chai');

const should = chai.should();
const Vector = require('../lib/Vector');

const a = new Vector({ a: 1, b: 2, c: 3 });
const b = new Vector({ b: 2, c: 1, d: 2 });

describe('Vector', () => {
  describe('clone()', () => {
    it('should be able to clone a vector', () => {
      const v = a.clone();
      v.should.to.deep.equal(a);
    });
  });

  describe('getKeys()', () => {
    it('should be able to getKeys of a vector', () => {
      const keys = a.getKeys();
      keys.should.to.have.members(['a', 'b', 'c']);
      keys.should.to.have.lengthOf(3);
    });
  });

  describe('toObject()', () => {
    it('should be able to convert vector to object', () => {
      a.toObject().should.to.deep.equal({ a: 1, b: 2, c: 3 });
    });
  });

  describe('isEqual()', () => {
    it('should be able to check if target vector is equal to itself', () => {
      a.isEqual(a).should.to.be.equal(true);
      a.isEqual(b).should.to.be.equal(false);
    });
  });

  describe('getDistance()', () => {
    const d = a.getDistance(b);

    it('should be able to calculate the distane to the target vector', () => {
      d.should.to.be.equal(3);
    });

    it('the vectors under operation should be untouched', () => {
      a.toObject().should.to.deep.equal({ a: 1, b: 2, c: 3 });
    });
  });

  describe('getLength()', () => {
    const l = a.getLength();

    it('should be able to the length of itself', () => {
      l.should.to.be.equal(Math.sqrt(14));
    });

    it('the vectors under operation should be untouched', () => {
      a.toObject().should.to.deep.equal({ a: 1, b: 2, c: 3 });
    });
  });

  describe('normalize()', () => {
    const v = a.normalize();

    it('should be able to get a normalized vector', () => {
      const l = Math.sqrt(14);

      v.toObject().should.to.deep.equal({ a: 1 / l, b: 2 / l, c: 3 / l });
    });

    it('the vectors under operation should be untouched', () => {
      a.toObject().should.to.deep.equal({ a: 1, b: 2, c: 3 });
    });
  });

  describe('add()', () => {
    const v = a.add(b);

    it('should be able to add two vector', () => {
      v.toObject().should.to.deep.equal({
        a: 1, b: 4, c: 4, d: 2,
      });
    });

    it('the vectors under operation should be untouched', () => {
      a.toObject().should.to.deep.equal({ a: 1, b: 2, c: 3 });
      b.toObject().should.to.deep.equal({ b: 2, c: 1, d: 2 });
    });
  });

  describe('subtract()', () => {
    const v = a.subtract(b);

    it('should be able to subtract two vector', () => {
      v.toObject().should.to.deep.equal({
        a: 1, b: 0, c: 2, d: -2,
      });
    });

    it('the vectors under operation should be untouched', () => {
      a.toObject().should.to.deep.equal({ a: 1, b: 2, c: 3 });
      b.toObject().should.to.deep.equal({ b: 2, c: 1, d: 2 });
    });
  });

  describe('multiply()', () => {
    const v = a.multiply(10);

    it('should be able to multiply a vector', () => {
      v.toObject().should.to.deep.equal({ a: 10, b: 20, c: 30 });
    });

    it('the vectors under operation should be untouched', () => {
      a.toObject().should.to.deep.equal({ a: 1, b: 2, c: 3 });
    });
  });

  describe('divide()', () => {
    const v = a.divide(10);

    it('should be able to divide a vector', () => {
      v.toObject().should.to.deep.equal({ a: 0.1, b: 0.2, c: 0.3 });
    });

    it('the vectors under operation should be untouched', () => {
      a.toObject().should.to.deep.equal({ a: 1, b: 2, c: 3 });
    });
  });
});
