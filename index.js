// VARIABLES
// Using meaningful and pronounceable variable names

const { isEmptyBindingElement } = require("typescript");

// Bad
const yyyymmdstr = moment().format("YYYY/MM/DD");
// Good
const currentDate = moment().format("YYYY/MM/DD");

// Use the same vocabulary for the same type of variable
// Bad
getUserInfo();
getClientData();
getCustomerRecord();
// Good
getUser();

// Use searchable names
// Bad - What the heck is 86400000 for?
setTimeout(blastOff, 86400000);
// Good - Declare them as captialized named constants.
const MILLISECONDS_PER_DAY = 60 * 60 * 24 * 1000; // 86400000;
setTimeout(blastOff, MILLISECONDS_PER_DAY);

// Use explanatory variables
// Bad
const address = "One Infinite Loop, Cupertino 95014";
const cityZipCodeRegex = /^[^,\\]+[,\\\s]+(.+?)\s*(\d{5})?$/;
saveCityZipCode(
    address.match(cityZipCodeRegex)[1],
    address.match(cityZipCodeRegex)[2]
);
// Good
const address = "One Infinite Loop, Cupertino 95014";
const cityZipCodeRegex = /^[^,\\\]+,[,\\\s]+(.+?)\s*(\d{5})?$/;
const [_, city, zipCode] = address.match(cityZipCodeRegex) || [];
saveCityZipCode(city, zipCode);

// Avoid Mental Mapping
// Explicit is better than implicit.
// Bad
const locations = ["Austin", "New York", "San Francisco"];
locations.forEach(l => {
    doStuff();
    doSomeOtherStuff();
    // ...
    // ...
    // ... 
    // Wait, what is `l` for again?
    dispatch(l);
});
// Good
const locations = ["Austin", "New York", "San Francisco"];
locations.forEach(location => {
    doStuff();
    doSomeOtherStuff();
    // ... 
    // ... 
    // ... 
    dispatch(location);
});

// Don't add unneeded context
// If your class/object name tells you something, don't repeat that in your variable name.
// Bad
const Car = {
    carMake: "Honda",
    carModel: "Accord",
    carColor: "Blue"
};

function paintCar(car, color) {
    car.carColor = color;
}
// Good
const Car = {
    make: "Honda",
    model: "Accord",
    color: "Blue"
};

function paintCar(car, color) {
    car.color = color;
}


// Use default parameters instead of short circuiting or conditionals
/** 
 *  Default parameters are often cleaner than short circuiting. Be aware that if you use
 *  them, your function will only provide default values for undefined arguments. Other
 *  "falsy" values such as '', "", false, null, 0, and NaN, will not be replaced by a 
 *  default value.
 * */
// Bad
function createMicrobrewery(name) {
    const breweryName = name || "Hisper Brew Co.";
    // ... 
}
// Good
function createMicrobrewery(name = "Hisper Brew Co.") {
    // ... 
}


// FUNCTIONS
// Bad
function createMenu(title, body, buttonText, cancellable) {
    // ... 
}

createMenu("Foo", "Bar", "Baz", true);

// Good
function createMenu({ title, body, buttonText, cancellable }) {
    // ... 
}

createMenu({
    title: "Foo",
    body: "Bar",
    buttonText: "Baz",
    cancellable: true,
});


// Functions should do one thing
// Bad
function emailClients(clients) {
    clients.forEach(client => {
        const clientRecord = database.lookup(client);
        if (clientRecord.isActive()) {
            email(client);
        }
    });
}

// Good
function emailActiveClients(clients) {
    clients.filter(isACtive).forEach(email);
}

function isActiveClient(client) {
    const clientRecord = database.lookup(client);
    return clientRecord.isACtive();
}


// Function names should say what they do
// Bad
function addToDate(date, month) {
    // ... 
}
const date = new Date();
// It's hard to tell from the function nmame what is added
addToDate(data, 1);

// Good
function addMonthToDate(month, date) {
    // ...
}
const date = new Date();
addMonthToDate(1, date);


// Functions should only be one level of abstraction
/**
 * When you have more than one level of abstraction your function is usually doing too 
 * much. Spllitting up functions leads to reusability and easier testing.
 */
// Bad
function parseBettrJSAlternative(code) {
    const REGEXES = [
        // ...
    ];

    const statements = code.split(" ");
    const tokens = [];
    REGEXES.forEach(REGEX => {
        statements.forEach(statement => {
            // ... 
        });
    });

    const ast = [];
    tokens.forEach(token => {
        // lex...
    });

    ast.forEach(node => {
        // parse...
    });
}

