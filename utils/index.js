export function generateRandom () {
  function skipRandom (step) {
    Math.floor(Math.random() * Math.floor(step))
  }

  let randomArray = [
    skipRandom(50),
    skipRandom(500),
    skipRandom(2000),
    skipRandom(5000),
    skipRandom(8000),
    skipRandom(10000),
    skipRandom(20000)
  ]

  return randomArray[
    Math.floor(Math.random()*randomArray.length)
  ]
}