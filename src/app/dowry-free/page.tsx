import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function DowryFreePage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-headline">Dowry-Free Wedding Initiative</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Join our movement to say no to dowry... coming soon.
        </p>
      </main>
      <Footer />
    </>
  );
}
