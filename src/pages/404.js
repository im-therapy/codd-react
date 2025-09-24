import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";

export default function NotFound() {
    return (
        <Layout >
            <h1>Аэм ну я ваще хз чо делать, ну... перейди сюда: <Link to='/'></Link>тык</h1>
        </Layout>
    )
}