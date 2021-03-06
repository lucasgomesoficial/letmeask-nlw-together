import { createContext, ReactNode, useEffect, useState } from "react"
import { useHistory } from 'react-router-dom';
import { firebase, auth } from "../services/firebase"

type User = {
  id: string,
  name: string,
  avatar: string
}

type AuthContextType = {
  user: User | undefined,
  signInWithGoogle: () => Promise<void>,
  singOut: () => Promise<void>
}

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType)

export const AuthContextProvider = (props: AuthContextProviderProps) => {
  const history = useHistory();
  const [ user, setUser ] = useState<User>()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const { displayName, photoURL, uid } = user
  
        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google Account!')
        }
  
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
    })

    return () => {
      unsubscribe();
    }
  }, [])

  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    
    const result = await auth.signInWithPopup(provider);

    if (result.user) {
      const { displayName, photoURL, uid } = result.user

      if (!displayName || !photoURL) {
        throw new Error('Missing information from Google Account!')
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      })
    }

    console.log(`${result.user?.displayName} logado`)
  }

  const singOut = async () => {
    await auth.signOut()
    alert(`${user?.name} deslogado`)
    history.push('/')
  }
  
  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, singOut }}>
      {props.children}
    </AuthContext.Provider>
  );
}