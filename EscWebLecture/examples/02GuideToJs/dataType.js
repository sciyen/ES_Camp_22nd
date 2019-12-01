

// dataType
var x = 10      // Number
var y = 15.5    // Number
var s = "hello" // String

console.log(x+y)
console.log(x+s)
console.log(x+y+s)
console.log(s+x+y)

// Type of variables
console.log(typeof(x))
console.log(typeof(y))
console.log(typeof(s))


// Array
var arr = ["a", "b", "c"]
arr.push("d")
for ( x =0; x<arr.length; x++)
    console.log(arr[x])
arr.forEach((x)=>console.log(x))


// Function as a oblect
var f1 = function func1(){
    console.log("This is func1")
}
var f2 = function (){
    console.log("This is func2")
}
var f3 = ()=>{
    console.log("This is func3")
}

f1()
f2()
f3()
