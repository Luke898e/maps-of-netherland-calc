const mapCards = [
  {
    title: "Population Density",
    description:
      "Understand where people live most densely across Dutch provinces and key metro areas.",
  },
  {
    title: "Transport Layers",
    description:
      "Overlay roads, rails, and ferry routes to compare mobility corridors quickly.",
  },
  {
    title: "Weather and Flood Zones",
    description:
      "Track rainfall risk and low-lying terrain insights for planning and analysis.",
  },
];

export default function App() {
  return (
    <main className="page">
      <section className="hero">
        <p className="eyebrow">New Project Preview</p>
        <h1>Maps of Netherland</h1>
        <p className="lead">
          This is your second local project running separately from the tax site.
          It is configured for development on port 3001.
        </p>
      </section>

      <section className="grid">
        {mapCards.map((card) => (
          <article className="card" key={card.title}>
            <h2>{card.title}</h2>
            <p>{card.description}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
