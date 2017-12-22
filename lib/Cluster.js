const _ = require('underscore');
const Vector = require('./Vector');

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

module.exports = Cluster;
