import Maps from "../pages/Maps";
import General from "../pages/General";
import Articles from "../pages/Articles";
import Analytics from "../pages/Analytics";
import Auth from "../pages/Auth";
import NotFound from "../pages/404";

const routes = [
    { path: "/", element: <General /> },
    { path: "/articles", element: <Articles /> },
    { path: "/analytics", element: <Analytics /> },
    { path: "/maps", element: <Maps /> },
    { path: "/auth", element: <Auth /> },
    { path: "*", element: <NotFound /> },
];

export default routes;
