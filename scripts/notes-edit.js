const noteId = location.hash.substr(1)
const notes = getSavedNotes()
document.getElementById('noteTitle').focus()

const getNote = notes.find(function (getNote) {
    return getNote.id === noteId
})

if (getNote === undefined) {
    returnHome()
}

document.querySelector('#noteTitle').value = getNote.title
document.querySelector('#noteBody').value = getNote.body

document.querySelector('#noteTitle').addEventListener('focusout', function(e) {
    getNote.title =  e.target.value
    saveNotes(notes)
})

document.querySelector('#noteBody').addEventListener('focusout', function(e) {
    getNote.body = e.target.value
    saveNotes(notes)
})

document.querySelector('#noteRemove').addEventListener('click', function () {
    removeNote(noteId)
    saveNotes(notes)
    // returnHome()
})

const returnHome = function() {
    location.assign('index.html')
}