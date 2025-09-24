import Header from "./Header";

export default function Layout({ children, ...props }) {
    return (
        <div className="root-layout" >
            <Header />
            <main {...props}>{ children }</main>
        </div>
    )
}