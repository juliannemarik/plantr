const db = require('./models');

db.sync({ force: true })
  .then(() => {
    console.log('Database synced!');
    // db.close() - if without 'finally'
  })
  .catch(err => {
    console.log('Error occurred!');
    console.log(err);
  })
  .finally(() => {
    db.close();
  });
