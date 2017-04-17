const fs = require('fs')
const options = { encoding: 'utf-8' }
const noteFile = 'notes.json'

exports.addNote = (title, body) => {
  fs.readFile(noteFile, options, (err, data) => {
    if (err) {
      // If the text file doesn't exist, make a new one.
      fs.appendFileSync(noteFile, JSON.stringify([{ title, body }], null, 2), options)
      console.log('Note successfully created')
    } else {
      // Get the contents of the current text file and overwrite it adding the new note.
      let contents = JSON.parse(fs.readFileSync(noteFile, options))

      const doesNoteExist = contents.find(note => note.title.toLowerCase() === title.toLowerCase())

      if (!doesNoteExist) {
        contents.push({ title, body })
        fs.writeFileSync(noteFile, JSON.stringify(contents, null, 2))
        console.log('Note successfully created')
      } else {
        console.log('Error: A note with that title already exists')
      }
    }
  })
}

exports.getAll = () => {
  fs.readFile(noteFile, options, (err, data) => {
    if (err) throw err
    else console.log(data)
  })
}

exports.removeNote = (title) => {
  fs.readFile(noteFile, (err, data) => {
    if (err) console.log('Error: That file does not exist')
    else {
      const contents = JSON.parse(fs.readFileSync(noteFile, options))
      const newContent = contents.filter(note => note.title.toLowerCase() !== title.toLowerCase())

      if (contents.length === newContent.length) {
        console.log('Error: The note you\'re trying to remove does not exist')
      } else {
        fs.writeFileSync(noteFile, JSON.stringify(newContent, null, 2))
        console.log('Note successfully removed')
      }
    }
  })
}

exports.readNote = (title) => {
  fs.readFile(noteFile, (err, data) => {
    if (err) console.log('Error: That file does not exist')
    else {
      const contents = JSON.parse(fs.readFileSync(noteFile, options))
      const note = contents.filter(note => note.title.toLowerCase() === title.toLowerCase() )

      if (note.length === 0) {
        console.log('Error: There is no note by that title')
      } else {
        console.log(`Title: ${note[0].title}\n\n${note[0].body}`)
      }
    } 
  })
}