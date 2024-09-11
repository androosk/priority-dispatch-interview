# Dog Lovers App

## Introduction
This Dog Lovers App is a React-based web application that allows users to search for dog images by breed. The user can favorite dog images which saves them to localStorage.

## Features
- Search for dogs by breed
- Custom useFavorites() hook to handle hearting and unhearting dog images
- Auto suggestion of dog breeds in search bar
- Favorite dog images are saved to localStorage
- Infinite scroll type effect using lazy loading on scroll
- Uses the Lucide React library for icons
- Click an image to open it in a modal
- Responsive design with a custom background

## Technologies Used
- React
- TypeScript
- Tailwind CSS
- Vite
- DogCEO API

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/androosk/priority-dispatch-interview.git
   cd priority-dispatch-interview
   ```

2. Install dependencies:
   ```
   npm install
   ```

## Usage

1. Start the development server:
   ```
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:5173` (or the port Vite is running on).

3. Enter a dog breed in the search bar and press Enter or click the Search button to get dog images.

## Building for Production

To create a production build, run:
```
npm run build
```

The built files will be in the `dist` directory, which you can then deploy to your preferred hosting service.

## Customization

### Changing the Background Image
The app uses a custom background image defined in the Tailwind configuration. To change this:

1. Place your new image in the `public/assets/` directory.
2. Update the `tailwind.config.js` file:
   ```javascript
   module.exports = {
     // ...
     theme: {
       extend: {
         backgroundImage: {
           'sunny-day': "url('/assets/your-new-image.jpg')",
         },
       },
     },
     // ...
   }
   ```

## Troubleshooting

If you encounter issues with the background image not displaying:
- Ensure the image file is in the correct location (`public/assets/`).
- Check that the path in `tailwind.config.js` is correct.
- Verify that there are no console errors related to loading the image.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).