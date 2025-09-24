import Maps from "../pages/Maps";
import General from "../pages/General";
import NotFound from "../pages/404";

const routes = [
    { path: "/maps", element: <Maps /> },
    { path: "/", element: <General /> },
    { path: " ", element: <NotFound /> },
];

export default routes;
