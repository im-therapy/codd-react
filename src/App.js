import './styles/global.css';

import { Routes, Route } from "react-router-dom";

import routes from "./routes/routes";
import Layout from './components/Layout/Layout';
import { AuthProvider } from './contexts/AuthContext';

function App() {
    return (
        <AuthProvider>
            <Layout>
                <Routes>
                    {routes.map(({ path, element }, index) => (
                        <Route key={index} path={path} element={element} />
                    ))}
                </Routes>
            </Layout>
        </AuthProvider>
    );
}

export default App;
