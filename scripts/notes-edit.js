'use strict'

const noteId = location.hash.substr(1)
let notes = getSavedNotes()
document.getElementById('noteTitle').focus()

let getNote = notes.find((getNote) => getNote.id === noteId)

if (!getNote) {
    returnHome()
}

const titleElement = document.querySelector('#noteTitle')
const bodyElement = document.querySelector('#noteBody')
const elapsedElement = document.querySelector('#elapsedTime')
titleElement.value = getNote.title
bodyElement.value = getNote.body
elapsedElement.textContent = `Last edited ${elapsedTime(getNote.updatedAt)}`

document.querySelector('#noteTitle').addEventListener('input', (e) => {
    getNote.title =  e.target.value
    getNote.updatedAt = moment().valueOf()
    elapsedElement.textContent = `Last edited ${elapsedTime(getNote.updatedAt)}`
    saveNotes(notes)
})

// document.querySelector('#noteTitle').addEventListener('focusout', function(e) {
//     getNote.title =  e.target.value
//     saveNotes(notes)
// })

document.querySelector('#noteBody').addEventListener('focusout', (e) => {
    getNote.body = e.target.value
    getNote.updatedAt = moment().valueOf()
    elapsedElement.textContent = `Last edited ${elapsedTime(getNote.updatedAt)}`
    saveNotes(notes)
})

document.querySelector('#noteRemove').addEventListener('click', () => {
    removeNote(noteId)
    saveNotes(notes)
    returnHome()
})

const returnHome = () => location.assign('index.html')

// this triggers whenever a value in storage is changed. Triggers on other tabs if open as current tab refreshes automatically
window.addEventListener('storage', (e) => {
    if (e.key === "notes") {
        notes = JSON.parse(e.newValue)

        let getNote = notes.find((getNote) => getNote.id === noteId)
        
        if (!getNote) {
            returnHome()
        }
        elapsedElement.textContent = `Last edited ${elapsedTime(getNote.updatedAt)}`
        titleElement.value = getNote.title
        bodyElement.value = getNote.body
    }
})