/* while loop */
console.log("Example for 'while-loop'")
i = 0
while(i < 10) {
    if(i%2 == 0)  // i is even
        console.log(i)
    i++           // i = i + 1
}


/* for loop */
console.log("Example for 'for-loop'")
var i
for (i = 0; i < 10; i++){
    if(i == 5)
        console.log("It is 5")
    else
        console.log(i)
}


// List
console.log("\nPrint list")
var arr = ["a", "b", "c"]
for (var x=0; x<arr.length; x++){
    console.log(arr[x])
}

console.log("\nPrint forEach")
arr.forEach(function (item){
    console.log(item)
})

arr.forEach((x)=>console.log(x))


