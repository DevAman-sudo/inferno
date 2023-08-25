import Head from "next/head";
import { Fragment } from "react"; // Import Fragment for shorthand
import Hero from "../components/Hero";
import Products from "../components/Products";
import ShopByArt from "../components/ShopByArt";
import SelectProduct from "../components/SelectProduct";
import ShowOff from "../components/ShowOff";

export default function Home() {
  return (
    <Fragment>
      <Head>
        {/* Meta tags */}
        <title>Inferno Decors - Your Home for Stunning Epoxy Top Coffee Tables</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Explore our collection of stunning epoxy top coffee tables with gold-coated steel base, elegantly designed for a luxurious touch."
        />

        {/* Open Graph / Facebook */}
        <meta property="og:title" content="Inferno Decors" />
        <meta
          property="og:description"
          content="Explore our collection of stunning epoxy top coffee tables with gold-coated steel base, elegantly designed for a luxurious touch."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://infernodecors.com/" />

        {/* Twitter */}
        <meta name="twitter:title" content="Inferno Decors" />
        <meta
          name="twitter:description"
          content="Explore our collection of stunning epoxy top coffee tables with gold-coated steel base, elegantly designed for a luxurious touch."
        />

        {/* Other meta tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://infernodecors.com/" />
      </Head>

      {/* Content sections */}
      <Hero />
      <Products />
      <ShopByArt />
      <SelectProduct />
      <ShowOff />
    </Fragment>
  );
}
