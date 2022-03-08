### Getting Started

Clone the repository

Create a new `.env.local` file and add your Fauna key as follows.

```sh
REACT_APP_FAUNA_KEY='fnAxxxxx'
```

Head over to [Fuana Dashboard](https://dashboard.fauna.com/) and create a new **Collection** called `Transaction`.

Open `operations.js` file. Select the appropiate endpoint based on your database region group. For example, if your database region group is US choose `db.us.fauna.com`. Follow [this link](https://docs.fauna.com/fauna/current/learn/understanding/region_groups) for all regions groups.

```
const client = new faunadb.Client({
  secret: process.env.REACT_APP_FAUNA_KEY,
  domain: 'db.us.fauna.com', 
});
```

Run the following command

```
npm i
npm start
```