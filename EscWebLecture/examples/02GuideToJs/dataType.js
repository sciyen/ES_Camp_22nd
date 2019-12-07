

// dataType
var x = 10      // Number
var y = 15.5    // Number
var s = "hello" // String

console.log("Addition: ")
console.log(x+y)
console.log(x+s)
console.log(x+y+s)
console.log(s+x+y)

// Type of variables
console.log("\nTypes: ")
console.log(typeof(x))
console.log(typeof(y))
console.log(typeof(s))


// List
console.log("\nList: ")
var arr = ["a", "b", "c"]
console.log(arr)
arr.push("d")
console.log(arr)
console.log("第0個:" + arr[0])

for ( x =0; x<arr.length; x++)
    console.log(arr[x])
arr.forEach((x)=>console.log(x))


// Function as a oblect
console.log("\nFunction: ")
function func0(){
    console.log("This is func0")
}
func0()
var f1 = function func1(){
    console.log("This is func1")
    console.log("Hello")
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
