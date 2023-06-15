import Carousel from "../utils/Carousel";
import DocumentsChart from "../utils/Document/DocumentsChart";
import PresentationText from "../utils/PresentationText";

export default function Accueil() {
    return (
        <>
        <Carousel/>
        <div className="container accueil justify-content-center">
            <div className="row">
                <PresentationText
                    title="Bienvenue sur notre site de téléchargement de documents universitaires"
                    content="Notre site est une plateforme dédiée au partage et au téléchargement de documents universitaires tels que des TD, TP, devoirs, cours magistraux (CM), etc. Vous trouverez ici une grande variété de ressources éducatives pour vous aider dans vos études et approfondir vos connaissances. Que vous soyez étudiant, enseignant ou passionné, notre site vous permet de contribuer et de bénéficier d'une bibliothèque de documents riches et diversifiés. Naviguez à travers les différentes catégories, recherchez des documents spécifiques et téléchargez-les en quelques clics. Rejoignez notre communauté d'apprentissage et enrichissez votre parcours académique avec notre site de téléchargement de documents universitaires."
                />
            </div>
            <div className="row shadow text-center stat m-4">
            <div className="col-12 font-weight-bold stats"> <h3> STATISTIQUES</h3> 
			</div>
                    {/* <Card
                        title="Mon titre"
                        image="https://cdn.pixabay.com/photo/2016/11/22/19/24/archive-1850170_1280.jpg"
                        content="Le contenu"
                        link="#"
                    />
                    <Card
                        title="Mon titre"
                        image="https://cdn.pixabay.com/photo/2016/11/22/19/24/archive-1850170_1280.jpg"
                        content="Le contenu"
                        link="#"
                    />
                    <Card
                        title="Mon titre"
                        image="https://cdn.pixabay.com/photo/2016/11/22/19/24/archive-1850170_1280.jpg"
                        content="Le contenu"
                        link="#"
                    />
                    <Card
                        title="Mon titre"
                        image="https://cdn.pixabay.com/photo/2016/11/22/19/24/archive-1850170_1280.jpg"
                        content="Le contenu"
                        link="#"
                    /> */}
                    </div>
                    <DocumentsChart/>

            </div>

        </>
    );
}
