**Overview**

This Weather App provides weather information based on either a city name or your current location. It displays current weather conditions and a 5-day forecast. The app uses the OpenWeatherMap API for weather data and incorporates location-based features using the Geolocation API.

**Features**

    Search for weather by city name.
    Get weather details based on your current geographical location.
    View recent cities searched for in a dropdown list.
    Responsive design with TailwindCSS for an optimal experience on both mobile and desktop devices.

**Setup Instructions**
Prerequisites

    Basic understanding of HTML, CSS, and JavaScript.
    A modern web browser.

Getting Started

    Clone the Repository:

    bash

git clone <repository-url>
cd weather-app

Open the Project:

Open the index.html file in your preferred code editor or directly in your web browser.

API Key:

    The app uses the OpenWeatherMap API. Sign up at OpenWeatherMap to get an API key.
    Replace YOUR_API_KEY in index.js with your actual API key.

javascript

    const API_KEY = "YOUR_API_KEY";

    Running the App:

    Simply open index.html in a web browser. The app does not require any server-side setup.

Usage:- 

Search for Weather

    Enter a City Name:
        Type the name of the city you want to check in the input field.
        Click the Search button to fetch the weather data for that city.

    View Weather Information:
        The current weather details and a 5-day forecast will be displayed.
        Recent cities searched for will appear in a dropdown below the input field.

   Use Current Location

    Allow Geolocation Access:
        Click the Use Current Location button.
        If prompted, allow the browser to access your location.

    Fetch and View Weather:
        The app will fetch and display weather data based on your current location.

Recent Cities

    Recent cities you have searched for will be saved in local storage.
    You can click on a city in the dropdown to quickly search for weather details for that city again.

Error Handling

    No Coordinates Found: If no coordinates are found for the city entered, you will receive an alert.
    Geolocation Permission Denied: If you deny location access, an alert will prompt you to enable location permissions.
    Network Issues: Alerts will notify you of network errors or issues with the API requests.

Customization

    You can style the app further by modifying the styles.css file or adding additional TailwindCSS classes.
    To change the app's appearance or layout, adjust the HTML and CSS as needed.


