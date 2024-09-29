# se-take-home-assignment

## Project setup
This project uses Vue 3, with ESLint for linting and Babel to ensure compatibility with modern browsers.

## Quick start:
* Installing dependencies
```
npm install
```
* Run locally
```
npm run serve
```
* Lint the code
```
npm run lint
```
## Wireframe design:
<img width="1141" alt="wireframe" src="https://github.com/user-attachments/assets/8cd28057-54f4-4e98-946a-610d4fcd4397">

## User Story
1. As a normal customer/guest, after submitting my order, I want to see it move into the "PENDING" area. After the cooking bot processes my order, I want to see it move into the "COMPLETE" area.

2. As a VIP customer, after submitting my order, I want my order to be processed before normal customer orders. However, if there's an existing VIP order, my order should queue behind theirs.

3. As a manager/staff, I want to increase or decrease the number of available cooking bots. When a new bot is added, it should immediately process any pending order. When a bot is removed, the processing order should remain unprocessed.

4. As a cooking bot, I can only pick up and process one order at a time, and each order requires 10 seconds to complete.

## Testing
I have conducted manual testing to ensure the application behaves as expected