// Good
function parseBettrJSAlternative(code) {
    const tokens = tokenize(code);
    const syntaxTree = parse(tokens);
    syntaxTree.forEach(node => {
        // parse... 
    });
}

function tokenize(code) {
    const REGEXES = [
        // ...
    ];

    const statements = code.split(" ");
    const tokens = [];
    REGEXES.forEach(REGEX => {
        statements.forEach(statement => {
            tokens.push(/* ... */);
        });
    });

    return tokens;
};

function parse(tokens) {
    const syntaxTree = [];
    tokens.forEach(token => {
        syntaxTree.push(/* ... */ );
    });

    return syntaxTree;
}


// Remove duplicate code
// Bad
function showDeveloperList(develoepers) {
    develoepers.forEach(developer => {
        const expectedSalary = developer.calculateExpectedSalary();
        const experience = developer.getExperience();
        const githubLink = developer.getGithubLink();
        const data = {
            expectedSalary,
            experience,
            githubLink
        };

        render(data);
    });
}

function showManagerList(managers) {
    managers.forEach(manager => {
        const expectedSalary = manager.calculateExpectedSalary();
        const experience = manager.getExperience();
        const portfolio = manager.getMBAProjects();
        const data = {
            expectedSalary,
            experience,
            portfolio,
        };

        render(data);
    });
}

// Good
function showEmployeeList(employees) {
    employees.forEach(employee => {
        const expectedSalary = employee.calculateExpectedSalary();
        const experience = employee.getExperience();

        const data = {
            expectedSalary,
            experience,
        };

        switch (employee.type) {
            case "manager":
                data.portfolio = employee.getMBAProjects();
                break;
            case "developer":
                data.githubLink = employee.getGithubLink();
                break;
        }

        render(data);
    });
}


// Set default objects with Object.assign
// Bad
const menuConfig = {
    title: null,
    body: "Bar",
    buttonText: null,
    cancellable: true,
};

function createMenu(config) {
    config.title = config.title || "Foo";
    config.body = config.body || "Bar";
    config.buttonText = config.buttonText || "Baz";
    config.cancellable = 
        config.cancellable !== undefined ? config.cancellable : true;
}

createMenu(menuConfig);

// Good
const menuConfig = {
    title: "Order",
    // user did not include 'body' key
    buttonText: "Send",
    cancellable: true,
};

function createMenu(config) {
    let finalConfig = Object.assign(
        {
            title: "Foo",
            body: "Bar",
            buttonText: "Baz",
            cancellable: true,
        },
        config 
    );
    return finalConfig
    // config now equals: {title: "Order", body: "Bar", buttonText: "Send", cancellable: true}
    // ... 
}

createMenu(menuConfig);

// Don't use flags as function parameters
// Bad
function createFile(name, temp) {
    if (temp) {
        fs.create(`./temp/${name}`);
    } else {
        fs.create(name);
    }
}

// Good
function createFile(name) {
    fs.create(name);
}

function createTempFile(name) {
    createFile(`./temp/${name}`);
}


// Avoid Side Effects (part 1)
// Bad
// Global variable referenced by following function.
// If we had another function that used this name, now it'd be an array and it could break it.
let name = "Ryan McDermott";

function splitIntoFirstAndLastName() {
    name = name.split(" ");
}
splitIntoFirstAndLastName();
console.log(name); // ['Ryan', 'McDermott'];

// Good
function splitIntoFirstAndLastName(name) {
    return name.split(" ");
}
const name = "Ryan McDermott";
const newName = splitIntoFirstAndLastName(name);

console.log(name); // 'Ryan McDermott';
console.log(newName); // ['Ryan', 'McDermott'];


// Avoid Side Effects (part 2)
// Bad
const addItemToCart = (cart, item) => {
    cart.push({ item, date: Date.now() });
};

// Good
const addItemToCart = (cart, item) => {
    return [...cart, { item, date: Date.now() }];
}


// Don't write to global functions
// Bad
Array.prototype.diff = function diff(comparisonArray) {
    const hash = new Set(comparisonArray);
    return this.filter(elem => !hash.has(elem));
};

