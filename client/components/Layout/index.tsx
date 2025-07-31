import React, { ReactNode } from "react";
import PageHead from "./PageHead";
import Navbar from "./navbar";
import Footer from "./footer";

interface LayoutProps {
    title?: string;
    head?: Record<string, any>;
    children: ReactNode;
    mainClassName?: string;
}

const Layout: React.FC<LayoutProps> = ({ title, head, children, mainClassName }) => {
    // Try to get className from children if it's a React element
    const childClassName =
        React.isValidElement(children) && (children.props as any).className;

    return (
        <>
            <PageHead {...head} />
            <Navbar title={title} />
            <main className={mainClassName || childClassName || "main"}>
                {children}
            </main>
            <Footer />
        </>
    );
};

export default Layout;
