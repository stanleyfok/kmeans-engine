const chai = require('chai');

const should = chai.should();
const kmeans = require('../');

const set1 = require('../fixtures/engineers');
const set2 = require('../fixtures/2d-numbers');

describe('KMeansEngine', () => {
  describe('input validation', () => {
    it('should only accept array of objects', () => {
      (() => {
        kmeans.clusterize([[1, 2, 3], [4, 5, 6]], { k: 3 }, () => {});
      }).should.to.throw('Vectors should be array of objects');

      (() => {
        kmeans.clusterize([() => {}, () => {}], { k: 3 }, () => {});
      }).should.to.throw('Vectors should be array of objects');

      (() => {
        kmeans.clusterize(['abc', 'def'], { k: 3 }, () => {});
      }).should.to.throw('Vectors should be array of objects');

      (() => {
        kmeans.clusterize([123, 456.7], { k: 3 }, () => {});
      }).should.to.throw('Vectors should be array of objects');

      (() => {
        kmeans.clusterize([true, true], { k: 3 }, () => {});
      }).should.to.throw('Vectors should be array of objects');
    });

    it('should only accept cluster size be positive integer', () => {
      (() => {
        kmeans.clusterize(set1, { k: -1 }, () => {});
      }).should.to.throw('Cluster size should be a positive integer');
    });

    it('should only accept cluster size smaller than vector size', () => {
      (() => {
        kmeans.clusterize(set1, { k: set1.length + 1 }, () => {});
      }).should.to.throw('Cluster size should be smaller than the vector size');
    });
  });

  describe('clusterize result', () => {
    it('should return a correct object structure for data set 1', (done) => {
      kmeans.clusterize(set1, { k: 4 }, (err, res) => {
        should.not.exist(err);
        res.should.to.have.property('iterations');
        res.should.to.have.property('clusters');

        res.clusters.should.to.have.lengthOf(4);
        res.clusters.forEach((cluster) => {
          cluster.should.to.have.property('centroid');
          cluster.should.to.have.property('vectorIds');
        });

        done();
      });
    });

    it('should return a correct object structure for data set 2', (done) => {
      kmeans.clusterize(set2, { k: 3 }, (err, res) => {
        should.not.exist(err);
        res.should.to.have.property('iterations');
        res.should.to.have.property('clusters');

        res.clusters.should.to.have.lengthOf(3);
        res.clusters.forEach((cluster) => {
          cluster.should.to.have.property('centroid');
          cluster.should.to.have.property('vectorIds');
        });

        done();
      });
    });
  });
});
