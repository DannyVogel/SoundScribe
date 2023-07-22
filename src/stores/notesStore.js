import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import { collection, db, doc, getDocs, addDoc, serverTimestamp } from '@/services/Firebase'
import { getYouTubeEmbedUrl } from '@/utils'

const useNotesStore = defineStore('notes', {
  state: () => ({
    userNotes: new Map()
  }),
  getters: {},
  actions: {
    async uploadNote(userName, title, content, songURL, userUID) {
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
    async getAllUserNotes(userUID) {
      console.log('hi?')
      try {
        const querySnapshot = await getDocs(collection(db, 'users', userUID, 'userNotes'))
        this.userNotes.clear()

        querySnapshot.forEach((doc) => {
          this.userNotes.set(doc.id, doc.data())
        })
      } catch (error) {
        console.error('Error fetching user notes:', error)
      }
    }
  }
})

export default useNotesStore
