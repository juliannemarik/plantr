const Sequelize = require("sequelize");
const db= new Sequelize("postgres://localhost:5432/plantr", {logging : false });

// DEFINE GARDENER MODEL
const Gardener = db.define('gardener', {
  name: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  age: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

// DEFINE PLOT MODEL
const Plot = db.define('plot', {
  size: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  shaded: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  }
})

// DEFINE VEGETABLE MODEL
const Vegetable = db.define('vegetable', {
  name: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  color: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  plantedOn: {
    type: Sequelize.DATE,
    allowNull: false
  }
})

// ESTABLISH ASSOCIATIONS
Plot.belongsTo(Gardener); // Plot belongs to a gardener
Gardener.hasOne(Plot); // Gardener has one plot
Vegetable.belongsToMany(Plot, {through: 'vegetable_plot'}); // Vegetable may belong to many plots
Plot.belongsToMany(Vegetable, {through: 'vegetable_plot'}); // A plot has many vegetables
Gardener.belongsTo(Vegetable, {as: 'favorite_vegetable'})


// DEFINE VEGETABLE PLOT MODEL
const vegetablePlot = db.model('vegetable_plot');


// EXPORT DB & MODELS
module.exports = { db, Gardener, Plot, Vegetable, vegetablePlot };
