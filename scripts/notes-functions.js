// read existing notes from localStorage
const getSavedNotes = function () {
    const notesJSON = localStorage.getItem('notes')

    if (notesJSON != null) {
        return JSON.parse(notesJSON)
    } else {
        return []
    }
}

const saveNotes = function (notes) {
    localStorage.setItem('notes', JSON.stringify(notes))
}

// generate DOM structure for a note
const generateNoteDOM = function (note) {
    const noteElement = document.createElement('div')
    const textElement = document.createElement('a')
    const delButton = document.createElement('button')

    // setup remove note button
    delButton.textContent = 'X'
    noteElement.appendChild(delButton)
    delButton.addEventListener('click', function () {
        removeNote(note.id)
        saveNotes(notes)
        renderNotes(notes, filters)
    })

    // setup the note title text
    if (note.title.length > 0) {
        textElement.textContent = note.title
    } else {
        
        textElement.textContent = 'Unnamed note'
    }
    textElement.setAttribute('href', '/editnote.html#' + note.id)
    noteElement.appendChild(textElement)
    

    return noteElement
}

// remove a note
const removeNote = function (id) {
    // const noteIndex = notes.findIndex(function (note) {
    //     return note.id === id
    // })
    const noteIndex = notes.findIndex(note => note.id === id)
    if (noteIndex > -1) {
        notes.splice(noteIndex, 1)
    }
}

// render application notes
const renderNotes = function (notes, filters) {
    const filteredNotes = notes.filter(function (note) {
        return note.body.toLowerCase().includes(filters.searchText.toLowerCase())
    })
    // clear the <div> element to only show the note one time
    document.querySelector('#notes').innerHTML = ''

    filteredNotes.forEach(function (note) {
        const noteElement = generateNoteDOM(note)
        document.querySelector('#notes').appendChild(noteElement)
    })
}
