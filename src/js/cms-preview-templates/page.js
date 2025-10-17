import React from "react";

// Generic page preview for About, Games page, Blog page
export default class PagePreview extends React.Component {
  render() {
    const {entry, widgetFor} = this.props;
    const subtitle = entry.getIn(["data", "subtitle"]);

    return (
      <section className="ph3 pv4 mw7 center">
        <h1 className="f2 mb3 tc">{entry.getIn(["data", "title"])}</h1>
        {subtitle && <p className="lh-copy mb4 tc">{subtitle}</p>}
        <div className="markdown-content">
          {widgetFor("body")}
        </div>
      </section>
    );
  }
}

