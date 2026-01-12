import Gallery from "@/components/Gallery";
import Hero from "@/components/Hero";
import { fetchArtworks } from "@/lib/notion";

export const revalidate = 60;

export default async function Home() {
  const artworks = await fetchArtworks();

  return (
    <div className="container mx-auto px-4 min-h-screen">
      <Hero />
      <Gallery artworks={artworks} />
    </div>
  );
}
