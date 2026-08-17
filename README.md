# CardioCare — Heart & Cardiac Centre

A premium multi-page cardiologist website built using
HTML5, CSS3 and Vanilla JavaScript.

## Pages

- Home — index.html
- About — about.html
- Services — services.html
- Expertise — portfolio.html
- Contact — contact.html

## Folder Structure

assets/
├── css/
├── js/
├── images/
└── videos/

## CSS Architecture

style.css is the master stylesheet.

All CSS files are imported through style.css.

Page-specific CSS is maintained inside:

assets/css/pages/

Shared components such as Navbar, Footer,
Buttons and Cards are maintained separately.

## JavaScript Architecture

main.js is the main JavaScript entry point.

Page-specific JavaScript is maintained inside:

assets/js/pages/

Shared functionality is maintained inside:

assets/js/components/

## Images & Videos

Images are stored inside:

assets/images/

Videos are stored inside:

assets/videos/

## Development Rules

1. Do not rename existing files without approval.
2. Do not change the established folder architecture.
3. Keep page-specific CSS inside its respective page folder.
4. Keep page-specific JavaScript inside its respective page folder.
5. Shared components must not contain page-specific styling.
6. All pages must remain responsive.
7. Test desktop and mobile layouts after changes.
8. Keep animations smooth and accessible.
9. Avoid unnecessary libraries or files.
10. Do not create new architecture without confirmation.

## How to Run

Open the project folder in VS Code.

Use Live Server or another local development server
to run the website.

## Project Status

Multi-page architecture established.

Pages:
- Home
- About
- Services
- Expertise
- Contact