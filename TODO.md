# TODO

## Design

- Color scheme
- Add dark mode support
- Typography (Barlow?)

## Features

- Nav menu with transaction options
- Custom "fund distribution" settings a user can use to add predetermined amounts or percentages to specific pockets from a given amount. Ex: Payday hits ($6,000) and they select this option to put $1k in _Entertainment_, $2k in _Food_, and $3k in _Bills_
- Haptic responses on `<Button />`
- Make Pockets reorderable
- Allow user to change Pocket color
- Add menu to Pocket that shows up when clicked
  - Options are "Add Funds", "Remove Funds", and "More..." where the "More ..." option allows them to customize the Pocket (for now that could just mean changing color but could add more options later)
- Improve form validation and errors

### Screens

- Reporting (money in, money out, etc.)
- Projections (based on current spending, how much will you have in 1 month, 3 months, 6 months, etc.)
- Settings
- Set up recurring distributions
  - User can either distribute percentages (if paycheck isn't consistent) or
    they can distribute a set amount (if paycheck is consistent). This will be
    used to automatically distribute funds to pockets when a paycheck hits & will
    help with projections.

## New Concepts

- API calls (Node.js - separate repo)
  - balance these with state
  - learn about caching (useQuery?)
- Global state (UserContext)
  - experiment with redux
  - persistant storage (AsyncStorage vs ExpoSecureStore)
- biometrics/authentication
  - third party vs custom solution
- Handle different states
  - app in background
  - lose internet connection
- Handle SafeAreaView (on App.tsx)
