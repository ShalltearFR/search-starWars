import Head from "next/head";

export default function HeadComponent(props){
    return(
        <Head>
            <title>Search {props.title}</title>
            <meta name="title" content={`Search - ${props.title}`}/>
            <meta name="description" content="Rechercher des informations sur Star Wars"/>


            <meta property="og:type" content="website"/>
            <meta property="og:url" content={`https://starwars-research.vercel.app${props.path}`}/>
            <meta property="og:title" content={`Search - ${props.title}`}/>
            <meta property="og:description" content="Rechercher des informations sur Star Wars"/>
            <meta property="og:image" content="/media/images/logo.png"/>


            <meta property="twitter:card" content="summary_large_image"/>
            <meta property="twitter:url" content={`https://starwars-research.vercel.app${props.path}`}/>
            <meta property="twitter:title" content={`Search - ${props.title}`}/>
            <meta property="twitter:description" content="Rechercher des informations sur Star Wars"/>
            <meta property="twitter:image" content="/media/images/logo.png"/>
        </Head>
    )
}