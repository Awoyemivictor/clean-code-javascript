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