// Good
class SuperArray extends Array {
    diff(comparisonArray) {
        const hash = new Set(comparisonArray);
        return this.filter(elem => !hash.has(elem));
    }
}


// Favor functional programming over imperative programming
// Bad
const programmerOutput = [
    {
        name: "Uncle Bobby",
        linesOfCode: 500
    },
    {
        name: "Suzie Q",
        linesOfCode: 1500
    },
    {
        name: "Jimmy Gosling",
        linesOfCode: 150
    },
    {
        name: "Gracie Hopper",
        linesOfCode: 1000
    },
];

let totalOutput = 0;

for (let i = 0; i < programmerOutput.length; i++) {
    totalOutput += programmerOutput[i].linesOfCode;
}

// Good
const programmerOutput = [
    {
        name: "Uncle Bobby",
        linesOfCode: 500,
    },
    {
        name: "Suzie Q",
        linesOfCode: 1500,
    },
    {
        name: "Jimmy Gosling",
        linesOfCode: 150,
    },
    {
        name: "Gracie Hopper",
        linesOfCode: 1000,
    },
];

const totalOutput = programmerOutput.reduce(
    (totalLines, output) => totalLines + output.linesOfCode,
    0
);


// Encapsulate conditionals
// Bad
if (fsm.state === "fetching" && isEmptyBindingElement(listNode)) {
    // ... 
}

// Good
function shouldShowSpinner(fsm, listNode) {
    return fsm.state === "fetching" && isEmpty(listNode);
}

if (shouldShowSpinner(fsmInstance, listNodeInstance)) {
    // ... 
}


// Avoid negative conditionals
// Bad
function isDOMNodeNotPresent(node) {
    // ... 
}

if (!isDOMNodeNotPresent(node)) {
    // ...
}

// Good
function isDOMNodePresent(node) {
    // ...
}

if (isDOMNodeNotPresent(node)) {
    // ... 
}



// Avoid conditionals
// Bad:
class Airplane {
    // ... 
    getCruisingAltitude() {
        switch (this.type) {
            case "777":
                return this.getMaxAltitude() - this.getPassengerCount();
            case "Air Force One":
                return this.getMaxAltitude();
            case "Cessna":
                return this.getMaxAltitude() - this.getFuelExpenditure();
        }
    }
}

// Good
class Airplane {
    // ... 
}

class Boeing777 extends Airplane {
    // ... 
    getCruisingAltitude() {
        return this.getMaxAltitude() - this.getPassengerCount();
    }
}

class AirForceOne extends Airplane {
    // ... 
    getCruisingAltitude() {
        return this.getMaxAltitude();
    }
}

class Cessna extends Airplane {
    // ... 
    getCruisingAltitude() {
        return this.getMaxAltitude() - this.getFuelExpenditure();
    }
}


// Avoid type-checking (part 1)
// Bad
function travelToTexas(vehicle) {
    if (vehicle instanceof Bicycle) {
        vehicle.pedal(this.currentLocation, new Location("texas"));
    } else if (vehicle instanceof Car) {
        vehicle.drive(this.currentLocation, new Location("texas"));
    }
}

// Good
function travelToTexas(vehicle) {
    vehicle.move(this.currentLocation, new Location("texas"));
}


// Avoid type-checking (part 2)
// Bad
function combine(val1, val2) {
    if (
        (typeof val1 === "number" && typeof val2 === "number") ||
        (typeof val1 === "string" && typeof val2 === "string")
    ) {
        return val1 + val2;
    }

    throw new Error("Must be of type String or Number");
}

// Good
function combine(val1, val2) {
    return val1 + val2;
}

// Don't over-optimize
// Bad
// On old browsers, each iteration with uncached `list.length` would be costly
// because of `list.length` recomputation. In modern browsers, this is optimized.
for (let i = 0, len = list.length; i < len; i++) {
    // ... 
}

// Good
for (let i = 0; i < list.length; i++) {
    // ... 
}


// Remove dead code
// Bad
function oldRequestModule(url) {
    // ... 
}

function newRequestModule(url) {
    // ... 
}

const req = newRequestModule;
inventoryTracker("apples", req, "www.inventory-awesome.io");


// Good
function newRequestModule(url) {
    // ... 
}

const req = newRequestModule;
inventoryTracker("apples", req, "www.inventory-awesome.io");



// OBJECTS AND DATA STRUCTURES
// Use getters and setters

// Bad
function makeBankAccount() {
    // ... 

    return {
        balance: 0
        // ... 
    };
}

