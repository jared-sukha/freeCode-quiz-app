import request from 'superagent'

export function getTheQuotes() {
  return request
    .get('https://predator-quotes.herokuapp.com/quotes')
    .then((res) => {
      console.log(res.body)
      return res.body
    })
}

export function getRandomQuotes(quoteNum) {
  return request
    .get('https://predator-quotes.herokuapp.com/quotes/all')
    .then((res) => {
      let sourceQuotes = res.body
      let randomQuestArr = []
      while (randomQuestArr.length < quoteNum) {
        let r = sourceQuotes[Math.floor(Math.random() * sourceQuotes.length)]
        if (randomQuestArr.indexOf(r) === -1) randomQuestArr.push(r)
      }
      // console.log(res.body[Math.floor(Math.random() * res.body.length)])
      // console.log('random', randomQuestArr)
      return randomQuestArr
    })

}

export function getPonchoQuotes() {
  return request
    .get('https://predator-quotes.herokuapp.com/quotes/bycharacter/poncho')
    .then((res) => {
      console.log(res.body)
      return res.body
    })
}

export function getUniqueCharacters(){
  return request
  .get('https://predator-quotes.herokuapp.com/quotes/all')
  .then((res) => {
    const uniqueChars = res.body.map((x) => x.character).filter((char, index, charArr) => charArr.indexOf(char) === index)
    return uniqueChars
  })
}