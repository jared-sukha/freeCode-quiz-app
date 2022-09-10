import request from 'superagent'

export function getTheQuotes (){
  return request.get('https://predator-quotes.herokuapp.com/quotes/bycharacter/poncho')
    .then(res => {
      console.log(res.body)
      return res.body
    })
}
