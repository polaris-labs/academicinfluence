import { FeaturesPageCategory, FeaturesPageResponse, FeaturesPageArticleSummary} from "../api";

import Link from "next/link";

import { GRAY_DARK, PAGE_WIDTH_STYLE, SECONDARY_DARK, GRAY_MID } from "../styles";

export function Article(props: {article: FeaturesPageArticleSummary}) {
    if (!props.article) {
        return <></>
    }
    return <div css={{display: "flex", alignItems: "top"}}>
        <div className="article" css={{
            display: "flex",
            flexDirection: "column-reverse",
            paddingLeft: "16px",
            paddingRight: "16px",
            alignItems: "top"
        }}>

        <div>
        <Link href={"/features/" + props.article.category.slug + "/" + props.article.slug}>
            <a css={{
                textDecoration: "none"
            }}>
        <h2 css={{
            color: SECONDARY_DARK,
            fontSize: "16px",
            fontWeight: "bold",
            "@media(min-width: 1248px)": {
                fontSize: "28px",
            }
        }}>{props.article.title}</h2>

            </a>
        </Link>
        <div css={{
            color: GRAY_MID,
            fontSize: '12px',
            fontWeight: 250
        }}>{props.article.author}</div>
        <div css={{
            color: GRAY_DARK,
            fontSize: '12px',
            fontWeight: 250,
            marginBottom: '16px'
        }}>{props.article.date}</div>
        <p css={{
            '@media(min-width: 800px)': {
                fontSize: '20px',
            },
            fontSize: '12px',
            color: GRAY_MID
        }}>{props.article.excerpt}</p>
        </div>
        <div>

        <img css={{                width: "100%",
                height: "auto",
                display: "block"}}
 src={"/api/image/" + props.article.featuredImage}/>
        </div>
        </div>
    </div>
}

function CategoryBar(props: {categories: FeaturesPageCategory[]}) {
    return <div css={{
        display: 'flex',
        justifyContent: 'center'
    }}>
        {props.categories.map(category => (
            <Link  href={"/features/" + category.slug} key={category.slug}>
                <a css={{
                    marginLeft: '13px',
                    marginRight: '13px',
                    marginTop: '5px',
                    marginBottom: '5px',
                color: GRAY_DARK,
                fontSize: '20px',
                fontWeight: 500,
            }}>{category.name}</a>
            </Link>
        ))}
    </div>
}



export default function FeaturePage(props: {
    data: FeaturesPageResponse,
    children: React.ReactNode
}) {
    return    <div css={PAGE_WIDTH_STYLE}>
    <CategoryBar categories={props.data.categories}/>
   {props.children}
   </div>
}