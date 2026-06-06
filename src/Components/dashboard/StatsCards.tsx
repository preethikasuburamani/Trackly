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
    {
      title: "Applications",
      value: totalApplications,
    },
    {
      title: "Interviews",
      value: totalInterviews,
    },
    {
      title: "Offers",
      value: totalOffers,
    },
    {
      title: "Rejected",
      value: totalRejected,
    },
  ];

  return (
    <div className="stats-grid">

      {cards.map((card) => (

        <div
          key={card.title}
          className="stats-card"
        >

          <h4>
            {card.title}
          </h4>

          <h2>
            {card.value}
          </h2>

        </div>

      ))}

    </div>
  );
}