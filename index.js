// VARIABLES
// Using meaningful and pronounceable variable names
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