# se-take-home-assignment
This is a Vue.js application simulating order processing for McDonald's, with bot management features. This project uses Vue 3, with ESLint for linting and Babel to ensure compatibility with modern browsers.

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
Below is the wireframe design for the application's UI.
<img width="1141" alt="wireframe" src="https://github.com/user-attachments/assets/8cd28057-54f4-4e98-946a-610d4fcd4397">

## User Story
1. As a normal customer/guest, after submitting my order, I want to see it move into the "PENDING" area. After the cooking bot processes my order, I want to see it move into the "COMPLETE" area.

2. As a VIP customer, after submitting my order, I want my order to be processed before normal customer orders. However, if there's an existing VIP order, my order should queue behind theirs.

3. As a manager/staff, I want to increase or decrease the number of available cooking bots. When a new bot is added, it should immediately process any pending order. When a bot is removed, the processing order should remain unprocessed.

4. As a cooking bot, I can only pick up and process one order at a time, and each order requires 10 seconds to complete.

## Testing
I have conducted manual testing by simulating the user stories in different browser scenarios (like multiple tabs, same tab, and different browsers) to ensure the application behaves as expected.

## Limitations of current UI application
1) **State Management Issue**

The app uses local storage to manage data. However, event listeners for storage updates do not trigger in the same tab. To observe real-time changes, the application must be opened in multiple browser tabs.

_**Potential solution:** Apply **Vuex** that allows centralize management for states and ensure states are updated in a predictable manner across all components._

.......................

2) **Concurrency Issue**

The _isProcessing_ flag is used to manage bot order processing, which works well in simple scenarios but is not suitable for more complex, real-world cases. This can lead to multiple bots attempting to process the same order simultaneously, causing issues with order accuracy.

_**Potential solution:** Implement **centralized state management, data locking, and a queueing system** to ensure each order is processed by only one bot at a time and in the correct order._

.......................

3) **Bot Destroying Handling**

When reducing the number of active bots, the system immediately returns any currently processing order to the pending list, even if the bot was actively processing it. This can delay order completion.

_**Potential solution:** Add **a progress indicator for each order**, so that when another bot picks up the order, it can resume the process instead of starting over._

.......................

4) **Hardcoded Timeout for Order Completion**

The hardcoded 10-second processing time lacks flexibility for different types of orders or future changes that may require varying processing durations.

_**Potential solution:** Make the processing time a **configurable variable**, allowing it to be dynamically adjusted to accommodate different scenarios._

.......................
