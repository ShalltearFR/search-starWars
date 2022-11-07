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
        <Image src="/media/images/logo.png" alt="logo" marginInline={"auto"} />
        <Input background={"white"} mt="1rem" placeholder="Entrez votre recherche" textAlign={"center"} onKeyDown={launchSearch} w={"80vw"} marginInline={"auto"} />
        <Text mt="1rem" textAlign={"center"}>Filtrer la recherche par :</Text>
        <Select background={"white"} textAlign="center" className="select" w={"80vw"} marginInline={"auto"}>
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
