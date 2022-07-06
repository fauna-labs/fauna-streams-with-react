### Getting Started


[Video walkthough](https://www.youtube.com/watch?v=t06LHlk0tE8&ab_channel=FaunaInc.)


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

Run the following command to start the application

```
npm i
npm start
```

### Streams Best Practices

It is always a good idea to unsubscripe from your stream event when the user is not in the page. If you are using React or and other SPA make sure a component unsubscribe from a stream event when the component is destroyed from Virtual DOM. 

Following is a React specific example. 

```jsx
// ...rest of component code
const streamClient = client.stream(transactionSetRef, streamOptions)
  .on('start', start => { 
    console.log('start', start);
  })
  .on('set', set => {
    if(set.action === 'remove') {
      console.log('remove', set.document.ref.value.id);
      setListTransaction(
        listTransaction.filter(item => item.id !== set.document.ref.value.id)
      );
    }
    if(set.action === 'add') { 
      console.log('add', set.document);
      setListTransaction([...listTransaction, {
        id: set.document.ref.value.id,
        status: 'Pending',
      }]);
    }
  })

useEffect(() => {
  streamClient.start();
  return function cleanUp() {
    streamClient.close();
  }
});

...
```

If you do not close the streams connection you might end up with a over usage. **Always cleanup your streams when not in use**

Make sure when you are using a web-workers you close the stream events when not in use. 
