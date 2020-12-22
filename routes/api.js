'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  let convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function (req, res) {
      let input = req.query.input;

      let initNum = convertHandler.getNum(input);      
      console.log('int num', initNum)
      let initUnit = convertHandler.getUnit(input);
      console.log('int unit', initUnit)
      if(initNum === 'invalid number' && initUnit === 'invalid unit'){
        return res.send('invalid number and unit')
      }

      if(initNum === 'invalid number'){
        return res.send(initNum)
      }
      
      if(initUnit === 'invalid unit'){
        return res.send(initUnit)
      }
      
      let returnNum = convertHandler.convert(initNum, initUnit);

      let returnUnit = convertHandler.getReturnUnit(initUnit);

      let toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

      res.status(200).json({
        "initNum": Number(initNum),
        "initUnit": initUnit,
        "returnNum": returnNum,
        "returnUnit": returnUnit,
        "string": toString
      })
    });

};