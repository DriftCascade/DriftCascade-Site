import CMS from "decap-cms-app";
import cloudinary from "decap-cms-media-library-cloudinary";
import React from "react";

// Import main site styles as a string to inject into the CMS preview pane
// eslint-disable-next-line import/no-unresolved
import styles from "!to-string-loader!css-loader!postcss-loader!sass-loader!../css/main.scss";

import HomePagePreview from "./cms-preview-templates/home-page";
import BlogPreview from "./cms-preview-templates/blog";
import GamePreview from "./cms-preview-templates/game";
import PagePreview from "./cms-preview-templates/page";

CMS.registerPreviewStyle(styles, {raw: true});

// Register Cloudinary media library
CMS.registerMediaLibrary(cloudinary);

// Register preview templates for collections
CMS.registerPreviewTemplate("blog", BlogPreview);
CMS.registerPreviewTemplate("games", GamePreview);

// Register preview templates for pages
CMS.registerPreviewTemplate("home", HomePagePreview);
CMS.registerPreviewTemplate("about", PagePreview);
CMS.registerPreviewTemplate("games_page", PagePreview);
CMS.registerPreviewTemplate("blog_page", PagePreview);

CMS.init();
