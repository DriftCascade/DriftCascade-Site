# Drift Cascade Website Repository
Our website is open source! Take a peek behind the curtains.

## Local Development

Clone this repository, and run `yarn` or `npm install` from the new folder to install all required dependencies.

Then start the development server with `yarn start` and  `yarn cms`

## Testing

With the development server running, run the tests locally
with `yarn cypress:run` or `npm run cypress:run`.
Or use `yarn cypress:open` or `npm run cypress:open` to run interactively.

Cypress tests also run on deploy with the [Cypress Netlify integration](https://www.netlify.com/integrations/cypress/).

## Layouts

The template is based on small, content-agnostic partials that can be mixed and matched. The pre-built pages showcase just a few of the possible combinations. Refer to the `site/layouts/partials` folder for all available partials.

Use Hugo’s `dict` functionality to feed content into partials and avoid repeating yourself and creating discrepancies.

## CSS

The template uses a custom fork of Tachyons and PostCSS with cssnext and cssnano. To customize the template for your brand, refer to `src/css/imports/_variables.css` where most of the important global variables like colors and spacing are stored.

## Syntax Highlighting

The site uses Hugo's built-in syntax highlighting with the Chroma highlighter. To change the syntax highlighting theme:

1. **Update the theme** in `site/hugo.toml`:
   ```toml
   [markup.highlight]
     style = "modus-vivendi"  # Change to your preferred theme
   ```

2. **Regenerate the CSS** for the new theme:
   ```bash
   npx hugo gen chromastyles --style=your-theme-name > site/assets/css/syntax.css
   ```

3. **Available themes** include: `monokai`, `doom-one2`, `modus-vivendi`, `dracula`, `github`, and many more. See the [Hugo documentation](https://gohugo.io/quick-reference/syntax-highlighting-styles/) for the full list.

The syntax highlighting CSS is automatically included in the site's head template and will work for all code blocks in your markdown content.

## SVG Social Icons

The social media icons are in `site/assets/img`.
Make sure you use consistent icons in terms of viewport and art direction for optimal results.
For an icon named `icons-facebook.svg`, refer to the SVG `social-icon` partial like so:

```
{{ partial "social-icon" (dict "link" "#" "svg" "icons-facebook" "alt" "Kaldi on Facebook") }}
```

## Thanks!
Based on the Hugo template for Decap CMS with Netlify

This is a small business template built with [Hugo](https://gohugo.io) and [Decap CMS](https://github.com/decaporg/decap-cms), designed and developed by [Darin Dimitroff](https://twitter.com/deezel), [spacefarm.digital](https://www.spacefarm.digital).