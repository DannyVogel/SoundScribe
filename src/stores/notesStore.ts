import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import {
  collection,
  db,
  getDocs,
  addDoc,
  orderBy,
  query,
  serverTimestamp
} from '@/services/Firebase'
import { getYouTubeEmbedUrl } from '@/utils'
import { Note } from '@/types'

const useNotesStore = defineStore('notes', {
  state: () => ({
    userNotes: {} as Record<string, Note>,
    allUsersNotes: {} as Record<string, Note>
  }),
  getters: {
    getAllUserNotesAsArray: (state) => Object.values(state.userNotes),
    getAllNotesAsArray: (state) => Object.values(state.allUsersNotes),
    getAllUsersNotesSortedByTimestamp: (state) => {
      return Object.values(state.allUsersNotes).sort((a: Note, b: Note) => {
        return b.timeStamp.seconds - a.timeStamp.seconds
      })
    }
  },
  actions: {
    async uploadNote(
      userName: string,
      title: string,
      content: string,
      songURL: string,
      userUID: string
    ) {
      const id = uuidv4()
      const docData = {
        id: id,
        author: userName,
        timeStamp: serverTimestamp(),
        title: title,
        content: content,
        songURL: getYouTubeEmbedUrl(songURL)
      }
      try {
        await addDoc(collection(db, 'users', userUID, 'userNotes'), docData)
        return 'success'
      } catch (error) {
        console.error('Error writing document: ', error)
        return 'error'
      }
    },
    async getAllUserNotes(userUID: string) {
      try {
        const querySnapshot = await getDocs(
          query(collection(db, 'users', userUID, 'userNotes'), orderBy('timeStamp', 'desc'))
        )
        this.userNotes = {}
        querySnapshot.forEach((doc) => {
          this.userNotes[doc.id] = doc.data() as Note // Set the data to the userNotes object
        })
      } catch (error) {
        console.error('Error fetching user notes:', error)
      }
    },
    async getAllNotes() {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'))
        this.allUsersNotes = {}
        querySnapshot.forEach(async (userDoc) => {
          const userUID = userDoc.data().userUID

          const userNotesSnapshot = await getDocs(
            query(collection(db, 'users', userUID, 'userNotes'), orderBy('timeStamp', 'desc'))
          )
          userNotesSnapshot.forEach((noteDoc) => {
            this.allUsersNotes[noteDoc.id] = noteDoc.data() as Note
          })
        })
      } catch (error) {
        console.error('Error fetching all notes:', error)
      }
    }
  }
})

export default useNotesStore
