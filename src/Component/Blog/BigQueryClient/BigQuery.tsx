const { BigQuery } = require('@google-cloud/bigquery');

async function createDataset() {
  // Creates a client
  const bigqueryClient = new BigQuery({
    projectId: 'hj-devlog',
  });

  // Create the dataset
  const [dataset] = await bigqueryClient.createDataset(
    'hj-devlog.analytics_401292897'
  );
  console.log(`Dataset ${dataset.id} created.`);
}
