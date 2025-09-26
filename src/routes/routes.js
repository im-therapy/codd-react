import Maps from "../pages/Maps";
import General from "../pages/General";
import Articles from "../pages/Articles";
import ArticleDetail from "../pages/ArticleDetail";
import Analytics from "../pages/Analytics";
import Auth from "../pages/Auth";
import NotFound from "../pages/404";
import { ROUTES } from '../constants/routes';

const routes = [
    { path: ROUTES.HOME, element: <General /> },
    { path: ROUTES.ARTICLES, element: <Articles /> },
    { path: ROUTES.ARTICLE_DETAIL, element: <ArticleDetail /> },
    { path: ROUTES.ANALYTICS, element: <Analytics /> },
    { path: ROUTES.MAPS, element: <Maps /> },
    { path: ROUTES.AUTH, element: <Auth /> },
    { path: "*", element: <NotFound /> }
];

export default routes;
