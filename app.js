const notes = require('./notes')
const argv = require('yargs').argv

const command = process.argv[2]

switch (command.toLowerCase()) {
  case 'add':
    console.log('Adding new note\n...')
    notes.addNote(argv.title, argv.body)
    break;
  case 'list':
    console.log('Listing all notes\n...')
    notes.getAll()
    break;
  case 'read':
    console.log('Reading note\n...')
    notes.readNote(argv.title)
    break;
  case 'remove':
    console.log('Removing note\n...')
    notes.removeNote(argv.title)
    break;
  default:
    console.log('Command not recognized')
}