import { AuthProvider } from '@/components/AuthContext'
import LoadPage from '@/components/LoadPage'
import Navbar from '@/components/Navbar'
import { NotesProvider } from '@/components/Notes/NotesContext'
import '@/styles/globals.css'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <LoadPage>

        <ColorModeScript initialColorMode={"dark"} />
        <AuthProvider>
          <title>Notes</title>
          <Navbar />
          <NotesProvider>
          <Component {...pageProps} />
          </NotesProvider>
        </AuthProvider>
      </LoadPage>
    </ChakraProvider>
  )
}
