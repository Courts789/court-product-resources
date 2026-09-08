import Image from "next/image";
import { site } from "@/lib/site";

export function About() {
  return (
    <section>
      <div className="mx-auto max-w-[84rem] px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="grid gap-y-10 md:grid-cols-12 md:gap-x-16">
          <div className="md:col-span-3">
            {/* Portrait sits on a lilac block, offset like a pasted plate. */}
            <div className="relative w-fit">
              <span
                aria-hidden="true"
                className="absolute -bottom-3 -right-3 h-full w-full rounded-card bg-lilac"
              />
              <Image
                src="/courtney-bain.jpg"
                alt={`Portrait of ${site.author}`}
                width={400}
                height={400}
                priority
                className="relative h-40 w-40 rounded-card object-cover sm:h-48 sm:w-48"
              />
            </div>

            <p className="headline mt-8 text-2xl text-ink">
              {site.author}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              Group Product Manager, Small Business at MYOB
            </p>
          </div>

          <div className="md:col-span-8 lg:col-span-7">
            <p className="text-[length:var(--text-lede)] leading-[1.5] text-ink">
              I came to product management through marketing, so I start from
              a question most teams reach too late: would anyone pay for this?
            </p>

            <p className="mt-8 max-w-[68ch] leading-relaxed text-ink-soft">
              I spent a decade on campaigns, CRM and go-to-market for
              challenger brands across financial services, eCommerce and
              retail. I kept being handed things that were not quite right and
              asked to sell them, so I moved into product to be in the room
              where the decision got made.
            </p>

            <p className="mt-6 max-w-[68ch] leading-relaxed text-ink-soft">
              Today I am Group Product Manager for Small Business products at
              MYOB, the largest revenue segment across ANZ, after leading Ads
              and Media Products at Cashrewards and Rokt.
            </p>

            <p className="mt-6 max-w-[68ch] leading-relaxed text-ink-soft">
              The work I care about is the commercial part most teams sidestep.
              Are we solving a real problem, will people pay for it, and what
              do the unit economics look like when AI keeps changing how fast
              and cheaply you can build?
            </p>

            <p className="mt-6 max-w-[68ch] leading-relaxed text-ink-soft">
              Outside that I teach pilates and barre, and advocate for women in
              product and technology through Her Tech Circle and Mentor Walks.
              Investing in product communities makes everyone&rsquo;s work
              better, and a good deal more fun.
            </p>

            {/* Rule 06: name the human step, and don't apologise for the AI. */}
            <div className="mt-10 rounded-card bg-sage p-6">
              <p className="eyebrow text-pine">How this site gets made</p>
              <p className="mt-3 max-w-[52ch] leading-relaxed text-ink-soft">
                I use AI to move fast, and read, watch or listen to everything
                myself before it gets listed. Every entry carries what it costs
                you in minutes and my verdict on whether it earns them.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
