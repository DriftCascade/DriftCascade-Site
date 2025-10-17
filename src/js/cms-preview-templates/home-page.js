import React from "react";

export default class HomePagePreview extends React.Component {
  render() {
    const {entry, widgetFor} = this.props;
    const mission = entry.getIn(["data", "mission"]);
    const featured = entry.getIn(["data", "featured"]);

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
              <p className="tc i mt3" style={{color: "var(--circuit-blue)"}}>{mission.get("focus")}</p>
            </div>
          </section>
        )}

        {/* Featured Section */}
        {featured && (
          <section className="ph3 pv4 mw7 center">
            <div className="ba b--black-20 br2 pa4" style={{background: "rgba(0, 174, 239, 0.05)", borderColor: "rgba(0, 174, 239, 0.2)"}}>
              <h2 className="f2 mb3" style={{color: "var(--circuit-blue)"}}>{featured.get("title")}</h2>
              <p className="lh-copy mb3">{featured.get("description")}</p>
              <div className="mb3 pa4 tc" style={{background: "#0d0d0d", color: "var(--grey-3)", border: "2px dashed rgba(0, 174, 239, 0.3)", borderRadius: "12px"}}>
                {featured.get("image_placeholder")}
              </div>
              <a href={featured.get("link")} className="btn btn-primary">{featured.get("button_text")}</a>
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