const account = makeBankAccount();
account.balance = 100;


// Good
function makeBankAccount() {
    // this one is private
    let balance = 0;

    // a "getter", made public via the returned object below
    function getBalance() {
        return balance;
    }

    // a "setter", made public via the returned object below
    function setBalance(amount) {
        // ... validate before updating the balance
        balance = amount;
    }

    return {
        // ... 
        getBalance,
        setBalance,
    };
}

const account = makeBankAccount();
account.setBalance(100);


// Make objects have private members
// Bad
const Employee = function(name) {
    this.name = name;
};

Employee.prototype.getName = function getName() {
    return this.name;
};

const employee = new Employee("John Doe");
console.log(`Employee name: ${employee.getName()}`); // Employee name: John Doe
delete employee.name;
console.log(`Employee name: ${employee.getName()}`); // Employee name: undefined

// Good
function makeEmployee(name) {
    return {
        getName() {
            return name;
        }
    };
}

const employee = makeEmployee("John Doe");
console.log(`Employee name: ${employee.getName()}`); // Employee name: John Doe
delete employee.name;
console.log(`Employee name: ${employee.getName()}`); // Employee name: John Doe


// Classes
// Prefer ES2015/ES^ classes over ES5 plain functions
// Bad
const Animal = function(age) {
    if (!(this instanceof Animal)) {
        throw new Error("Instantiate Animal with `new`");
    }

    this.age = age;
};

Animal.prototype.move = function move() {};

const Mammal = function(age, furColor) {
    if (!(this instanceof Mammal)) {
        throw new Error("Instantiate Mammal with `new`");
    }

    Animal.call(this, age);
    this.furColor = furColor;
};

Mammal.prototype = Object.create(Animal.prototype);
Mammal.prototype.constructor = Mammal;
Mammal.prototype.liveBirth = function liveBirth() {};

const Human = function(age, furColor, languageSpoken) {
    if (!(this instanceof Human)) {
        throw new Error("Instantiate Human with `new`");
    }

    Mammal.call(this, age, furColor);
    this.languageSpoken = languageSpoken;
};

Human.prototype = Object.create(Mammal.prototype);
Human.prototype.constructor = Human;
Human.prototype.speak = function speak() {};


// Good
class Animal {
    constructor(age) {
        this.age = age;
    }

    move() {
        /* ... */
    }
}

class Mammal extends Animal {
    constructor(age, furColor) {
        super(age);
        this.furColor = furColor;
    }

    liveBirth() {
        /* ... */
    }
}

class Human extends Mammal {
    constructor(age, furColor, languageSpoken) {
        super(age, furColor);
        this.languageSpoken = languageSpoken;
    }

    speak() {
        /* ... */
    }
}


// Use method chaining
// Bad
class Car {
    constructor(make, model, color) {
        this.make = make;
        this.model = model;
        this.color = color;
    }

    setMake(make) {
        this.make = make;
    }

    setModel(model) {
        this.model = model;
    }

    setColor(color) {
        this.color = color;
    }

    save() {
        console.log(this.make, this.model, this.color;
    }
}

const car = new Car("Ford", "F-150", "red");
car.setColor("pink");
car.save();


// Good 
class Car {
    constructor(make, model, color) {
        this.make = make;
        this.model = model;
        this.color = color;
    }

    setMake(make) {
        this.make = make;
        // NOTE: Returning this for chaining
        return this;
    }

    setModel(model) {
        this.model = model;
        // NOTE: Returning this for chaining
        return this;
    }

    setColor(color) {
        this.color = color;
        // NOTE: Returning this for chaining
        return this;
    }
}

const car = new Car("Ford", "F-150", "red").setColor("pink").save();


// Prefer composition over inheritance
// Bad
class Employee {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }

    // ... 
}

// Bad becasue Employees "have" tax data. EmployeeTaxData is not a type of Employee
class EmployeeTaxData extends Employee {
    constructor(ssn, salary) {
        super();
        this.ssn = ssn;
        this.salary = salary;
    }

    // ... 
}

// Good
class EmployeeTaxData {
    constructor(ssn, salary) {
        this.ssn = ssn;
        this.salary = salary;
    }

    // ... 
}

class Employee {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }

    setTaxData(ssn, salary) {
        this.taxData = new EmployeeTaxData(ssn, salary);
    }

    // ... 
}


