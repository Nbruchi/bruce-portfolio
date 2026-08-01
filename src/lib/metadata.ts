export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL!;
export const SITE_NAME = "Bruce Nkundabagenzi";
export const SITE_DESCRIPTION =
  "Sole engineer on a restaurant platform with real-time fiscal compliance, double-entry accounting, and multi-channel payments — full-stack, web and mobile.";

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_NAME,
  url: SITE_URL,
  jobTitle: "Software engineer",
  email: "mailto:brucenkundabagenzi@gmail.com",
  sameAs: [
    "https://github.com/Nbruchi",
    "https://www.linkedin.com/in/bruce-nkundabagenzi-7218b83ab/",
  ],
};
