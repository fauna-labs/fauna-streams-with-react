import faunadb, {
  Create,
  Collection,
  Ref
} from 'faunadb';

const client = new faunadb.Client({
  secret: process.env.REACT_APP_FAUNA_KEY,
  domain: 'db.fauna.com',
});


export const newTransaction = (data) => client.query(
  Create(
    Collection('Transaction'),
    { data: {
      ...data
    } }
  )
)

export default client;

export const getTransactionRef = (id) => Ref(Collection('Transaction'), id)