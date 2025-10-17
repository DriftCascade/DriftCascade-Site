import React from "react";
import format from "date-fns/format";

export default class BlogPreview extends React.Component {
  render() {
    const {entry, widgetFor} = this.props;
    const date = entry.getIn(["data", "date"]);
    let dateDisplay = "No date set";
    
    if (date) {
      try {
        const dateObj = date instanceof Date ? date : new Date(date);
        if (!isNaN(dateObj.getTime())) {
          dateDisplay = format(dateObj, "MMMM d, yyyy");
        }
      } catch (e) {
        console.warn("Invalid date:", date);
      }
    }

    return (
      <div className="mw6 center ph3 pv4">
        <h1 className="f2 lh-title b mb3" style={{color: "var(--circuit-blue)"}}>{entry.getIn(["data", "title"])}</h1>
        <div className="flex justify-between grey-3 mb3">
          <p>{dateDisplay}</p>
          <p>Blog Post Preview</p>
        </div>
        <div className="markdown-content mw6">
          <p className="lh-copy">{entry.getIn(["data", "description"])}</p>
          {widgetFor("body")}
        </div>
      </div>
    );
  }
}

