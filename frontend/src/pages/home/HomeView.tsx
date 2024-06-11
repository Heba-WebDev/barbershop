import { Header } from '@/components/layout'
import { HeroSlider, ProductsBar, RecomendationSection, SearchSection } from './Components'
//import { useLoaderData } from "react-router-dom"
// interface HomeData{
//   message:string;
// }


// const mainColor="#ffffff";
// const secondColor="#000000";

export const HomeView = () => {

    //const data=useLoaderData() as HomeData;
    return (
        <div className="  px-5 sm:px-0">
            <Header />

            <SearchSection/>

            <HeroSlider />

            <ProductsBar />

            <RecomendationSection />

        </div>
    )
}
