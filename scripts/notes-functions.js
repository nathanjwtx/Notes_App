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
    notes = sortNotes(notes, filters.sortBy)
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

// last edited time function
const elapsedTime = function(timeStamp) {
    var elapsed = moment(timeStamp)
    return elapsed.fromNow()
}

// sort notes by dropdown
const sortNotes = function (notes, sortBy) {
    if (sortBy === "byEdited") {
        return notes.sort(function (a, b) {
            if (a.updatedAt > b.updatedAt) {
                return -1
            } else if (a.updatedAt < b.updatedAt) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === "byCreated") {
        return notes.sort(function (a, b) {
            if (a.createdAt > b.createdAt) {
                return -1
            } else if (a.createdAt < b.createdAt) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === "alphabetical") {
        return notes.sort(function (a, b) {
            // reverse the greater/less than to sort in other direction
            if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1
            } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1
            } else {
                return 0
            }
        })
    } else {
        return notes
    }
}