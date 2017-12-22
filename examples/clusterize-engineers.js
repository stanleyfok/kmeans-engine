const kmeans = require('../');
const engineers = require('../fixtures/engineers');

kmeans.clusterize(engineers, { k: 4, debug: true }, (err, res) => {
  console.log('----- Results -----');
  console.log(`Iterations: ${res.iterations}`);
  console.log('Clusters: ');
  console.log(res.clusters);
});
