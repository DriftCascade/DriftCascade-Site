import React from "react";
import format from "date-fns/format";

export default class BlogPreview extends React.Component {
  render() {
    const {entry, widgetFor} = this.props;
    const date = entry.getIn(["data", "date"]);
    const relatedGame = entry.getIn(["data", "related_game"]);
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
    const youtubeVideo = entry.getIn(["data", "youtube_video"]);
    let youtubeId = youtubeVideo || "";

    if (youtubeId.includes("youtu.be/")) {
      youtubeId = youtubeId.replace(/^.*youtu\.be\/([^?&/]+).*$/, "$1");
    } else if (youtubeId.includes("youtube.com/watch")) {
      youtubeId = youtubeId.replace(/^.*[?&]v=([^&]+).*$/, "$1");
    } else if (youtubeId.includes("youtube.com/embed/")) {
      youtubeId = youtubeId.replace(/^.*youtube\.com\/embed\/([^?&/]+).*$/, "$1");
    }

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
          <div className="lh-copy">{widgetFor("description")}</div>
          {youtubeId ? (
            <div className="mb3" style={{position: "relative", width: "100%", paddingTop: "56.25%", overflow: "hidden", borderRadius: "0.5rem"}}>
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}`}
                title={`${entry.getIn(["data", "title"])} video`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                style={{position: "absolute", inset: 0, width: "100%", height: "100%", border: 0}}
              />
            </div>
          ) : entry.getIn(["data", "image"]) && (
            <img 
              src={entry.getIn(["data", "image"])} 
              alt={entry.getIn(["data", "image_alt"]) || entry.getIn(["data", "title"])} 
              className="mb3"
              style={{maxWidth: "100%", height: "auto"}}
            />
          )}
          {widgetFor("body")}
        </div>
        {relatedGame && (
          <div className="mt4 mb4 pa3 br2" style={{background: "rgba(0, 174, 239, 0.05)", border: "1px solid rgba(0, 174, 239, 0.2)"}}>
            <div className="f3 b mb3" style={{color: "var(--circuit-blue)"}}>{relatedGame.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}</div>
            <div className="flex-ns items-start justify-between">
              <div className="pr4-ns mb3 mb0-ns" style={{maxWidth: "42rem"}}>
                <div className="grey-3 mb0">Game description preview</div>
              </div>
              <div>
                <span className="db mb2 pa2 br2 tc" style={{background: "var(--circuit-blue)", color: "black", fontWeight: 700}}>Game Info</span>
                <span className="db mb2 pa2 br2 tc" style={{background: "var(--circuit-blue)", color: "black", fontWeight: 700}}>Blog Posts</span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

