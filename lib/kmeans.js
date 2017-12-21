const _ = require('underscore');

class Vector {
  constructor(vector) {
    this.vector = vector || {};
  }

  clone() {
    return new Vector(Object.assign({}, this.getObject()));
  }

  getKeys() {
    return Object.keys(this.vector);
  }

  getObject() {
    return this.vector;
  }

  getEuclideanDistance(vector) {
    let tmpVector = this.clone().subtract(vector);
    let tmp = tmpVector.getObject()
    let d = 0;

    tmpVector.getKeys().forEach(k => {
      // only need to consider the overlapping keys
      d += tmp[k] * tmp[k];
    });

    return Math.sqrt(d);
  }

  add(vector) {
    const tmp = vector.getObject();

    vector.getKeys().forEach(k => {
      if (this.vector[k] === undefined) { this.vector[k] = 0; }

      this.vector[k] += tmp[k];
    });

    return this;
  }

  subtract(vector) {
    const tmp = vector.getObject();

    vector.getKeys().forEach(k => {
      if (this.vector[k] === undefined) { this.vector[k] = 0; }

      this.vector[k] -= tmp[k];
    });

    return this;
  }

  multiply(c) {
    this.getKeys().forEach(k => {
      this.vector[k] *= c;
    });

    return this;
  }

  divide(c) {
    this.getKeys().forEach(k => {
      this.vector[k] /= c;
    });

    return this;
  }
}

class Cluster {
  constructor(centroid) {
    this.centroid = centroid;

    this.init();
  }

  init() {
    this.hasMoved = false;
    this.vectorIds = [];
  }

  addVectorId(id) {
    this.vectorIds.push(id);
  }

  calculateCentroids(allVectors) {
    const newCentroid = new Vector();

    this.vectorIds.map(id => allVectors[id]).forEach((vector) => {
      newCentroid.add(vector);
    });

    newCentroid.divide(this.vectorIds.length);

    if (!_.isEqual(this.centroid.getObject(), newCentroid.getObject())) {
      this.centroid = newCentroid;
      this.hasMoved = true;
    }
  }
}

class KMeanEngine {
  constructor(vectors, k, callback) {
    this.vectors = [];
    vectors.forEach((v) => {
      this.vectors.push(new Vector(v));
    });

    this.k = k;
    this.callback = callback;

    this.validateInput();
    this.init();
  }

  validateInput() {
    // Vectors should be array of objects
    for (let i = 0; i < this.vectors.length; i += 1) {
      const v = this.vectors[i];

      if (!(_.isObject(v) && !_.isArray(v) && !_.isFunction(v))) {
        throw new Error('Vectors should be array of objects');
      }
    }

    // Cluster size should be a positive integer
    if (!_.isNumber(this.k) || !Number.isInteger(this.k) || this.k <= 0) {
      throw new Error('Cluster size should be a positive integer');
    }

    // Cluster size should be smaller than the vector size
    if (this.k > this.vectors.length) {
      throw new Error('Cluster size should be smaller than the vector size');
    }
  }

  init() {
    this.iterations = 0;
    this.clusters = [];

    const randNums = KMeanEngine.getRandomSequence(0, this.vectors.length - 1, this.k);

    // randomly pick a vector to be the centroid
    for (let i = 0; i < this.k; i += 1) {
      this.clusters.push(new Cluster(this.vectors[randNums[i]]));
    }
  }

  static getRandomSequence(min, max, size) {
    // generate a sequence of non-repeat numbers in the range of 0 to vector.length - 1
    const randNums = [];

    while (randNums.length < size) {
      const r = Math.floor((Math.random() * ((max - min) + 1)) + min);

      if (randNums.indexOf(r) === -1) {
        randNums.push(r);
      }
    }

    return randNums;
  }

  getResult() {
    return {
      iterations: this.iterations,
      clusters: this.clusters.map((cluster) => {
        const c = _.pick(cluster, 'centroid', 'vectorIds');
        c.centroid = c.centroid.getObject();

        return c;
      }),
    };
  }

  clusterize() {
    const self = this;

    function iterate() {
      let hasMoved = false;

      // reset clusters
      for (let i = 0; i < self.clusters.length; i += 1) {
        self.clusters[i].init();
      }

      // for each vector, check which centroid is closest
      // then assign the vector to the cluster
      for (let i = 0; i < self.vectors.length; i += 1) {
        let min = Number.MAX_SAFE_INTEGER;
        let clusterIndex = 0;

        for (let j = 0; j < self.clusters.length; j += 1) {
          const { centroid } = self.clusters[j];
          const v = self.vectors[i];

          const distance = v.getEuclideanDistance(centroid);

          if (distance < min) {
            min = distance;
            clusterIndex = j;
          }
        }

        self.clusters[clusterIndex].addVectorId(i);
      }

      // re-calculate the centroids
      for (let i = 0; i < self.clusters.length; i += 1) {
        self.clusters[i].calculateCentroids(self.vectors);
      }

      // check if any centroid hasMoved
      for (let i = 0; i < self.clusters.length; i += 1) {
        if (self.clusters[i].hasMoved) {
          hasMoved = true;
        }
      }

      self.iterations += 1;

      if (!hasMoved) {
        return self.callback(null, self.getResult());
      }
      return process.nextTick(iterate);
    }

    return iterate();
  }
}

exports.clusterize = (vectors, k, callback) => {
  const kmeans = new KMeanEngine(vectors, k, callback);
  return kmeans.clusterize();
};
