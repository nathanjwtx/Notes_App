// read existing notes from localStorage
const getSavedNotes = () => {
    const notesJSON = localStorage.getItem('notes')
    return notesJSON ? JSON.parse(notesJSON) : []
    // replace below with line above using ternary operator
    // if (notesJSON != null) {
    //     return JSON.parse(notesJSON)
    // } else {
    //     return []
    // }
}

const saveNotes = (notes) => {
    localStorage.setItem('notes', JSON.stringify(notes))
}

// generate DOM structure for a note
const generateNoteDOM = (note) => {
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
const removeNote = (id) => {
    // const noteIndex = notes.findIndex(function (note) {
    //     return note.id === id
    // })
    const noteIndex = notes.findIndex(note => note.id === id)
    if (noteIndex > -1) {
        notes.splice(noteIndex, 1)
    }
}

// render application notes
const renderNotes = (notes, filters) => {
    notes = sortNotes(notes, filters.sortBy)
    const filteredNotes = notes.filter((note) => note.body.toLowerCase().includes(filters.searchText.toLowerCase()))
    // clear the <div> element to only show the note one time
    document.querySelector('#notes').innerHTML = ''

    filteredNotes.forEach((note) => {
        const noteElement = generateNoteDOM(note)
        document.querySelector('#notes').appendChild(noteElement)
    })
}

// last edited time function
const elapsedTime = (timeStamp) => moment(timeStamp).fromNow()


// sort notes by dropdown
const sortNotes = (notes, sortBy) => {
    if (sortBy === "byEdited") {
        return notes.sort((a, b) => {
            if (a.updatedAt > b.updatedAt) {
                return -1
            } else if (a.updatedAt < b.updatedAt) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === "byCreated") {
        return notes.sort((a, b) => {
            if (a.createdAt > b.createdAt) {
                return -1
            } else if (a.createdAt < b.createdAt) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === "alphabetical") {
        return notes.sort((a, b) => {
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