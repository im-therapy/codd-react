import Header from "./Header";

export default function Layout({ children, ...props }) {
    return (
        <div className="root-layout" style={{ height: '100vh', overflow: 'hidden' }}>
            <Header />
            <main {...props} style={{ height: '100%' }}>{ children }</main>
        </div>
    )
}