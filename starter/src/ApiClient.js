import request from 'superagent'

export function getTheQuotes() {
  return request
    .get('https://predator-quotes.herokuapp.com/quotes')
    .then((res) => {
      console.log(res.body)
      return res.body
    })
}

export function getRandomQuotes() {
  return request
    .get('https://predator-quotes.herokuapp.com/quotes/all')
    .then((res) => {
      console.log(res.body)
      return res.body
    })
}

// let arr = []
// while(arr.length < 3){
//   let r = res.body[Math.floor(Math.random() * arr.length)];
//   if(arr.indexOf(r) === -1) arr.push(r);
// }

export function getPonchoQuotes() {
  return request
    .get('https://predator-quotes.herokuapp.com/quotes/all')
    .then((res) => {
      let sourceQuotes = res.body
      let randomQuestArr = []
      while (randomQuestArr.length < 4) {
        let r = sourceQuotes[Math.floor(Math.random() * sourceQuotes.length)]
        if (randomQuestArr.indexOf(r) === -1) randomQuestArr.push(r)
      }
      // console.log(res.body[Math.floor(Math.random() * res.body.length)])
      console.log(randomQuestArr)
      return randomQuestArr
    })
}
