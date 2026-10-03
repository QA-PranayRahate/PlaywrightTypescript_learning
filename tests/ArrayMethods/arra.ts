export {}

let st:any[]=[1,2,3,'A','B']

let num:number[]=[1,2,3,4,5,6]

let addd=num.reduce((num,sum)=>{
    return num+sum
})
console.log(addd)

let ev=num.every((element)=>{
    return element%2==0
})
console.log(ev)

let som=num.some((element)=>{
        return element%2==0
})
console.log(som)

console.log(num.indexOf(2))

console.log(num.at(1))

num.unshift