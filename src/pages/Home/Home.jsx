import { Helmet } from "react-helmet";
import Banner from "./Banner";
import HotArtifacts from "./HotArtifacts";
import Timeline from "./Timeline";
import Vision from "./Vision";
import Blog from "./Blog";
import TopContributors from "./TopContributors";
import Statistics from "./Statistics";


const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home | Antiqo</title>
            </Helmet>
            <Banner></Banner>
            <HotArtifacts></HotArtifacts>
            <Statistics></Statistics>
            <Timeline></Timeline>
            <Vision></Vision>
            <TopContributors></TopContributors>
            <Blog></Blog>
        </div>
    );
};

export default Home;