import React from "react";

export default class GamePreview extends React.Component {
  render() {
    const {entry, widgetFor} = this.props;
    const primaryCta = entry.getIn(["data", "primaryCta"]);
    const secondaryCtas = entry.getIn(["data", "secondaryCtas"]);
    const tag = entry.getIn(["data", "tag"]);

    return (
      <section className="ph3 pv4 mw7 center">
        <h1 className="f2 mb2" style={{color: "var(--circuit-blue)"}}>{entry.getIn(["data", "title"])}</h1>
        <p className="i grey-3 mb3">{entry.getIn(["data", "status"])}</p>
        <p className="lh-copy mb4">{entry.getIn(["data", "description"])}</p>

        <div className="mb4 ba b--black-20 br2 pa4 tc" style={{background: "#0d0d0d", color: "var(--grey-3)"}}>
          Concept Art / Logo Placeholder
        </div>

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

