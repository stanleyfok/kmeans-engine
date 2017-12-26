const Vector = require('vector-object');

class Cluster {
  constructor(centroid) {
    this.centroid = centroid;

    this.init();
  }

  init() {
    this.hasMoved = false;
    this.vectorIds = [];
    this.vectors = [];
  }

  addVector(id, vector) {
    this.vectorIds.push(id);
    this.vectors.push(vector);
  }

  calculateCentroids() {
    const newCentroid = new Vector();

    this.vectors.forEach((vector) => {
      newCentroid.add(vector);
    });

    newCentroid.divide(this.vectors.length);

    if (!this.centroid.isEqual(newCentroid)) {
      this.centroid = newCentroid;
      this.hasMoved = true;
    }
  }
}

module.exports = Cluster;
