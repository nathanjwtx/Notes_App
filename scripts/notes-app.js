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

let notes = getSavedNotes()
const noteId = location.hash.substr(1)

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
    const timestamp = moment()
    notes.push({
        id: noteId,
        title: '',
        body: '',
        createdAt: timestamp.valueOf(),
        updatedAt: timestamp.valueOf()
     })
    saveNotes(notes)
    location.assign(`editnote.html#${noteId}`)
})

window.addEventListener('storage', function (e) {
    if (e.key === "notes") {
        notes = JSON.parse(e.newValue)

        // instructor solution
        // renderNotes(notes, filters)

        let getNote = notes.find(function (getNote) {
            return getNote.id === noteId
        })
        
        if (getNote === undefined) {
            location.assign('index.html')
        }
        
        document.quertSelector('#noteTitle').value = getNote.title
    }
})