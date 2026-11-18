# Pages Tracker

## Project Description

Pages Tracker is a React-based personal expense management application that helps users record, manage and monitor their daily expenses. It provides a dashboard, expense management features and currency exchange information using a public API.

## Features

- Dashboard displaying financial summaries.
- Add, view, edit and delete expenses.
- Categorize expenses.
- Store expense data in browser local storage.
- Currency exchange rates for KES, USD, EUR and GBP.
- React Router navigation.
- Responsive user interface.

## Technologies Used

- React
- JavaScript
- CSS
- React Router
- Vite
- ExchangeRate-API

## Public API Integration

The application consumes the ExchangeRate-API to retrieve currency exchange rates.

**API endpoint:**

https://open.er-api.com/v6/latest/KES

The application uses JavaScript `fetch()` and React `useEffect()` to retrieve exchange-rate data asynchronously.

The Dashboard displays exchange rates for:
- USD – US Dollar
- EUR – Euro
- GBP – British Pound

API provider: https://www.exchangerate-api.com/

## Installation and Setup

1. Clone the repository:

   `git clone https://github.com/joshmagolo/Pages--Tracker.git`

2. Navigate into the project:

   `cd Pages--Tracker`

3. Install dependencies:

   `npm install`

4. Start the development server:

   `npm run dev`

5. Open the local URL displayed in your terminal.

## Production Build

To generate the production build:

`npm run build`

## Data Storage

Expense records are stored in browser local storage. Currency exchange rates are retrieved from the external ExchangeRate-API.

## Challenges and Solutions

- **Managing application state:** React Context API was used to share expense data across components.
- **Data persistence:** Browser local storage was implemented to retain expense records after refreshing the page.
- **External API integration:** JavaScript fetch and React useEffect were used to retrieve currency exchange rates asynchronously.
- **Navigation:** React Router was used to support navigation between application pages.

## Author

Joshua Magolo

GitHub: https://github.com/joshmagolo
