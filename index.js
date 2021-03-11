const fs = require('fs')


const fileName = 'test.json'

const fileString = fs.readFileSync(fileName, 'utf8')

// console.log(fileString)

const jsonOutput = removeCommentsFromObject(fileString)

console.log(jsonOutput)

function removeCommentsFromObject (string) {
  let inString = false
  let inComment = false
  let newString = ''
  for (i = 0; i <  string.length; i++) {
    let char = string[i]

    if (inComment) {
      if (char === '\n') {
        inComment = false
        newString += char
      }
    } else {
      if (!inString && char === '/' && string[i+1] === '/') {
        i++
        inComment = true
      } else {
        if (inString && char === '"') inString = false
        else {
          if (char === '"') inString = true
        }
        newString += char
      }
    }
  }

  return JSON.parse(newString)
}