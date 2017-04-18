const notes = require('./notes')
const yargs = require('yargs')

const title = {
  describe: 'Title of note',
  demand: true,
  alias: 't'
}
const body = {
  describe: 'Body of the note',
  demand: true,
  alias: 'b'
}

const argv = yargs
  .command('add', 'Add a new note', { title, body })
  .command('list', 'List all notes')
  .command('read', 'Read a note', { title })
  .command('remove', 'Remove a note', { title })
  .help()
  .argv
  
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