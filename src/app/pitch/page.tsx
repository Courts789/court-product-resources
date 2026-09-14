import type { Metadata } from "next";
import { PitchBuilder } from "@/components/pitch-builder";
import { PitchIntro } from "@/components/pitch-intro";
import { site } from "@/lib/site";

const description =
  "Roles in product are splitting and being reinvented faster than the titles can keep up. Five questions on your own work, and you leave with a short pitch: who you are, how you got here, the type of product person you are, and what you want more of.";

export const metadata: Metadata = {
  title: "Write Your Pitch",
  description,
  alternates: { canonical: "/pitch" },
  openGraph: {
    title: `Write Your Pitch · ${site.name}`,
    description,
    url: `${site.url}/pitch`,
  },
};

export default function PitchPage() {
  return (
    <main id="main" className="flex-1">
      <PitchIntro />
      <PitchBuilder />
    </main>
  );
}
