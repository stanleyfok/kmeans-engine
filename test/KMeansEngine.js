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

    it('should only accept max iterations as positive integer', () => {
      (() => {
        kmeans.clusterize(set1, { k: 3, maxIterations: -1 }, () => {});
      }).should.to.throw('Max iterations should be a positive integer');
    });

    it('should only accept synchronous as a boolean', () => {
      (() => {
        kmeans.clusterize(set1, { k: 3, synchronous: -1 }, () => {});
      }).should.to.throw('Synchronous should be a boolean');
    });

    it('should only accept callback when called synchronously', () => {
      (() => {
        kmeans.clusterize(set1, { k: 3, synchronous: true }, () => {});
      }).should.to.throw('Callback should be a function, only specified when Synchronous is false');
    });

    it('should only accept callback as a function', () => {
      (() => {
        kmeans.clusterize(set1, { k: 3},5);
      }).should.to.throw('Callback should be a function, only specified when Synchronous is false');
    });

    it('should only accept initial centroids as array of objects', () => {
      (() => {
        kmeans.clusterize(set1, { k: 2, initialCentroids: {} }, () => {});
      }).should.to.throw('Initial centroids should be array of length equal to cluster size');

      (() => {
        kmeans.clusterize(set1, { k: 2, initialCentroids: [() => {}, () => {}] }, () => {});
      }).should.to.throw('Centroids should be array of objects');

      (() => {
        kmeans.clusterize(set1, { k: 2, initialCentroids: ['abc', 'def'] }, () => {});
      }).should.to.throw('Centroids should be array of objects');

      (() => {
        kmeans.clusterize(set1, { k: 2, initialCentroids: [123, 456.7] }, () => {});
      }).should.to.throw('Centroids should be array of objects');

      (() => {
        kmeans.clusterize(set1, { k: 2, initialCentroids: [true, true] }, () => {});
      }).should.to.throw('Centroids should be array of objects');
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

    it('should return result if max iterations has been reached', (done) => {
      kmeans.clusterize(set2, { k: 3, maxIterations: 1 }, (err, res) => {
        should.not.exist(err);
        res.should.to.have.property('iterations');
        res.should.to.have.property('clusters');

        res.clusters.should.to.have.lengthOf(3);
        res.clusters.forEach((cluster) => {
          cluster.should.to.have.property('centroid');
          cluster.should.to.have.property('vectorIds');
        });

        res.iterations.should.to.be.equal(1);

        done();
      });
    });

    it('should return same result given same initial centroids', (done) => {
      const initialCentroids = [{ x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }];

      kmeans.clusterize(set2, {
        k: 3,
        maxIterations: 1,
        initialCentroids,
      }, (err1, res1) => {
        should.not.exist(err1);
        res1.should.to.have.property('iterations');
        res1.should.to.have.property('clusters');

        res1.clusters.should.to.have.lengthOf(3);
        res1.clusters.forEach((cluster1) => {
          cluster1.should.to.have.property('centroid');
          cluster1.should.to.have.property('vectorIds');
        });

        kmeans.clusterize(set2, {
          k: 3,
          maxIterations: 1,
          initialCentroids,
        }, (err2, res2) => {
          should.not.exist(err2);
          res2.should.to.have.property('iterations');
          res2.should.to.have.property('clusters');

          res2.clusters.should.to.have.lengthOf(3);
          res2.clusters.forEach((cluster2) => {
            cluster2.should.to.have.property('centroid');
            cluster2.should.to.have.property('vectorIds');
          });

          res1.should.deep.equal(res2);

          done();
        });
      });
    });

    it('should work asynchronously by default', (done) => {
      var flag = false;
      kmeans.clusterize(set2, { k: 3, maxIterations: 1 }, () => {
        flag.should.be.equal(true);

        done();
      });
      flag = true;

    });

    it('should work asynchronously when specified explicitly', (done) => {
      var flag = false;
      kmeans.clusterize(set2, { k: 3, maxIterations: 1, synchronous: false }, () => {
        flag.should.be.equal(true);

        done();
      });
      flag = true;

    });

    it('should work synchronously when specified explicitly', (done) => {
      var flag = false;
      const res = kmeans.clusterize(set2, { k: 3, maxIterations: 1, synchronous: true });
      res.should.to.have.property('iterations');
        res.should.to.have.property('clusters');

        res.clusters.should.to.have.lengthOf(3);
        res.clusters.forEach((cluster) => {
          cluster.should.to.have.property('centroid');
          cluster.should.to.have.property('vectorIds');
        });

        res.iterations.should.to.be.equal(1);
        done();
    });
  });
});
