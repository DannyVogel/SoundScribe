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
    userNotes: {} as Record<string, Note>
  }),
  getters: {},
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
      await addDoc(collection(db, 'users', userUID, `userNotes`), docData)
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
    }
  }
})

export default useNotesStore
