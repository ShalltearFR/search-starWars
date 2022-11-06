import { Flex, Text } from "@chakra-ui/react";

export default function Footer(){
    return(
        <Flex h={"100px"} w={"100vw"} background={"black"} alignItems="center" paddingInline="5px">
            <Text color="white" textAlign="center">Les images déposés sont la proprieté de Disney et ne doivent pas être utilisés à des fins commerciales</Text>
        </Flex>
    )
}