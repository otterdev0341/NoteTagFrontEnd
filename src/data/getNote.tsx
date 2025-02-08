import { NoteList } from "../domain/Note";



export const getNote= () => {
    const notes = [
        {
            id: '1',
            title: 'Note 1',
            content: 'This is a note',
            colorCode: 'red',
            status: 'active',
            tags: ['tag1', 'tag2'],
            createdAt: new Date()
        },
        {
            id: '2',
            title: 'Note 2',
            content: 'This is a note',
            colorCode: 'blue',
            status: 'active',
            tags: ['tag1', 'tag2'],
            createdAt: new Date()
        },
        {
            id: '3',
            title: 'Note 3',
            content: 'This is a note',
            colorCode: 'green',
            status: 'active',
            tags: ['tag1', 'tag2'],
            createdAt: new Date()
        },
        {
            id: '4',
            title: 'Note 4',
            content: 'This is a note',
            colorCode: 'yellow',
            status: 'active',
            tags: ['tag1', 'tag2'],
            createdAt: new Date()
        }
    ]
    const result : NoteList = {
        totalNote: notes.length,
        noteLists: notes
    }
    return result;
    
}