 
interface Props {
  totalApplications: number;
  totalInterviews: number;
  totalOffers: number;
  totalRejected: number;
}

export default function StatsCards({
  totalApplications,
  totalInterviews,
  totalOffers,
  totalRejected,
}: Props) {
  
  const cards = [
    { title: "Applications", value: totalApplications },
    { title: "Interviews", value: totalInterviews },
    { title: "Offers", value: totalOffers },
    { title: "Rejected", value: totalRejected },
  ];

  return (
    <div className="stats-grid">
      {cards.map((card, index) => (
        <div key={index} className="stats-card">
          <div className="stats-card-header">
            <h3 className="stats-card-title">{card.title}</h3>
          </div>
          <div className="stats-card-content">
            <p className="stats-card-value">{card.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}