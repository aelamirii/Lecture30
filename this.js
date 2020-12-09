function Person() {

  this.fullName = "ABC";
  this.fav = "Cookies";

  this.describe = function () {
    console.log("this is :", this);
    console.log(this.fullName + " likes "+ this.fav);
  };

}


var person = new Person();
person.describe();

var describe = person.describe;
describe();
describe.call(person);
