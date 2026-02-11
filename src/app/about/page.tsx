import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-headline">About Us</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          The story of MCA Shaadi Wala (VivahVerse)... coming soon.
        </p>
      </main>
      <Footer />
    </>
  );
}
