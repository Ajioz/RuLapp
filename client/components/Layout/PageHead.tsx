import Head from "next/head";
import React from "react";

interface PageHeadProps {
    headTitle?: string;
    description?: string;
    keywords?: string;
}

const PageHead: React.FC<PageHeadProps> = ({ headTitle, description, keywords }) => {
    const defaultTitle =
        "Ajiozi | Remaining Useful Life (RUL) Predictive Maintenance Solutions";
    const defaultDescription =
        "Ajiozi provides advanced Remaining Useful Life (RUL) predictive maintenance solutions to optimize asset performance, reduce downtime, and extend equipment lifespan.";
    const defaultKeywords =
        "Ajiozi, RUL, predictive maintenance, remaining useful life, asset management, equipment monitoring, machine learning, industrial IoT, predictive analytics";

    const logoUrl =
        process.env.NEXT_PUBLIC_LOGO_URL || "https://www.ajiozi.com/images/logo.png";

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Ajiozi",
        url: "https://www.ajiozi.com",
        logo: logoUrl,
        parentOrganization: {
            "@type": "Organization",
            name: "Ajiozi",
            url: "https://www.ajiozi.com",
        },
        sameAs: [
            "https://web.facebook.com/ajiozinitiative",
            "https://x.com/ajiozi",
            "https://www.linkedin.com/company/ajiozi",
        ],
        contactPoint: {
            "@type": "ContactPoint",
            telephone: "+234-815-165-4368",
            contactType: "Customer Service",
        },
        founders: [
            { "@type": "Person", name: "Ajiroghene Sunday", jobTitle: "CEO" },
        ],
        employee: [
            {
                "@type": "Person",
                name: "Ajiroghene Sunday",
                jobTitle: "Team Lead, Predictive Maintenance",
            },
        ],
        foundingDate: "2020-01-01",
        foundingLocation: "Warri, Nigeria",
        address: {
            "@type": "PostalAddress",
            streetAddress: "31 Airport Road",
            addressLocality: "Warri",
            addressRegion: "DTH",
            postalCode: "332213",
            addressCountry: "NG",
        },
        additionalType: "Predictive Maintenance Technology Company",
        description: defaultDescription,
    };

    return (
        <>
            <Head>
                <title>{headTitle || defaultTitle}</title>
                <meta name="description" content={description || defaultDescription} />
                <meta name="keywords" content={keywords || defaultKeywords} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://www.ajiozi.com" />

                {/* Open Graph tags */}
                <meta property="og:title" content={headTitle || defaultTitle} />
                <meta
                    property="og:description"
                    content={description || defaultDescription}
                />
                <meta property="og:url" content="https://www.ajiozi.com" />
                <meta property="og:image" content={logoUrl} />
                <meta property="og:type" content="website" />

                {/* Twitter Card tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={headTitle || defaultTitle} />
                <meta
                    name="twitter:description"
                    content={description || defaultDescription}
                />
                <meta name="twitter:image" content={logoUrl} />

                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
                />
            </Head>
        </>
    );
};

export default PageHead;
