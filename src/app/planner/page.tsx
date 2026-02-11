import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function PlannerPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-headline">AI Wedding Planner</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Your smart assistant for wedding planning... coming soon.
        </p>
      </main>
      <Footer />
    </>
  );
}
