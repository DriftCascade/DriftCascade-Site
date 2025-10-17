import React from "react";

export default class HomePagePreview extends React.Component {
  render() {
    const {entry, widgetFor} = this.props;
    const mission = entry.getIn(["data", "mission"]);
    const featuredGame = entry.getIn(["data", "featured_game"]);

    return (
      <div>
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-logo-container">
            <div className="hero-vector hero-vector-1"></div>
            <div className="hero-vector hero-vector-2"></div>
            <div className="hero-vector hero-vector-3"></div>
            <div className="hero-vector hero-vector-4"></div>
          </div>
          <h1 className="tagline-primary">{entry.getIn(["data", "tagline_main"])}</h1>
          <p className="tagline-secondary">{entry.getIn(["data", "tagline_sub"])}</p>
        </section>

        {/* Mission Section */}
        {mission && (
          <section className="philosophy">
            <div className="mw7 center ph3">
              <h2>{mission.get("heading")}</h2>
              <p className="philosophy-text">{mission.get("text")}</p>
              <p className="tc i mt3" style={{color: "var(--warning-orange)"}}>{mission.get("focus")}</p>
            </div>
          </section>
        )}

        {/* Featured Game Section */}
        {featuredGame && (
          <section className="ph3 pv4 mw8 center">
            <div className="flex-ns items-center">
              <div className="w-100 w-50-ns pr3-ns mb3">
                <div className="ba b--black-20 br2 pa3" style={{background: "#0d0d0d", height: "240px", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--grey-3)"}}>
                  Featured Game: {featuredGame}
                </div>
              </div>
              <div className="w-100 w-50-ns pl3-ns">
                <h3 className="f3 mb2"><span style={{color: "var(--circuit-blue)"}}>Featured:</span> {featuredGame}</h3>
                <p className="lh-copy mb3 grey-3 i">Game content will be pulled from /games/{featuredGame}.md</p>
                <div className="btn btn-primary">Learn More</div>
              </div>
            </div>
          </section>
        )}

        {widgetFor("body") && (
          <div className="markdown-content ph3 mw7 center">
            {widgetFor("body")}
          </div>
        )}
      </div>
    );
  }
}