// SOLID
// Bad
class UserSettings {
    constructor(user) {
        this.user = user;
    }

    changeSettings(settings) {
        if (this.verifyCredentials()) {
            // ... 
        }
    }

    verifyCredentials() {
        // ... 
    }
}

// Good
class UserAuth {
    constructor(user) {
        this.user = user;
    }

    verifyCredentials() {
        // ... 
    }
}

class UserSettings {
    constructor(user) {
        this.user = user;
        this.auth = new UserAuth(user);
    }

    changeSettings(settings) {
        if (this.auth.verifyCredentials()) {
            // ... 
        }
    }
}

// Open/Closed Principle (OCP)
// Bad
class AjaxAdapter extends Adapter {
    constructor() {
        super();
        this.name = "ajaxAdapter";
    }
}

class NodeAdapter extends Adapter {
    constructor() {
        super();
        this.name = "nodeAdapter";
    }
}

class HttpRequester {
    constructor(adapter) {
        this.adapter = adapter;
    }

    fetch(url) {
        if (this.adapter.name === "ajaxAdapter") {
            return makeAjaxCall(url).then(response => {
                return makeHttpCall(url).then(response => {
                    // transform response and return
                });
            })
        }
    }
}

function makeAjaxCall(url) {
    // request and return promise
}

function makeHttpCall(url) {
    // request and return promise
}


// Good
class AjaxAdapter extends Adapter {
    constructor() {
        super():
        this.name = "ajaxAdapter";
    }

    request(url) {
        // request and return promise
    }
}

class NodeAdapter extends Adapter {
    constructor() {
        super();
        this.name = "nodeAdapter";
    }

    request(url) {
        // requst and return promise
    }
}

class HttpRequester {
    constructor(adapter) {
        this.adapter = adapter;
    }

    fetch(url) {
        return this.adapter.request(url).then(response => {
            // transform response and return
        });
    }
}


// LISKOV SUBSTITUTION PRINCIPLE (LSP)
// Classic-Square Rectangle Example
// Bad
class Rectangle {
    constructor() {
        this.width = 0;
        this.height = 0;
    }

    setColor(color) {
        // ... 
    }

    render(area) {
        // ... 
    }

    setWidth(width) {
        this.width = width;
    }

    setHeight(height) {
        this.height = height;
    }

    getArea() {
        return this.width * this.height;
    }
}

class Square extends Rectangle {
    setWidth(width) {
        this.width = width;
        this.height = width;
    }

    setHeigh(height) {
        this.width = height;
        this.height = height;
    }
}

function renderLareRectangles(rectangles) {
    rectangles.forEach(rectangle => {
        rectangle.setWidth(4);
        rectangle.setHeight(5);
        const area = rectangle.getArea(); // BAD: Returns 25 for Sqaure. Should be 20.
        rectangle.render(area);
    });
}

const rectangles = [new Rectangle(), new Rectangle(), new Square()];
renderLareRectangles(rectangles);


// Good
class Shape {
    setColor(color) {
        // ... 
    }

    render(area) {
        // ... 
    }
}

class Rectangle extends Shape {
    constructor(width, height) {
        super();
        this.length = length;
    }

    getArea() {
        return this.length * this.length;
    }
}

function renderLargeShapes(shapes) {
    shapes.forEach(shape => {
        const area = shape.getArea();
        shape.render(area);
    });
}

const shapes = [new Rectangle(4, 5), new Rectangle(4, 5), new Square(5)];
renderLargeShapes(shapes);


// INTERFACE SEGREGATION PRINCIPLE (ISP)
// BAD
class DOMTraverser {
    constructor(settings) {
        this.settings = settings;
        this.setup();
    }

    setup() {
        this.rootNode = this.settings.rootNode;
        this.settings.animationModule.setup();
    }

    traverse() {
        // ... 
    }
}

const $ = new DOMTraverser({
    rootNode: document.getElementsByTagName("body"),
    animationModule() {} // Most of the time, we won't need to animate when traversing.
    // ...
})

// Good
class DOMTraverser {
    constructor(settings) {
        this.settings = settings;
        this.options = settings.options;
        this.setup();
    }

    setupOptions() {
        if (this.options.animationModule) {
            // ... 
        }
    }

    traverse() {
        // ... 
    }
}

const $ = new DOMTraverser({
    rootNode: document.getElementsByTagName("body"),
    options: {
        animationModule() {}
    }
});


