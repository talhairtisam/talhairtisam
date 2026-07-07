export default function Home() {
  return (
    <main className="cv-page">
      <header>
        <h1 className="text-[20pt] font-bold leading-tight">Talha Irtisam</h1>
        <p className="text-[12pt] font-semibold text-[var(--muted)]">
          Senior Software Engineer
        </p>
        <p className="mt-1.5 text-[10pt]">
          Sialkot, Pakistan &bull; talhairtisam457@gmail.com &bull;{" "}
          <a
            href="https://linkedin.com/in/talhairtisam"
            className="underline-offset-2 hover:underline"
          >
            linkedin.com/in/talhairtisam
          </a>{" "}
          &bull;{" "}
          <a
            href="https://github.com/talhairtisam"
            className="underline-offset-2 hover:underline"
          >
            github.com/talhairtisam
          </a>
        </p>
      </header>

      <section>
        <h2 className="cv-section-title">Professional Summary</h2>
        <p className="cv-paragraph">
          Senior Software Engineer with 4+ years of experience building,
          shipping, and maintaining production software and AI-powered backend
          systems. Owns end-to-end delivery of Python services on AWS — from data
          ingestion and SQL-backed processing pipelines to LLM-integrated
          recommendation and chatbot APIs. Strong engineering-first background in
          CI/CD (GitHub Actions), Docker-based deployments, infrastructure
          automation, and platform reliability across complex, multi-service
          codebases. Led a 6-engineer team as Technical Lead on TechBazaar — a
          4-portal e-commerce ecosystem serving 3,000+ sellers and 100,000+ live
          products. BS in Computer Science. Open to senior remote roles with
          international teams.
        </p>
      </section>

      <section>
        <h2 className="cv-section-title">Work Experience</h2>

        <article>
          <h3 className="cv-role-title">Senior Software Engineer</h3>
          <p className="cv-meta">Ultracodes Pvt. Ltd. — Lahore, Pakistan</p>
          <p className="cv-dates">May 2024 – Present</p>
          <ul className="cv-list list-disc">
            <li>
              Architected and maintained AI-powered backend services for Delivery
              AI using Python, Django, and FastAPI on AWS — building web
              scraping pipelines, SQL data processing workflows, and API
              infrastructure for a real-time dish recommendation engine and
              conversational chatbot.
            </li>
            <li>
              Built retrieval-augmented recommendation and chatbot flows with LLM
              API integration, embedding-based search, prompt versioning, and
              production guardrails (timeouts, fallbacks, output validation).
            </li>
            <li>
              Established and maintained CI/CD pipelines with GitHub Actions and
              BitBucket Pipelines — linting, automated tests, Docker image builds,
              and staged deployments — improving release reliability across
              multiple production services.
            </li>
            <li>
              Led architecture and delivery for TechBazaar as Technical Lead of a
              6-engineer team across a 4-portal ecosystem serving 3,000+ sellers
              and 100,000+ live products.
            </li>
          </ul>
          <p className="cv-tech">
            <strong>Tech:</strong> Python, Django, FastAPI, LLM Integration, RAG,
            Embeddings, PostgreSQL, MySQL, Redis, BullMQ, AWS, Docker, CI/CD,
            GitHub Actions, Web Scraping, Elasticsearch, REST APIs
          </p>
        </article>

        <article>
          <h3 className="cv-role-title">Software Engineer</h3>
          <p className="cv-meta">Ultracodes Pvt. Ltd. — Lahore, Pakistan</p>
          <p className="cv-dates">
            April 2022 – May 2024 (Promoted to Senior Software Engineer)
          </p>
          <ul className="cv-list list-disc">
            <li>
              Built scalable data-processing and event-driven systems using Redis
              Pub/Sub and BullMQ job queues across a microservices architecture.
            </li>
            <li>
              Optimized MySQL database schemas and SQL query performance for
              high-traffic production workflows.
            </li>
            <li>
              Integrated third-party payment gateways and automated end-to-end
              billing flows with idempotency and transactional safety patterns.
            </li>
          </ul>
          <p className="cv-tech">
            <strong>Tech:</strong> Python, Node.js, MySQL, Redis, BullMQ,
            WebSockets, REST APIs, Git, JIRA, Agile
          </p>
        </article>
      </section>

      <section>
        <h2 className="cv-section-title">Projects</h2>

        <article className="mb-2">
          <h3 className="cv-role-title">
            Delivery AI — AI-Powered Dish Recommendation Platform
          </h3>
          <p className="cv-meta">Production · Ultracodes Pvt. Ltd.</p>
          <p className="cv-paragraph">
            Production backend for an AI-driven dish recommendation engine and
            conversational chatbot with scraping pipelines, SQL-backed data
            infrastructure, embedding-based retrieval, and FastAPI/Django API
            layer.
          </p>
          <p className="cv-tech">
            <strong>Stack:</strong> Python, Django, FastAPI, AWS, PostgreSQL, Web
            Scraping, BullMQ, LLM Integration, RAG, Embeddings
          </p>
        </article>

        <article className="mb-2">
          <h3 className="cv-role-title">
            TechBazaar — Multi-Portal E-Commerce Ecosystem
          </h3>
          <p className="cv-meta">Production · Ultracodes Pvt. Ltd.</p>
          <p className="cv-paragraph">
            4-portal platform serving 3,000+ sellers and 100,000+ live products.
            Owned CI/CD pipelines, Docker containerization, Elasticsearch-powered
            search, real-time notifications, and cross-portal database migrations.
          </p>
          <p className="cv-tech">
            <strong>Stack:</strong> Python, Node.js, PostgreSQL, MySQL, Redis,
            BullMQ, Elasticsearch, Docker, CI/CD, GitHub Actions
          </p>
        </article>

        <article>
          <h3 className="cv-role-title">AZ Character Recognition</h3>
          <p className="cv-meta">
            Personal / Academic ·{" "}
            <a
              href="https://github.com/talhairtisam"
              className="underline-offset-2 hover:underline"
            >
              github.com/talhairtisam
            </a>
          </p>
          <p className="cv-paragraph">
            Machine learning project for alphabet character recognition using
            computer vision — dataset preparation, model training, and evaluation
            pipeline in Python.
          </p>
          <p className="cv-tech">
            <strong>Stack:</strong> Python, Machine Learning, Computer Vision
          </p>
        </article>
      </section>

      <section>
        <h2 className="cv-section-title">Skills</h2>
        <p className="cv-paragraph">
          <strong>ML &amp; AI:</strong> Python, LLM Integration, RAG Pipelines,
          Embeddings, Vector Search, Prompt Engineering, Recommendation Systems,
          Web Scraping, Data Processing
        </p>
        <p className="cv-paragraph">
          <strong>Frameworks &amp; Libraries:</strong> Django, FastAPI, PyTorch
          (academic/personal projects), scikit-learn
        </p>
        <p className="cv-paragraph">
          <strong>Data &amp; SQL:</strong> PostgreSQL, MySQL, SQL, Redis,
          MongoDB, Data Pipeline Design, ETL
        </p>
        <p className="cv-paragraph">
          <strong>Cloud &amp; DevOps:</strong> AWS, Docker, CI/CD, GitHub
          Actions, BitBucket Pipelines, Infrastructure Automation, Containerized
          Deployments
        </p>
        <p className="cv-paragraph">
          <strong>Engineering:</strong> Automated Testing, pytest, REST API
          Design, Microservices, BullMQ, System Design, Technical Debt
          Management, Monitoring &amp; Observability, Git
        </p>
        <p className="cv-paragraph">
          <strong>Collaboration:</strong> Technical Leadership, Agile, Scrum,
          Cross-Functional Communication, JIRA
        </p>
      </section>

      <section>
        <h2 className="cv-section-title">Education</h2>
        <h3 className="cv-role-title">Bachelor of Science — Computer Science</h3>
        <p className="cv-meta">COMSATS University Islamabad</p>
        <p className="cv-dates">February 2018 – January 2022</p>
      </section>

      <section>
        <h2 className="cv-section-title">Languages</h2>
        <ul className="cv-list list-disc">
          <li>English: Professional Working Proficiency</li>
          <li>Urdu: Native / Bilingual Proficiency</li>
          <li>Punjabi: Native Proficiency</li>
        </ul>
      </section>
    </main>
  );
}
