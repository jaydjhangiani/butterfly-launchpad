import { Helmet } from "react-helmet-async";

const SITE_URL = "https://www.butterflyeffectcoach.com";
const SITE_NAME = "Butterfly Effect Coach";
const DEFAULT_IMAGE = `${SITE_URL}/ButterflyEffectCoach.jpg`;

interface SEOProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  schemaJson?: string;
}

const SEO = ({ title, description, path = "", image = DEFAULT_IMAGE, schemaJson }: SEOProps) => {
  const canonical = `${SITE_URL}${path}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {schemaJson && (
        <script type="application/ld+json">{schemaJson}</script>
      )}
    </Helmet>
  );
};

export default SEO;
