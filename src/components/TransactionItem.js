import { deleteTransaction, updateTransaction } from "../db/operations"

export default function TransactionItem({transaction}) {
  const modifyTransaction = async (id, status) => {
    console.log('modifyTransaction', id, status);
    await updateTransaction(id, {
      status,
    });
  }

  const transactionRemove = async (id) => { 
    console.log('deleteTransaction', id);
    await deleteTransaction(id);
  }

  return (
    <div className="bg-white shadow rounded-lg mt-3 py-4 px-4">
      <h3 className="text-lg px-5 text-gray-900">{transaction.id}</h3>
      <div className="mt-2">
        <div className="mt-5 ml-6 ">
          <button 
            className="px-4 py-2 rounded-md text-white bg-indigo-500 hover:bg-indigo-800"
            onClick={() => modifyTransaction(transaction.id, 'Complete')}
          >
            Accept
          </button>
          <button 
            className="px-4 py-2 ml-2 rounded-md bg-yellow-200 hover:bg-yellow-400"
            onClick={() => modifyTransaction(transaction.id, 'Rejected')}
          >
            Reject
          </button>

          <button 
            className="px-4 py-2 ml-2 rounded-md bg-red-200 hover:bg-red-400"
            onClick={() => transactionRemove(transaction.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}