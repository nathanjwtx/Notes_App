// const notes = [{
//   title: 'note1',
//   body: 'I need a holiday'
// }, {
//   title: 'note3',
//   body: 'Looking forward to my next hammock outing'
// }, {
//   title: 'note2',
//   body: 'Looks like rain'
// }]

// DOM - Document Object Model

// document.querySelector('#delete-note').addEventListener('click', function () {
//   document.querySelectorAll('.note-class').forEach(function (note) {
//     console.log('remove note')
//   })
// })

const notes = getSavedNotes()

const filters = {
  searchText: ''
}

renderNotes(notes, filters)

document.querySelector('#search-text').addEventListener('input', function (e) {
  filters.searchText = e.target.value
  renderNotes(notes, filters)
})

document.querySelector('#filterBy').addEventListener('change', function (e) {
  console.log(e.target.value)
})

document.querySelector('#add-note').addEventListener('click', function () {
  var noteId = uuidv4()
  notes.push({
    id: noteId,
    title: '',
    body: ''
  })
  saveNotes(notes)
  location.assign(`editnote.html#${noteId}`)
})
