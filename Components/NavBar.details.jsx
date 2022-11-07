import { Image, VStack, Input, Text, Select, Flex } from "@chakra-ui/react";
import Link from "next/link";

export default function NavBar(props){
    let {type, value, page} = props.router.query
    if(page === undefined){page = 1}
    return(
        <VStack background={"black"} paddingBottom={"20px"} borderBottomRadius={"10px"} mb={props.mb}>
            <Link href="/"><Image src="/media/images/logo.png" alt="logo" mb={"1rem"} /></Link>
            <Link href={`/search?type=${type}&value=${value}&page=${page}`} passHref>
                <Flex alignItems={"center"} gap={"10px"}>
                    <Image src="/media/images/triangle.svg" alt="triangle"/>
                    <Text as="span" fontFamily="Lexend" fontSize={"1.5rem"} color={"white"}>Retour aux résultats</Text>
                </Flex>
            </Link>
        </VStack>
    )
}