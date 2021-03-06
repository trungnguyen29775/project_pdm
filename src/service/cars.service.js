const db = require('../models')
const Cars = db.Cars  
exports.create = async (req,res) => 
{
    try{
    {
        const cars = 
        {   
            Name: req.body.Name,
            Vehicle_ID:req.body.Vehicle_ID,
            Brand: req.body.Brand,
            Color: req.body.Color,
            HorsePower: req.body.HorsePower,
            EmptyWeight: req.body.EmptyWeight,
            Origin: req.body.Origin,
            SeatCapacity: req.body.SeatCapacity,

        }
        const checkID=Cars.findOne({where:{Vehicle_ID:cars.Vehicle_ID}})
        if(!checkID)
        {
            res.send(`Cars with Vehicle_ID: ${Vehicle_ID} already exist`)
        }
        else
        {
            await Cars.create(cars)
            res.redirect('/car')
        }
    }
  }
    catch(err)
    {
        console.log("Error due to ",err)
    }
}

exports.findAll = (req, res) => {
    Cars.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Cars."
        });
      });
};

exports.update = (req,res)=>
{
    const Vehicle_ID = req.body.Vehicle_ID;
    Cars.update(req.body, {
      where: { Vehicle_ID: Vehicle_ID }
    })
      .then(num => {
        if (num == 1) {
          res.redirect('cars');
        } else {
          res.send({
            message: `Cannot update Car with id=${id}. Maybe Car was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Car with Vehicle_ID=" + Vehicle_ID
        });
      });
}

exports.destroy = (req,res)=>
{
    const Vehicle_ID = req.body.Vehicle_ID;
    Cars.destroy({
        where: { Vehicle_ID: Vehicle_ID }
      })
        .then(num => {
          if (num == 1) {
            res.send({
              message: "Car was deleted successfully!"
            });
          } else {
            res.redirect('/cars');
          }
        })
        .catch(err => {
          res.status(500).send({
            message: "Could not delete Car with Vehicle_ID=" + Vehicle_ID
          });
        });
}
