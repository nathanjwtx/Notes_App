const noteId = location.hash.substr(1)
const notes = getSavedNotes()

const getNote = notes.find(function (getNote) {
    return getNote.id === noteId
})

if (getNote === undefined) {
    location.assign('index.html')
}

document.querySelector('#note-title').value = getNote.title
document.querySelector('#note-body').value = getNote.body