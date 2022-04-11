import { graphql, useStaticQuery } from 'gatsby'

const MainLayout = () => {
            const { banner } = useStaticQuery(
            graphql`
            query {
                banner: file(relativePath: { eq: "assets/header.png" }) {
                    childImageSharp {
                        gatsbyImageData{
                            maxWidth: 1920
                        }
                    }
                }
            }`
        )
    return (

    )
}