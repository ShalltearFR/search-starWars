import { Image, VStack, Input, Text, Select, Flex } from "@chakra-ui/react";
import Link from "next/link";

export default function NavBar(props){
    return(
        <VStack background={"black"} paddingBottom={"20px"} borderBottomRadius={"10px"} mb={props.mb}>
            <Link href="/"><Image src="/media/images/logo.png" alt="logo"/></Link>
            <Input background={"white"} mt="1rem" placeholder="Entrez votre recherche" textAlign={"center"} onChange={e => props.searchValue.set(e)} value={props.searchValue.get} w={"80vw"} marginInline={"auto"} />
            <Flex w={"65vw"} justifyContent={"center"} gap={"10px"} background={"white"} borderRadius={"0.375rem"}>
                <Text as="span" display={"flex"} alignItems={"center"}>Par : </Text>
                <Select background={"white"} className="select" w={"200px"} alignItems={"center"} onChange={props.searchType.set} value={props.searchType.get}>
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