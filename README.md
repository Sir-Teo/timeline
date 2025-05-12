# Our Timeline Together

A beautiful timeline website to document the journey of you and your partner. Display memories with text, images, and videos.

## Features

- Vertical timeline with beautifully styled events
- Add new memories with a form
- Support for text, images, and videos
- Responsive design that works on all devices
- Modern UI with smooth animations

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/timeline.git
cd timeline
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Run the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Adding Your Media

1. Place your images in the `public/images/` directory
2. Place your videos in the `public/videos/` directory
3. Reference them in the form or update the `timelineData.ts` file

## Customization

You can customize the timeline by:

1. Editing the `src/app/data/timelineData.ts` file to include your own memories
2. Modifying the styles in `src/app/globals.css`
3. Changing the colors and layout in the components

## Technologies Used

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [react-vertical-timeline-component](https://www.npmjs.com/package/react-vertical-timeline-component)
- [react-icons](https://react-icons.github.io/react-icons/)
- [TypeScript](https://www.typescriptlang.org/)
