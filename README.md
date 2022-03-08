### Getting Started

Clone the repository

Create a new `.env.local` file and add your Fauna key as follows.

```sh
REACT_APP_FAUNA_KEY='fnAxxxxx'
```

Head over to [Fuana Dashboard](https://dashboard.fauna.com/) and create a new **Collection** called `Transaction`.

If you created your database in a region group other than `Global`, add the region group as an environment variable in your `.env` file. 

```sh
...
REACT_APP_FAUNA_DOMAIN='db.us.fauna.com'
```

Follow [this link](https://docs.fauna.com/fauna/current/learn/understanding/region_groups) for all regions groups.

```

Run the following command

```
npm i
npm start
```