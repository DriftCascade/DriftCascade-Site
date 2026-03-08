import React from "react";

export default class GamePreview extends React.Component {
  render() {
    const {entry, widgetFor} = this.props;
    const primaryCta = entry.getIn(["data", "primaryCta"]);
    const secondaryCtas = entry.getIn(["data", "secondaryCtas"]);
    const tag = entry.getIn(["data", "tag"]);
    const trailerVideo = entry.getIn(["data", "trailer_video"]);
    let trailerId = trailerVideo || "";

    if (trailerId.includes("youtu.be/")) {
      trailerId = trailerId.replace(/^.*youtu\.be\/([^?&/]+).*$/, "$1");
    } else if (trailerId.includes("youtube.com/watch")) {
      trailerId = trailerId.replace(/^.*[?&]v=([^&]+).*$/, "$1");
    } else if (trailerId.includes("youtube.com/embed/")) {
      trailerId = trailerId.replace(/^.*youtube\.com\/embed\/([^?&/]+).*$/, "$1");
    }

    return (
      <section className="ph3 pv4 mw7 center">
        <h1 className="f2 mb2" style={{color: "var(--circuit-blue)"}}>{entry.getIn(["data", "title"])}</h1>
        <p className="i grey-3 mb3">{entry.getIn(["data", "status"])}</p>
        <p className="lh-copy mb4">{entry.getIn(["data", "description"])}</p>

        {entry.getIn(["data", "conceptArt"]) ? (
          <div className="mb4">
            <img src={entry.getIn(["data", "conceptArt"])} alt={`${entry.getIn(["data", "title"])} Concept Art`} className="w-100 br2" />
          </div>
        ) : entry.getIn(["data", "titleImage"]) ? (
          <div className="mb4">
            <img src={entry.getIn(["data", "titleImage"])} alt={`${entry.getIn(["data", "title"])} Title Image`} className="w-100 br2" />
          </div>
        ) : (
          <div className="mb4 ba b--black-20 br2 pa4 tc" style={{background: "#0d0d0d", color: "var(--grey-3)"}}>
            Concept Art / Logo Placeholder
          </div>
        )}

        <div className="flex-ns items-center mb4">
          {primaryCta && (
            <a href={primaryCta.get("link")} className="btn btn-secondary mr3">
              {primaryCta.get("text")}
            </a>
          )}
          {secondaryCtas && secondaryCtas.map((cta, i) => (
            <a key={i} href={cta.get("link")} className="btn btn-primary mr2">
              {cta.get("text")}
            </a>
          ))}
        </div>

        {trailerId && (
          <div className="mb4" style={{position: "relative", width: "100%", paddingTop: "56.25%", overflow: "hidden", borderRadius: "0.5rem", background: "#000"}}>
            <iframe
              src={`https://www.youtube.com/embed/${trailerId}`}
              title={`${entry.getIn(["data", "title"])} trailer`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              style={{position: "absolute", inset: 0, width: "100%", height: "100%", border: 0}}
            />
          </div>
        )}

        <div className="markdown-content mt4">
          {widgetFor("body")}
        </div>

        {tag && (
          <div className="mt4 pa3 br2" style={{background: "rgba(0, 174, 239, 0.05)", border: "1px solid rgba(0, 174, 239, 0.2)"}}>
            <p className="mb2 grey-3">Blog posts will be linked using tag: <strong>{tag}</strong></p>
          </div>
        )}
      </section>
    );
  }
}

