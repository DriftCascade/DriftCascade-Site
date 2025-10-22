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
            <div className="container">
              <h2>{mission.get("heading")}</h2>
              <div className="philosophy-text">{widgetFor("mission.text")}</div>
            </div>
          </section>
        )}

        {/* Section Divider */}
        <div className="section-divider"></div>

        {/* Featured Game Section */}
        {featuredGame && (
          <section className="ph3 pv4 mw8 center">
            <h2 className="f2 mb4 tc" style={{color: "var(--circuit-blue)"}}>Featured Project</h2>
            <div className="flex-ns items-center pa3 br2" style={{background: "rgba(0, 174, 239, 0.05)", border: "1px solid rgba(0, 174, 239, 0.2)", borderRadius: "12px"}}>
              <div className="w-100 w-50-ns pr3-ns mb3">
                <div className="br2" style={{height: "240px", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center"}}>
                  <div className="ba b--black-20 br2 pa3" style={{background: "#0d0d0d", height: "200px", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--grey-3)"}}>
                    {featuredGame} Concept Art
                  </div>
                </div>
              </div>
              <div className="w-100 w-50-ns pl3-ns">
                <h3 className="f3 mb2">{featuredGame}</h3>
                <span className="project-badge badge-active db mb2">Active Development</span>
                <p className="lh-copy mb3 grey-3 i">Game content will be pulled from /games/{featuredGame}.md</p>
                <div className="btn btn-primary">Learn More</div>
              </div>
            </div>
            <div className="tc mt4">
              <div className="btn btn-primary">See All Games</div>
            </div>
          </section>
        )}

        {/* Section Divider */}
        <div className="section-divider"></div>

        {/* Recent Blog Posts Section */}
        <section className="ph3 pv4 mw8 center">
          <h2 className="f2 mb4 tc" style={{color: "var(--circuit-blue)"}}>Recent Blog Posts</h2>
          <div className="flex-ns flex-wrap justify-center">
            <div className="w-100 w-50-ns pa3">
              <article className="br2" style={{background: "rgba(0, 174, 239, 0.05)", border: "1px solid rgba(0, 174, 239, 0.2)", padding: "1.5rem"}}>
                <h3 className="f4 mb2">
                  <a href="#" className="link" style={{color: "var(--circuit-blue)"}}>Sample Blog Post 1</a>
                </h3>
                <div className="flex justify-between grey-3 mb2" style={{fontSize: "0.875rem"}}>
                  <time>January 15, 2025</time>
                  <span>5 min read</span>
                </div>
                <p className="lh-copy mb3" style={{fontSize: "0.9rem"}}>This is a sample blog post description that would appear in the preview.</p>
                <div className="btn btn-primary" style={{fontSize: "0.875rem", padding: "0.5rem 1rem"}}>Read More</div>
              </article>
            </div>
            <div className="w-100 w-50-ns pa3">
              <article className="br2" style={{background: "rgba(0, 174, 239, 0.05)", border: "1px solid rgba(0, 174, 239, 0.2)", padding: "1.5rem"}}>
                <h3 className="f4 mb2">
                  <a href="#" className="link" style={{color: "var(--circuit-blue)"}}>Sample Blog Post 2</a>
                </h3>
                <div className="flex justify-between grey-3 mb2" style={{fontSize: "0.875rem"}}>
                  <time>January 10, 2025</time>
                  <span>3 min read</span>
                </div>
                <p className="lh-copy mb3" style={{fontSize: "0.9rem"}}>Another sample blog post description for the preview.</p>
                <div className="btn btn-primary" style={{fontSize: "0.875rem", padding: "0.5rem 1rem"}}>Read More</div>
              </article>
            </div>
          </div>
          <div className="tc mt4">
            <div className="btn btn-primary">See All Blog Posts</div>
          </div>
        </section>

        {widgetFor("body") && (
          <div className="markdown-content ph3 mw7 center">
            {widgetFor("body")}
          </div>
        )}
      </div>
    );
  }
}

