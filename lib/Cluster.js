const Vector = require('vector-object');

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
    let newCentroid = new Vector();

    this.vectorIds.map(id => allVectors[id]).forEach((vector) => {
      newCentroid = newCentroid.add(vector);
    });

    newCentroid = newCentroid.divide(this.vectorIds.length);
    if (!this.centroid.isEqual(newCentroid)) {
      this.centroid = newCentroid;
      this.hasMoved = true;
    }
  }
}

module.exports = Cluster;
