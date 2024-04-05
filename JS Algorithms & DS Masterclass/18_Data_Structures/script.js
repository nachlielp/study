class Student {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
  //instance method
  iAm() {
    console.log(`Hey, my name is ${this.firstName} ${this.lastName}`);
  }
  //class method
  static enrollStudents(...students) {
    //send email to all students
    console.log("Enrolling students");
  }
}

const s1 = new Student("Nate", "Smith");
s1.iAm();
Student.enrollStudents();

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  //class method
  static distance(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return Math.hypot(dx, dy);
  }
}
const p1 = new Point(5, 5);
const p2 = new Point(10, 10);
console.log("distance: ", Point.distance(p1, p2));
