

// Create a object
var name = "John"
var x = {
    Name:name, 
    Age:16, 
    Phone:"0800-000-123"
};
console.log(x)


// Add a new property
x["NickName"] = "Yee"
console.log(x)


// Add a function as a property
x["toString"] = function(){
    return "My name is " + this.Name
}
x["print"] = function(){
    console.log("My nickname is " + this.NickName)
}

console.log(x.toString())
x.print()
