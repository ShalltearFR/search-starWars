import { Box, Flex, Text, Image, Skeleton, VStack, HStack, Heading, Spinner }   from "@chakra-ui/react"
import { useRouter }                                                            from "next/router"
import Link                                                                     from 'next/link'
import Error                                                                    from 'next/error'
import { useState, useEffect }                                                  from "react"

import NavBarSearch                                                             from "../Components/NavBar.search"
import HeadComponent                                                            from "../Components/HeadComponent"

import axios                                                                    from "axios"
import { useDebounce }                                                          from 'use-debounce'

export default function Search(){
    const [searchValue, setSearchValue]     = useState("-1")
    const [searchType, setSearchType]       = useState("-1")
    const [searchPage, setSearchPage]       = useState("-1")
    
    const [searchImages, setSearchImages]   = useState("-1")
    const [searchResults, setSearchResults] = useState("loading")

    const [searchValueDebounce]             = useDebounce(searchValue, 500);
    const router                            = useRouter()

    // Recupère les informations pour les mettre dans une state
    function search(){
        if ((searchValue && searchType) !== "-1"){ // Corrige le soucis des states avec leurs changements async
            axios.get(`/${searchType}/?search=${searchValue}&page=${searchPage}`)
            .then(response=> setSearchResults(response.data))
            .catch(() => setSearchPage("1"))
        }
    }

    function changeType(e){ setSearchType(e.target.value); setSearchPage("1") }
    function changeValue(e){ setSearchValue(e.target.value); setSearchPage("1") }

    // Initialise les variables
    useEffect(()=>{ 
        // Attends le chargement du router
        if ( (router.query.value && router.query.type) !== undefined ){
            setSearchValue(router.query.value)
            setSearchType(router.query.type)
            if(router.query.page === undefined){
                setSearchPage("1")
            } else{
                setSearchPage(router.query.page)
            }
        }
    }, [router])

    // Lance la recherche à l'initialisation et à chaque changements
    useEffect(()=>{
        setSearchResults("loading")
        setSearchImages("-1")
        search()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchValueDebounce, searchType, searchPage])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(()=> { searchResults !== "loading" && getImages() }, [searchResults])

    function getImages(){ // Recupère les images pour chaque vignette
        const promises = searchResults.results.map(el =>{
            let name
            if(el.title){ name = el.title }
            else{ name = el.name }

            return axios.get("https://api.qwant.com/v3/search/images",{
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
        })

        Promise.all(promises).then(images => {
            if(images[0] !== undefined){
                setSearchImages(images)
            }
        })
    }

    return(
        <>
            <HeadComponent title={` - résultats pour ${searchValue}`} path="/search"/>

            <Box mb={"2rem"}>
                <NavBarSearch searchValue={ {get: searchValue, set: changeValue} } searchType={ {get: searchType, set: changeType} } mb={"1rem"}/>
                {
                    searchResults === "loading" // Affichage chargement
                    ? <div>
                        <Flex justifyContent={"center"} alignItems={"center"} gap={".5rem"}>
                            <Text as="span" fontFamily="Finger Paint" fontSize={"1.5rem"}>Chargement</Text>
                            <Spinner />
                        </Flex>
                    </div>
                    : searchResults.count !== 0 // Si la recherche contient au moins 1 objet
                        ?<Box>
                            <Heading as="h3" fontSize={"1rem"} color="gray" textAlign={"right"} marginRight="2rem">{searchResults.count} résultats</Heading>
                            <Flex flexWrap={"wrap"} gap={"2rem"} justifyContent={"center"} mt={"1rem"}>
                            {
                                searchResults.results.map( (el, i) =>{
                                    let id = el.url.split("/")
                                    id = id[id.length - 2]

                                    return(
                                        <Link key={el.url} href={`/details?type=${searchType}&value=${searchValue}&id=${id}&page=${searchPage}`} passHref>
                                            <VStack w={"150px"} h={"200px"} border={"solid 1px black"} _hover={{background: "rgba(0,0,0,.25)", filter: "brightness(120%) contrast(200%)", transitionDuration: ".5s", transitionTimingFunction: "ease-in-out"}} pb="10px">
                                                <Flex h={"140px"} justifyContent={"center"} alignItems={"center"}>{/* Image */}
                                                    {
                                                        searchImages === "-1"
                                                        ? <Skeleton h={"100%"}/>
                                                        : <Image borderRadius={"25% 10%"} h={"90%"} w={"100px"} objectFit={"cover"} src={searchImages[i]} alt="image" fallbackSrc="/media/images/loading_icon.gif"/>
                                                    }
                                                </Flex>
                                                <Text display={"flex"} fontFamily="Finger Paint" h={"30%"} fontSize={".8rem"} alignItems={"flex-end"} marginBlockEnd="10px" paddingInline={"5px"} textAlign={"center"} fontWeight="bold">
                                                    { el.name && el.name }
                                                    { el.title && el.title }
                                                </Text>
                                            </VStack>
                                        </Link>
                                    )   
                                })
                            }
                            </Flex>
                            <HStack mt={"2rem"} justifyContent="center" alignItems={"center"}>
                                {
                                    searchResults.previous &&
                                    <Link href={`/search?type=${searchType}&value=${searchValue}&page=${Number(searchPage) - 1}`}><Image onClick={()=>setSearchResults("loading")} src="/media/images/triangle.svg" alt="page precedente"/></Link>
                                }
                                <Text as="span" fontFamily="Lexend" fontSize="1.5rem">page {searchPage}</Text>
                                {
                                    searchResults.next &&
                                    <Link href={`/search?type=${searchType}&value=${searchValue}&page=${Number(searchPage) + 1}`}><Image onClick={()=>setSearchResults("loading")} src="/media/images/triangle.svg" alt="page suivante" transform={"rotate(180deg)"} /></Link>
                                }
                            </HStack>
                        </Box>



                        :<Box> {/* Indique que la recherche n'abouti a rien*/}
                            <Heading as="h3" fontFamily="Finger Paint" textAlign={"center"} mb={"2rem"} fontSize={"1.5rem"}>Il n’y a pas de résultats</Heading>
                            <Image w={["90%","90%","35vh"]} marginInline={"auto"} src="/media/images/notFound.png" alt="image" />
                        </Box>
                }
            </Box>
        </>
    )
}