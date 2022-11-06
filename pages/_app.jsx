import { Box, ChakraProvider } from '@chakra-ui/react'
import axios from "axios"
import { useRouter } from 'next/router'
import Footer from '../Components/Footer'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  axios.defaults.baseURL = "https://swapi.dev/api"

  return (
    <ChakraProvider>
      <Box minH="calc(100vh - 100px)">
      <Component {...pageProps} />
      </Box>
      {
        router.pathname !== "/" &&
        <Footer />
      }
    </ChakraProvider>
  )
}

export default MyApp
