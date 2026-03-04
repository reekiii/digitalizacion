import './Sponsors.css';

const sponsors = [
    "Acme Corp", "GlobalTech", "StartUp Inc.", "Venture Partners", "Horizon Media", "Apex Innovations"
];

export default function Sponsors() {
    return (
        <section className="sponsors-section">
            <div className="container">
                <p className="sponsors-label">Confían en nuestra tecnología</p>
                <div className="sponsors-marquee-container">
                    <div className="sponsors-marquee">
                        {[...sponsors, ...sponsors].map((sponsor, index) => (
                            <span key={index} className="sponsor-logo">
                                {sponsor}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