// Dependency Inversion Principle (DIP)
// Bad
class InventoryRequester {
    constructor() {
        this.REQ_METHODS = ["HTTP"];
    }

    requestItem(item) {
        // ... 
    }
}

class InventoryTracker {
    constructor(items) {
        this.items = items;

        // BAD: We have created a dependency on a specific request implementation.
        // We should just have requestItems depend on a request method: `request`
        this.requester = new InventoryRequester();
    }

    requestItems() {
        this.items.forEach(item => {
            this.requester.requestItem(item);
        });
    }
}

const inventoryTracker = new InventoryTracker(["apples", "bananas"]);
inventoryTracker.requestItems();


// Good
class InventoryTracker {
    constructor(items, requester) {
        this.items = items;
        this.requester = requester;
    }

    requestItems() {
        this.items.forEach(item => {
            this.requester.requestItem(item);
        });
    }
}

class InventoryRequesterV1 {
    constructor() {
        this.REQ_METHODS = ["HTTP"];
    }

    requestItem(item) {
        // ...
    }
}

class InventoryRequesterV2 {
    constructor() {
        this.REQ_METHODS = ["WS"];
    }

    requestItem(item) {
        // ... 
    }
}

// By constructing our dependencies externally and injecting them, we can easily 
// substitute our request module for a fancy new one that uses WebSockets;
const inventoryTracker = new InventoryTracker(
    ["apples", "bananas"],
    new InventoryRequesterV2()
);
inventoryTracker.requestItems();


// TESTING
// Single concept per test
// Bad
import assert from "assert";

