import { Helmet } from "react-helmet-async";
import MainLayout from "@/layouts/MainLayout";
import { referenceHero, referenceProgramImages } from "@/assets/referenceAssets";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About LAYA | Resource Center for Adivasis</title>
        <meta
          name="description"
          content="Learn about LAYA's mission, vision, and 39+ years of service with Adivasi communities in the Eastern Ghats."
        />
        {/* Canonical was missing on this route — the only one of 19. */}
        <link rel="canonical" href="https://laya.org.in/about" />
        <meta property="og:title" content="About LAYA | Resource Center for Adivasis" />
        <meta
          property="og:description"
          content="LAYA's mission, vision and four decades of service with Adivasi communities in the Eastern Ghats."
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <MainLayout>
        <header className="about-header">
          <div className="about-header__inner">
            <p className="about-header__eyebrow type-eyebrow">About LAYA</p>
            <h1 className="about-header__title">A resource centre for Adivasis</h1>
            <p className="about-header__subtitle">
              A Resource Center for Adivasis since 1985 — 39+ years of service and solidarity.
            </p>
            <div className="about-header__meta">
              <span className="type-meta">Founded in Visakhapatnam · 1985</span>
              <span className="type-meta">Working across the Eastern Ghats</span>
            </div>
          </div>
        </header>

        <section className="about-band">
          <div className="container-page about-split">
            <div>
              <p className="type-eyebrow">Who we are</p>
              <h2 className="about-heading__title">Work rooted in accompaniment</h2>
              <div className="about-prose">
                <p>
                  We are a Resource Center for Adivasis. Adivasi communities are increasingly marginalized
                  in spite of inhabiting resource rich areas and are constantly threatened by commercial
                  interests interfering with their habitats.
                </p>
                <p>
                  For over 39 years, we have stood alongside these indigenous communities, fighting for their
                  rights, preserving their culture, and building sustainable futures rooted in traditional wisdom.
                </p>
              </div>
            </div>
            <figure className="about-media">
              <img src={referenceHero} alt="Eastern Ghats landscape" width={1920} height={1080} />
              <figcaption className="about-media__caption">The Eastern Ghats · LAYA field context</figcaption>
            </figure>
          </div>
        </section>

        <section className="about-band about-band--warm">
          <div className="container-page">
            <div className="about-heading">
              <p className="type-eyebrow">The record</p>
              <h2 className="about-heading__title">Four decades, held in facts</h2>
            </div>
            <dl className="fact-ledger">
              {[
                ["Years of service", "39+"],
                ["Lives touched", "500,000+"],
                ["Villages", "1,500+"],
                ["Active programmes", "25+"],
              ].map(([label, value]) => (
                <div className="fact-ledger__row" key={label}>
                  <dt className="fact-ledger__label">{label}</dt>
                  <dd className="fact-ledger__value">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="about-band" id="who-we-are">
          <div className="container-page">
            <header className="about-heading">
              <p className="type-eyebrow">Our foundation</p>
              <h2 className="about-heading__title">The principles that guide the work</h2>
              <p className="about-heading__intro">The principles that guide our work across the Eastern Ghats.</p>
            </header>
            <div className="about-points">
              <article className="about-points__item" id="vision">
                <h3 className="about-points__title">Vision</h3>
                <p className="about-points__desc">
                  We envisage a socially just and humanized society where the marginalised communities find a space
                  for survival with dignity. The vulnerability of such societies is under greater threat with the forces
                  of globalization and privatization on their day-to-day life situation.
                </p>
              </article>
              <article className="about-points__item" id="mission">
                <h3 className="about-points__title">Mission</h3>
                <p className="about-points__desc">
                  Empowerment of marginalised communities for assertion of their rights and to promote relevant
                  sustainable alternatives at the grassroots level.
                </p>
              </article>
              <article className="about-points__item" id="goals">
                <h3 className="about-points__title">Goals</h3>
                <ul className="about-points__list">
                  {[
                    "Promote empowerment of communities in urban, rural, tribal contexts",
                    "Promote sustainable development initiatives at various levels",
                    "Undertake capacity development with youth and women",
                    "Build strategic alliances with voluntary organisations and networks",
                    "Develop alternative database through research and documentation",
                  ].map((goal) => <li key={goal}>{goal}</li>)}
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section className="about-band about-band--sunken">
          <div className="container-page about-split">
            <figure className="about-media">
              <img src={referenceProgramImages[3]} alt="LAYA community work" loading="lazy" width={1500} height={451} />
              <figcaption className="about-media__caption">LAYA community work · field documentation</figcaption>
            </figure>
            <div>
              <p className="type-eyebrow">The LAYA story</p>
              <h2 className="about-heading__title">A resource centre with a long memory</h2>
              <div className="about-prose">
                <p>
                  Founded in 1985 in Visakhapatnam, LAYA began as a small resource center with a big vision — to stand
                  alongside the Adivasi communities of the Eastern Ghats who face increasing marginalization despite
                  living in some of India&apos;s most resource-rich regions.
                </p>
                <p>
                  The word &apos;LAYA&apos; represents &apos;rhythm&apos; — reflecting the organization&apos;s core belief in the wisdom
                  underlying tribal societies and the cosmic balance of creation. Over seven distinct phases, LAYA has
                  evolved from grassroots organizing to comprehensive program development spanning governance,
                  livelihoods, education, health, and environmental conservation.
                </p>
                <p>
                  Today, LAYA&apos;s work touches over 500,000 lives across 1,500+ villages, implementing 25+ active
                  programs that integrate traditional knowledge with contemporary development approaches.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="about-band about-band--ink">
          <div className="container-prose">
            <blockquote className="about-quote">
              <p>
                &ldquo;Give me the strength never to disown the poor or bend my knees before insolent might&rdquo;
              </p>
              <cite>Rabindranath Tagore</cite>
            </blockquote>
          </div>
        </section>
      </MainLayout>
    </>
  );
};

export default About;
