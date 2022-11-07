import { Flex, Text } from "@chakra-ui/react";

export default function Footer(){
    return(
        <Flex h={"100px"} background={"black"} alignItems="center" justifyContent={"center"} borderTopRadius={"10px"} p="0">
            <Text color="white" textAlign="center">Ces images sont la proprieté de Disney et ne doivent pas être utilisées à des fins commerciales</Text>
        </Flex>
    )
}