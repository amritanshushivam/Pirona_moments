import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-headline">Contact Us</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Get in touch with us... coming soon.
        </p>
      </main>
      <Footer />
    </>
  );
}
