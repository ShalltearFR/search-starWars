import { Flex, Image, Input, Select, Text } from "@chakra-ui/react";
import { useRouter }                        from 'next/router'
import HeadComponent from "../Components/HeadComponent";

export default function Home() {
  const router = useRouter()

  function launchSearch(e){
    if (e.key === "Enter"){
      const selectValue = document.querySelector(".select").value.toLowerCase()
      const searchValue = e.target.value

      router.push(`/search?type=${selectValue}&value=${searchValue}`)
    }
  }

  return (
    <>
      <HeadComponent title={""} path="/"/>
      
      <Flex as="header" h={"100vh"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"} background={"linear-gradient(180deg, #000000 50%, #FFE81F 50%)"}>
        <Flex textAlign={"center"} justifyContent={"center"} flexDirection={"column"} marginInline={"auto"}>
          <Image w={["300px", "300px", "400px"]} src="/media/images/logo.png" alt="logo" marginInline={"auto"} />
          <Input fontSize={"1.5rem"} fontFamily="Lexend" h={["2.5rem", "2.5rem", "3rem"]} background={"white"} mt="1rem" placeholder="Entrez votre recherche" textAlign={"center"} onKeyDown={launchSearch} w={["80vw", "70vw", "600px"]} marginInline={"auto"} />
          <Text fontSize={"1.5rem"} fontFamily="Lexend" mt="1rem" textAlign={"center"}>Filtrer la recherche par :</Text>
          <Select fontSize={"1.5rem"} fontFamily="Lexend" h={["2.5rem", "2.5rem", "3rem"]} background={"white"} textAlign="center" className="select" w={["80vw", "70vw", "450px"]} marginInline={"auto"}>
            <option value="starships">Vaisseaux</option>
            <option value="people">Personnages</option>
            <option value="films">Films</option>
            <option value="species">Espèces</option>
            <option value="vehicles">Vehicules</option>
            <option value="planets">Planetes</option>
          </Select>
        </Flex>
      </Flex>
    </>
  )
}
