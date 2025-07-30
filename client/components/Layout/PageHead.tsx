import Head from "next/head";
import React from "react";

interface PageHeadProps {
    headTitle?: string;
    description?: string;
    keywords?: string;
}

const PageHead: React.FC<PageHeadProps> = ({ headTitle, description, keywords }) => {
    const defaultTitle =
        "ajiozi | Committed to Helping the Unreached and Less Privileged";
    const defaultDescription =
        "ajiozi is an NGO committed to helping the unreached and less privileged in the society through various initiatives and programs.";
    const defaultKeywords =
        "ajiozi, NGO, helping the unreached, less privileged, community support, charity, non-profit organization";

    const logoUrl =
        process.env.NEXT_PUBLIC_LOGO_URL || "https://www.ajiozi.com/images/logo.png";

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "ajioziNigeria",
        url: "https://www.ajiozicom",
        logo: logoUrl,
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
                jobTitle: "Team Lead, Community Support",
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
        additionalType: "Tech Based Company",
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
                <meta property="og:url" content="https://www.ajiozicom" />
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
