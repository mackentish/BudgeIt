# TODO

## Design

- Color scheme
- Add dark mode support
- Typography (Barlow?)

## Features

- Nav menu with transaction options
- Custom "fund distribution" settings a user can use to add predetermined amounts or percentages to specific pockets from a given amount. Ex: Payday hits ($6,000) and they select this option to put $1k in _Entertainment_, $2k in _Food_, and $3k in _Bills_
- Touch animations on `<Pocket />` and `<Button />` components
- Make Pockets reorderable
- Allow user to change Pocket color
- Add menu to Pocket that shows up when clicked
  - Options are "Add Funds", "Remove Funds", and "More..." where the "More ..." option allows them to customize the Pocket (for now that could just mean changing color but could add more options later)

## Code Improvement

- Add a `UserContext` that will contain the user data like their Pockets and any necessary user info
- Allow `<Button />` component to use a style prop or any normal button props
