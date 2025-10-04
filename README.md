Here’s a clean, updated **README section** with instructions for cloning your React project, setting up `.env`, and running it on **port 4000**:

## Prerequisites

- Node.js (>= 18.x recommended)
- npm (comes with Node.js) or yarn

---

## Setup Instructions

### 1. Clone the Repository from the development branch.

```bash
git clone https://github.com/furiousnur/Task-Management-Frontend
cd Task-Management-Frontend
````

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Variables

1. Copy the example environment file:

```bash
cp .env.example .env
```

2. Open `.env` and set your environment variables. For example, to run the frontend on **port 4000**:

```
PORT=4000
REACT_APP_API_URL=http://localhost:4000/api
```

### 4. Running the App

#### Development Mode

```bash
npm start
# or
yarn start
```

#### Production Build

```bash
npm run build
# or
yarn build
