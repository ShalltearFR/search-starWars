import { Box, Heading, Image, Table, Tbody, Td, Tr, Flex, Text, Spinner }   from "@chakra-ui/react";
import NavBar                                                               from "../Components/NavBar.details";
import { useRouter }                                                        from "next/router";
import { useEffect, useState }                                              from "react";
import axios                                                                from "axios";

export default function Details(){
    const router = useRouter()
    
    const [details, setDetails] = useState("loading")
    const [image, setImage]     = useState("-1")

    // Recup les infos detaillés
    useEffect(()=>{
        const {type, id} = router.query
        if((type && id) !== undefined){
            axios.get(`/${type}/${id}`)
            .then(response=> { 
                setDetails(response.data)
            })
            .catch(err => console.log(err))
        }
    }, [router])

    // Charge l'image une fois les infos recupérés
    useEffect(()=>{
        if (details !== "loading"){
            let name
            if(details.title){ name = details.title }
            else{ name = details.name }

            const promise = axios.get("https://api.qwant.com/v3/search/images",{
                    params:{
                        'count': 1,
                        'q': `star wars ${name}`,
                        't': 'images',
                        'safesearch': 1,
                        'locale': 'en_US',
                        'offset': 0,
                        'device': 'desktop'
                    }})
                .then(response => response.data.data.result.items[0].media)
                .catch(err => console.log(err))
    
            promise.then(el => {
                if(el !== undefined){ setImage(el) }
            })
        }
    }, [details])

    return(
        <Box w={"100vw"}>
            <NavBar mb={"2rem"} router={router} />
            {
                details !== "loading"
                ? <Box>
                    <Heading textAlign={"center"} mb={"1rem"}>{details.name}</Heading>
                    <Image borderRadius={"25% 10%"} src={image} alt="image" w={"90%"} marginInline={"auto"} mb={"1.5rem"}/>
                    <Table w={"95vw"} overflow={"hidden"} marginInline="auto" mb={"2rem"}>
                        <Tbody>
                            {
                                // Filtre certains mots et ne les affichent pas
                                Object.entries(details).map(entry => {
                                    const [keyy, value] = entry
                                    switch (keyy) {
                                        case 'films':
                                        case 'created':
                                        case 'edited':
                                        case 'url':
                                        case 'homeworld':
                                        case 'starships':
                                        case 'characters':
                                        case 'planets':
                                        case 'vehicles':
                                        case 'species':
                                        case 'pilots':
                                        case 'residents':
                                        case 'people':
                                            return
                                    }
                                    return(
                                        <Tr key={keyy} _hover={{background: "rgba(0, 0, 0, .25)"}}>
                                            <Td textTransform={"capitalize"}>{ keyy.replace(/[_]/g," ") }</Td>
                                            <Td>{value}</Td>
                                        </Tr>
                                        )
                                })
                            }
                        </Tbody>
                    </Table>
                </Box>
                :<Flex justifyContent={"center"} alignItems={"center"} gap={".5rem"}>
                    <Text as="span" fontSize={"1.5rem"}>Chargement</Text>
                    <Spinner />
                </Flex>
            }





            
        </Box>
    )
}