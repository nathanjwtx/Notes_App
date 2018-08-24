const noteId = location.hash.substr(1)
let notes = getSavedNotes()
document.getElementById('noteTitle').focus()

let getNote = notes.find(function (getNote) {
    return getNote.id === noteId
})

if (getNote === undefined) {
    returnHome()
}

const titleElement = document.querySelector('#noteTitle')
titleElement.value = getNote.title
const bodyElement = document.querySelector('#noteBody')
bodyElement.value = getNote.body

document.querySelector('#noteTitle').addEventListener('input', function(e) {
    getNote.title =  e.target.value
    saveNotes(notes)
})

// document.querySelector('#noteTitle').addEventListener('focusout', function(e) {
//     getNote.title =  e.target.value
//     saveNotes(notes)
// })

document.querySelector('#noteBody').addEventListener('focusout', function(e) {
    getNote.body = e.target.value
    saveNotes(notes)
})

document.querySelector('#noteRemove').addEventListener('click', function () {
    removeNote(noteId)
    saveNotes(notes)
    returnHome()
})

const returnHome = function() {
    location.assign('index.html')
}

// this triggers whenever a value in storage is changed. Triggers on other tabs if open as current tab refreshes automatically
window.addEventListener('storage', function(e) {
    if (e.key === "notes") {
        notes = JSON.parse(e.newValue)

        let getNote = notes.find(function (getNote) {
            return getNote.id === noteId
        })
        
        if (getNote === undefined) {
            returnHome()
        }
        
        titleElement.value = getNote.title
        bodyElement.value = getNote.body
    }
})