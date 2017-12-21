const _ = require('underscore');

function getEuclideanDistance(v1, v2) {
  let d = 0;
  const keys = Object.keys(Object.assign({}, v1, v2));

  keys.forEach((k) => {
    // only need to consider the overlapping keys
    const delta = (v1[k] !== undefined ? v1[k] : 0) - (v2[k] !== undefined ? v2[k] : 0);
    d += delta * delta;
  });

  return Math.sqrt(d);
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
    const newCentroid = this.vectorIds.map(id => allVectors[id]).reduce((tempCentroid, v, i) => {
      const centroid = Object.assign({}, tempCentroid);

      // get unique keys
      const keys = Object.keys(Object.assign({}, centroid, v));

      keys.forEach((k) => {
        const mean = (centroid[k] !== undefined) ? centroid[k] : 0;
        const vk = (v[k] !== undefined) ? v[k] : 0;

        centroid[k] = mean + ((vk - mean) / (i + 1));
      });

      return centroid;
    }, {});

    if (!_.isEqual(this.centroid, newCentroid)) {
      this.centroid = newCentroid;
      this.hasMoved = true;
    }
  }
}

class KMeanEngine {
  constructor(vectors, k, callback) {
    this.vectors = vectors;
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
      clusters: this.clusters.map(cluster => _.pick(cluster, 'centroid', 'vectorIds')),
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

          const distance = getEuclideanDistance(v, centroid);

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
