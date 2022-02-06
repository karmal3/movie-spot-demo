import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {
    return (
        <div className="bg-[#111111] min-h-screen">
            <Navbar />
            <main className="pt-10">{children}</main>
            <Footer />
        </div>
    )
}