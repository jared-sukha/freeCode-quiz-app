export function ansArr(charArr) {
  let sourceAnswers = charArr
  let orderedAnsArr = [questions[currentQuestion].character]
  while (orderedAnsArr.length < 4) {
    let r = sourceAnswers[Math.floor(Math.random() * charArr.length)]
    if (orderedAnsArr.indexOf(r) === -1) orderedAnsArr.push(r)
  }
  return orderedAnsArr.sort(() => Math.random() - 0.5)
}
