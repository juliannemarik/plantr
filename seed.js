const seedModels = require('./models');
const db = seedModels.db;
const Gardener = seedModels.Gardener;
const Plot = seedModels.Plot;
const Vegetable = seedModels.Vegetable;
const vegetablePlot = seedModels.vegetablePlot;
let vegetables, gardeners, plots;

db.sync({ force: true })
  .then(() => {
    const vegetableData = [
      {
        name: 'carrot',
        color: 'orange',
        plantedOn: new Date()
      },
      {
        name: 'tomato',
        color: 'red',
        plantedOn: new Date()
      },
      {
        name: 'corn',
        color: 'yellow',
        plantedOn: new Date()
      }
    ]
    return Vegetable.bulkCreate(vegetableData, { returning: true });
  }).then((createdVegetables) => {
    vegetables = createdVegetables;
    const [carrot, tomato, corn] = vegetables;
    const gardenerData = [
      {
        name: 'William',
        age: 24,
        favoriteVegetableId: carrot.id
      },
      {
        name: 'Julianne',
        age: 25,
        favoriteVegetableId: tomato.id
      },
      {
        name: 'Cati',
        age: 27,
        favoriteVegetableId: corn.id
      }
    ]
    return Gardener.bulkCreate(gardenerData, { returning: true });
  }).then((createdGardeners) => {
    gardeners = createdGardeners;
    const [william, julianne, cati] = gardeners;
    const plotData = [
      {
        size: 10,
        shaded: false,
        gardenerId: william.id
      },
      {
        size: 100,
        shaded: true,
        gardenerId: julianne.id
      },
      {
        size: 40,
        shaded: false,
        gardenerId: cati.id
      }
    ]
    return Plot.bulkCreate(plotData, { returning: true })
  }).then((createdPlots) => {
    plots = createdPlots;
    const [plot1, plot2, plot3] = plots;
    const [carrot, tomato, corn] = vegetables
    const vegetablePlotData = [
      {
        vegetableId: carrot.id,
        plotId: plot1.id
      },
      {
        vegetableId: tomato.id,
        plotId: plot2.id
      },
      {
        vegetableId: corn.id,
        plotId: plot3.id
      }
    ]
    return vegetablePlot.bulkCreate(vegetablePlotData, { returning: true })
  }).then(() => {
    console.log('Database synced!');
  })
  .catch(err => {
    console.log('Error occurred!');
    console.log(err);
  })
  .finally(() => {
    db.close();
  });



