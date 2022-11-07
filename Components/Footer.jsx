import { Flex, Text } from "@chakra-ui/react";

export default function Footer(){
    return(
        <Flex h={"100px"} w={"100vw"} background={"black"} alignItems="center" paddingInline="5px" justifyContent={"center"} borderTopRadius={"10px"}>
            <Text color="white" textAlign="center">Ces images sont la proprieté de Disney et ne doivent pas être utilisées à des fins commerciales</Text>
        </Flex>
    )
}