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

    const tags = entry.getIn(["data", "tags"]);

    return (
      <div className="mw6 center ph3 pv4">
        <h1 className="f2 lh-title b mb3" style={{color: "var(--circuit-blue)"}}>{entry.getIn(["data", "title"])}</h1>
        <div className="flex justify-between grey-3 mb3">
          <div>
            <p>{dateDisplay}</p>
            {entry.getIn(["data", "author"]) && (
              <p className="ma0 f6">By {entry.getIn(["data", "author"])}</p>
            )}
          </div>
          <p>Blog Post Preview</p>
        </div>
        {tags && tags.size > 0 && (
          <div className="mb3">
            {tags.map((tag, i) => (
              <span key={i} className="dib mr2 mb2 pa2 br2" style={{background: "rgba(0, 174, 239, 0.1)", color: "var(--circuit-blue)", fontSize: "0.875rem"}}>
                #{tag}
              </span>
            ))}
          </div>
        )}
        <div className="markdown-content mw6">
          <p className="lh-copy">{entry.getIn(["data", "description"])}</p>
          {entry.getIn(["data", "image"]) && (
            <img 
              src={entry.getIn(["data", "image"])} 
              alt={entry.getIn(["data", "image_alt"]) || entry.getIn(["data", "title"])} 
              className="mb3"
              style={{maxWidth: "100%", height: "auto"}}
            />
          )}
          {widgetFor("body")}
        </div>
      </div>
    );
  }
}