describe("MomentJS", () => {
    it("handels date boundaries", () => {
        let date;

        date = new MomentJS("1/1/2015");
        date.addDays(30);
        assert.equal("1/31/2015", date);

        date = new MomentJS("2/1/2016");
        date.addDays(28);
        assert.equal("02/29/2016", date);

        date = new MomentJS("2/1/2015");
        date.addDays(28);
        assert.equal("03/01/2015");
    });
    

// Good
import assert from "assert";

describe("MomentJS", () => {
    const date = new MomemntJS("1/1/2015");
    date.addDays(30);
    assert.equal("1/31/2015", date);
});

it("handles leap year", () => {
    const date = new MomentJS("2/1/2016");
    date.addDays(28);
    assert.equal("02/29/2016", date);
});

it("handles non-leap year", () => {
    const date = new MomentJS("2/1/2015");
    date.addDays(28);
    assert.equal("03/01/2015", date);
});


// CONCURRENCY
// Bad
import { get } from "request";
import { writeFile } from "fs";

get(
    "https::en.wikipedia.org/wiki/Robert_Cecil_Martin",
    (requestErr, response, body) => {
        if (requestErr) {
            console.error(requestErr);
        } else {
            writeFile("article.html", body, writeErr => {
                if (writeErr) {
                    console.error(writeErr);
                } else {
                    console.log("File written");
                }
            });
        }
    }
);

// Good
import { get } from "request-promise";
import { writeFile  } from "fs-extra";

get("https://en.wikipedia.org/wiki/Robert_Cecil_Martin")
    .then(body => {
        return writeFile("article.html", body);
    })
    .then(() => {
        console.log("File written");
    })
    .catch(err => {
        console.error(err);
    });


// Async/Await are even cleaner than Promises
// Bad
import { get } from "request-promise";
import { writeFile } from "fs-extra";

get("https://en.wikipedia.org/wiki/Rober_Cecil_Martin")
    .then(body => {
        return writeFile("article.html", body);
    })
    .then(() => {
        console.log("File written");
    })
    .catch(err => {
        console.error(err);
    });


// Good
import { get } from "request-promise";
import { writeFile } from "fs-extra";

async function getCleanCodeArticle() {
    try {
        const body = await get(
            "https://en.wikipedia.org/wiki/Robert_Cecil_Martin"
        );
        await writeFile("article.html", body);
        console.log("File written");
    } catch (err) {
        console.error(err);
    }
}

getCleanCodeArticle()



// Error Handling
// Bad
try {
    functionThatMightThrow();
} catch (error) {
    console.log(error);
}


// Good
try {
    functionThatMightThrow();
} catch (error) {
    // One option (more noisy than console.log):
    console.error(error);
    // Another option:
    notifyUserOfError(error);
    // Another option:
    reportErrorToService(error);
    // OR do all three!
}


// Don't ignore rejected promises
// Bad
getdata()
    .then(data => {
        functionThatMightThrow(data);
    })
    .catch(error => {
        console.log(error);
    });


// Good
getdata()
    .then(data => {
        functionThatMightThrow(data);
    })
    .catch(error => {
        // One option (more noisy than console.log):
        console.error(error);
        // Another option:
        notifyUserOfError(error);
        // Another option:
        reportErrorToService(error);
        // OR do all three!
    });


// FORMATTING
// Use consistent capitalization
const DAYS_IN_WEEK = 7;
const daysInMonth = 30;

const songs = ["Back In Black", "Stairway to Heaven", "Hey Jude"];
const Artists = ["ACDC", "Led Zeppelin", "The Beattles"];

function eraseDatabase() {}
function restore_database() {}

class animal {}
class Alpaca {}

// Good
const DAYS_IN_WEEK = 7;
const DAYS_IN_MONTH = 30;

const SONGS = ["Back In Black", "Stairway to Heaven", "Hey Jude"];
const ARTISTS = ["ACDC", "Led Zeppelin", "The Beattles"];

function eraseDatabase() {}
function restoreDatabase() {}

class Animal {}
class Alpaca {}


// Function callers and callees should be close
// Bad
class PerformanceReview {
    constructor(employee) {
        this.employee = employee;
    }
    
    lookupPeers() {
        return db.lookup(this.employee, "peers");
    }

    lookupManager() {
        return db.lookup(this.employee, "manager");
    }

    getPeerReviews() {
        const peers = this.lookupPeers();
        // ... 
    }

    perfReview() {
        this.getPeerReviews();
        this.getManagerReview();
        this.getSelfReview();
    }

    getManagerReview() {
        const manager = this.lookupManager();
    }

    getSelfReview() {
        // ... 
    }
}

const review = new PerformanceReview(employee);
review.perfReview();


// Good
class PerformanceReview {
    constructor(employee) {
        this.employee = employee;
    }

    perfReview() {
        this.getPeerReviews();
        this.getManagerReview();
        this.getSelfReview();
    }

    getPeerReviews() {
        const peers = this.lookupPeers();
        // ... 
    }

    lookupPeers() {
        return db.lookup(this.employee, "peers");
    }

    getManagerReview() {
        const manager = this.lookupManager();
    }

    lookupManager() {
        return db.lookup(this.employee, "manager");
    }

    getSelfReview() {
        // ... 
    }
}

const review = new PerformanceReview(employee);
review.perfReview();


// COMMENTS
// Only comment things that have business logic complexity.
// Bad
function hashIt(data) {
    // The hash
    let hash = 0;

    // Length of string
    const length = data.length;

    // Loop through every character in data
    for (let i = 0; i < length; i++) {
        // Get character code. 
        const char = data.charCodeAt(i);
        // Make the hash 
        hash = (hash << 5) - hash + char;
        // Convert to 32-bit integer
        hash &= hash;
    }
}

// Good
function hashIt(data) {
    let hash = 0;
    const length = data.length;

    for (let i = 0; i < length; i++) {
        const char = data.charCodeAt(i);
        hash = (hash << 5) - hash + char;

        // Convert to 32-bit integer
        hash &= hash;
    }
}

// Don't leave commented out code in your codebase
// Bad
doStuff();
// doOtherStuff();
// doSomeMoreStuff();
// doSoMuchStuff();

// Good
doStuff();


// Don't have journal comments
// Bad
/**
 * 2016-12-20: Removed monads, didn't understand them (RM)
 * 2016-10-01: Improved using special monads (JP)
 * 2016-02-03: Removed type-checking (LI)
 * 2015-03-14: Added combine with type-checking (JR)
 */
function combine(a, b) {
    return a + b;
}

// Good
function combine(a, b) {
    return a + b;
}


// Avoid poistional markers
// Bad
//////////////////////////////////////////////////////////////////////////////////////
// Scode Model Instantiation
/////////////////////////////////////////////////////////////////////////////////////
$scope.model = {
    menu: "foo",
    nav: "bar"
};

/////////////////////////////////////////////////////////////////////////////////////
// Action setup
/////////////////////////////////////////////////////////////////////////////////////
const actions = function() {
    // ... 
};

// Good
$scope.model = {
    menu: "foo",
    nav: "bar"
};

const actions = function() {
    // ... 
};


