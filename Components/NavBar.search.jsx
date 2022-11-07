import { Image, VStack, Input, Text, Select, Flex } from "@chakra-ui/react";
import Link from "next/link";

export default function NavBar(props){
    return(
        <VStack background={"black"} h={["180px", "180px", "100px"]} borderBottomRadius={"10px"} mb={props.mb} flexDirection={["column", "column", "row"]} alignItems={"center"} gap={["0", "0", "20px"]} paddingInline={["0px","0px","20px"]}>
            <Link href="/"><Image w={["100%", "100%", "400px"]} src="/media/images/logo.png" alt="logo"/></Link>
            <Input fontFamily="Lexend" fontSize={"1.5rem"} h={["2.5rem", "2.5rem", "3rem"]} background={"white"} mt="1rem" placeholder="Entrez votre recherche" textAlign={"center"} onChange={e => props.searchValue.set(e)} value={props.searchValue.get} w={"80vw"} marginInline={"auto"} />
            <Flex w={["300px","300px","650px"]} justifyContent={"center"} gap={"10px"} background={"white"} borderRadius={"0.375rem"}>
                <Text as="span" fontFamily="Lexend" fontSize={"1.5rem"} display={"flex"} alignItems={"center"}>Par : </Text>
                <Select fontFamily="Lexend" fontSize={"1.5rem"} h={["2.5rem", "2.5rem", "3rem"]} background={"white"} w={["200px","200px","200px"]} alignItems={"center"} onChange={props.searchType.set} value={props.searchType.get}>
                    <option value="starships">Vaisseaux</option>
                    <option value="people">Personnages</option>
                    <option value="films">Films</option>
                    <option value="species">Espèces</option>
                    <option value="vehicles">Vehicules</option>
                    <option value="planets">Planetes</option>
                </Select>
            </Flex>
        </VStack>
    )
}