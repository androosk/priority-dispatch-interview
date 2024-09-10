# Weather App

## Introduction
This Weather App is a React-based web application that allows users to search for current weather conditions in cities around the world. It uses the Weatherstack API to fetch real-time weather data and displays it in a user-friendly interface.

## Features
- Search for weather by city name
- Display current temperature in Fahrenheit
- Show wind speed in miles per hour
- Provide additional weather details such as humidity, pressure, and visibility
- Responsive design with a custom background

## Technologies Used
- React
- TypeScript
- Tailwind CSS
- Vite
- Weatherstack API

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/weather-app.git
   cd weather-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add your Weatherstack API key:
   ```
   VITE_WEATHERSTACK_API_KEY=your_api_key_here
   ```

## Usage

1. Start the development server:
   ```
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:5173` (or the port Vite is running on).

3. Enter a city name in the search bar and press Enter or click the Search button to see the weather information.

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