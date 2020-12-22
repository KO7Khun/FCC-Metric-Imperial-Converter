function ConvertHandler() {

  this.getNum = function (input) {
    let result;
    if (typeof (input) === 'number') {
      result = input
      return result
    }
    let checkUnits = ['gal', 'l', 'km', 'mi', 'lbs', 'kg'].filter(x => input.toLowerCase().includes(x))

    let num;
    if (checkUnits.length == 0) {
      num = input.match(/[^(a-z)]+/g)[0]
    } else {
      num = input.substr(0, input.toLowerCase().indexOf(checkUnits[0]))
    }
 
    if (num === '') return 1
    if (num.includes('/')) {
      //ensure '/' includes only one time.
      if (num.split('/').length == 2) {
        // compute the result and return the result
        result = num.split('/')[0] / num.split('/')[1]
        return result
      } else if (num.split('/').length > 2) {
        // return invalid number.
        result = 'invalid number'
        return result;
      }
    }
    //check if the num is a valid num
    if (!isNaN(num)) {
      result = num
      return result
    } else {
      result = 'invalid number'
      return result
    }
  };

  this.getUnit = function (input) {
    let getUnit = input.toLowerCase().match(/[a-z]+/g)
    if(getUnit === null) {
      return 'invalid unit'
    }
    let unit = getUnit[0]
    let checkUnits = ['gal', 'l', 'km', 'mi', 'lbs', 'kg'].filter(x => x === unit)
    if(checkUnits.length == 0 || checkUnits.length > 1){
      return 'invalid unit'
    } else {
      return checkUnits[0]
    }
  };

  this.getReturnUnit = function (initUnit) {
    let result;
    switch (initUnit.toLowerCase()) {
      case "gal":
        result = "L";
        break;
      case "l":
        result = "gal";
        break;
      case "km":
        result = "mi";
        break;
      case "mi":
        result = "km";
        break;
      case "lbs":
        result = "kg";
        break;
      case "kg":
        result = "lbs";
        break;
      default :
        return 'invalid unit'
    }
    return result;
  };

  this.spellOutUnit = function (unit) {
    let result;
    switch (unit.toLowerCase()) {
      case "gal":
        result = "gallons";
        break;
      case "l":
        result = "liters";
        break;
      case "km":
        result = "kilometers";
        break;
      case "mi":
        result = "miles";
        break;
      case "lbs":
        result = "pounds";
        break;
      case "kg":
        result = "kilograms";
        break;
    }
    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    switch (initUnit) {
      case "gal":
        result = initNum * galToL;
        break;
      case "l":
        result = initNum / galToL;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "kg":
        result = initNum / lbsToKg;
        break;
      case "mi":
        result = initNum * miToKm;
        break;
      case "km":
        result = initNum / miToKm;
        break;
    }

    return result;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    return result;
  };

}

module.exports = ConvertHandler;