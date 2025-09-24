import './styles/global.css';

import { Routes, Route } from "react-router-dom";

import routes from "./routes/routes";
import Layout from './components/Layout/Layout';

function App() {
    return (
        <Layout>
            <Routes>
                {routes.map(({ path, element }, index) => (
                    <Route key={index} path={path} element={element} />
                ))}
            </Routes>
        </Layout>
    );
}

export default App;
