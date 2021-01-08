import { createGlobalStyle } from "styled-components"

const GlobalStyles = createGlobalStyle`
*{
    padding:0;
    margin:0;
    box-sizing:border-box;
    outline:none;
}
body{
    background:#151515;

}
html {
    &::-webkit-scrollbar{
        width:0.45rem;
    }
    &::-webkit-scrollbar-track{
         background:#151516;
    }
    &::-webkit-scrollbar-thumb{
        background:#717171;
    }
    scrollbar-width:thin;
    scroll-behavior:smooth;
}
a{
    text-decoration:none;
    cursor:pointer;
    color:white;
}
img{
    color:white;
}
@media screen and (max-width:600px){
   .details_platforms{
        display:none !important;
   } 
   .detailsCard{
       padding: calc(0.5rem + 1vw) !important;
       width: 100% !important;
   }
   .name_and_rating h1{
       font-size: calc(1.1rem + 1vw)  !important;
   }
   .details_stars img {
       width: calc(1rem + 1vw)  !important;
       height: calc(1rem + 1vw)  !important;
   }
}
@media screen and (max-width:901px){
    .oneType {
    margin: calc(4.8vw) 0 !important;
    h4{
        font-size: calc(1.8rem + 1vw) !important;
    }
    p{
        font-size: calc(1.3rem + 0.2vw)!important;
    }
    }
    .moreDetails{
        flex-wrap:wrap;
    }
    .details_gallery{
        flex-wrap: wrap;
        min-height: 200px !important;
        height: 38vh !important;
    }
    .details_video{
        height: 100% !important;
    }
    .details_screenshots{
        display:none !important;
    }
    .gameCard{
        flex: 1 1 900px;
        margin-bottom:calc(0.5rem + 1vw)
    }
    .controlSection .type{
        font-size: calc(2.5rem + 1vw);
    }
}
@media screen and (max-width:340px){
   .search input{
        width:calc(8rem + 1vw);
    }
     .gameCard{
        flex: 1 1 900px;
        margin-bottom:calc(0.5rem + 1vw);
        .game-cover img{
            height: 30vh !important; 
        }
    }
    .controlSection .type{
        font-size: calc(1.8rem + 1vw) !important; 
    }

}

@media screen and (max-width:375px){
     .controlSection .type{
        font-size: calc(2rem + 1vw) !important; 
        margin-right:calc(0.7rem + 1vw);
    }
}
@media screen and (max-width:516px){
    .option{
        padding: calc(0.6rem + 0.6vw) calc(1.1rem + 0.6vw) !important; 
    }
    .controlSection .type{
        font-size: calc(1.8rem + 1vw);
        margin-right:calc(0.7rem + 1vw);
    }
    nav{
        padding-top: 6vw !important;
        padding-bottom: 5vw !important;
    }
     .search{
         margin-left:calc(0.2rem + 1vw);
     }
    .search input{
        padding: 0.35rem !important;
    }
    .search button{
        margin-left: 1.1vw !important;
        font-size: calc(0.4rem + 1vw) !important;
        padding: 0 0.5rem !important;
    }
    .logo h1{
        padding-left: 0rem !important;
        font-size: calc(1.4rem + 1vw) !important;
    }
    .logo img{
        width: calc(1.7rem + 1vw) !important;
        height: calc(1.7rem + 1vw)!important;
    }
}
`
export default GlobalStyles
