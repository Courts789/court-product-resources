import Image from "next/image";
import { site } from "@/lib/site";

export function About() {
  return (
    <section>
      <div className="mx-auto max-w-[84rem] px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="grid gap-y-10 md:grid-cols-12 md:gap-x-16">
          <div className="md:col-span-3">
            {/* Portrait sits on a teal block, offset like a printed plate. */}
            <div className="relative w-fit">
              <span
                aria-hidden="true"
                className="absolute -bottom-3 -right-3 h-full w-full bg-teal"
              />
              <Image
                src="/courtney-bain.jpg"
                alt={`Portrait of ${site.author}`}
                width={400}
                height={400}
                priority
                className="relative h-40 w-40 object-cover sm:h-48 sm:w-48"
              />
            </div>

            <p className="mt-8 font-display text-2xl leading-tight text-ink">
              {site.author}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              Group Product Manager, Small Business at MYOB
            </p>
          </div>

          <div className="md:col-span-8 lg:col-span-7">
            <p className="font-display text-[length:var(--text-lede)] leading-[1.5] text-ink">
              I came to product management through marketing, which means
              I&rsquo;ve always understood something most product teams learn
              too late: customers don&rsquo;t care about your roadmap, your
              intricate in-product messaging, or how clever the solution is.
              They care whether it&rsquo;s worth paying for. After a decade
              building campaigns, CRM programs, and go-to-market strategies for
              challenger brands across financial services, eCommerce, and
              retail, I moved into product management because I kept being
              handed things that weren&rsquo;t quite right and asked to sell
              them. I wanted to be in the room where the decision got made.
            </p>

            <p className="mt-8 max-w-[68ch] leading-relaxed text-ink-soft">
              Today I&rsquo;m Group Product Manager for Small Business products
              at MYOB, the largest revenue segment across ANZ, after leading Ads
              and Media Products at Cashrewards and Rokt. The work I care most
              about is the commercial stuff most product teams sidestep: are we
              solving a real problem, will people pay for it, and what do the
              unit economics look like when AI is reshaping how fast and cheaply
              you can build? Outside of that, I teach pilates and barre, and
              advocate for women in product and technology through Her Tech
              Circle and Mentor Walks. Investing in product communities makes
              everyone&rsquo;s work better, and a good deal more fun.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
