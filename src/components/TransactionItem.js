import { useState, useEffect } from "react";
import { deleteTransaction, updateTransaction } from "../db/operations"
import { CompleteIcon, PendingIcon, RejectIcon } from "./Icons";

const acceptStyle = `px-4 py-2 rounded-md text-white bg-indigo-500 hover:bg-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed`
const rejectStyle = `px-4 py-2 ml-2 rounded-md bg-yellow-200 hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed`

export default function TransactionItem({transaction}) {

  const [state, setState] = useState(transaction);

  const modifyTransaction = async (id, status) => {
    const returnVal = await updateTransaction(id, {
      status,
    });
    console.log('modifyTransaction', returnVal.data);
    setState({
      ...state,
      ...returnVal.data
    });
  }

  const transactionRemove = async (id) => { 
    console.log('deleteTransaction', id);
    await deleteTransaction(id);
  }

  const renderIcon = (stattus) => {
    switch(stattus) { 
      case 'Pending':
        return <PendingIcon />
      case 'Complete':
        return <CompleteIcon />
      case 'Rejected':
        return <RejectIcon />
      default:
        return '';
    }
  }

  if(!transaction) { 
    return <div>Loading....</div>;
  }

  return (
    <div className="bg-white shadow rounded-lg mt-3 py-4 px-4">
      <h3 className="text-lg px-5 text-gray-900 inline-flex">
        <span className="mr-4">
         {renderIcon(state.status)}
        </span>
        {state.id}
      </h3>
      <div className="mt-2">
        <div className="mt-5 ml-6 ">
          <button 
            className={acceptStyle}
            onClick={() => modifyTransaction(state.id, 'Complete')}
            disabled={state.status === 'Complete'}
          >
            Accept
          </button>
          <button 
            className={rejectStyle}
            onClick={() => modifyTransaction(state.id, 'Rejected')}
            disabled={state.status === 'Rejected'}
          >
            Reject
          </button>

          <button 
            className="px-4 py-2 ml-2 rounded-md bg-red-200 hover:bg-red-400"
            onClick={() => transactionRemove(state.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}