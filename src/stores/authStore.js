import { defineStore } from 'pinia'
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  serverTimestamp,
  auth,
  signOut,
  setDoc,
  getDoc,
  doc,
  db
} from '@/services/Firebase'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
    userName: '',
    userUID: '',
    accountType: ''
  }),
  getters: {},
  actions: {
    init() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          getDoc(doc(db, 'users', user.uid)).then((doc) => {
            if (doc.exists()) {
              this.userName = user.displayName
              this.isLoggedIn = true
              this.userUID = user.uid
              this.accountType = doc.data().accountType
            }
          })
        } else {
          // User is signed out
          this.isLoggedIn = false
          this.userName = ''
          this.userUID = ''
          this.accountType = ''
        }
      })
    },
    async signUp({ userName, email, password, accountType }) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const user = userCredential.user
        updateProfile(auth.currentUser, {
          displayName: userName
        })
        setDoc(doc(db, 'users', user.uid), {
          userName: userName,
          accountType: accountType,
          userUID: user.uid,
          creationTimeStamp: serverTimestamp()
        })
        this.userName = userName
        this.isLoggedIn = true
        this.userUID = user.uid
        this.accountType = accountType
        return 'success'
      } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
          return 'Email already in use'
        } else if (error.code === 'auth/invalid-email') {
          return 'Invalid email'
        } else if (error.code === 'auth/weak-password') {
          return 'Password must be at least 6 characters'
        } else {
          return error.message
        }
      }
    },
    async signIn(email, password) {
      try {
        const data = await signInWithEmailAndPassword(auth, email, password)
        getDoc(doc(db, 'users', data.user.uid)).then((doc) => {
          if (doc.exists()) {
            this.isLoggedIn = true
            this.userName = doc.data().userName
            this.userUID = doc.data().userUID
            this.accountType = doc.data().accountType
          }
        })
        return 'success'
      } catch (error) {
        console.log(error.code, error.message)
        return error.message
      }
    },
    async logOut() {
      try {
        await signOut(auth)
        return 'success'
      } catch (error) {
        console.log(error)
        return error.message
      }
    }
  }
})
