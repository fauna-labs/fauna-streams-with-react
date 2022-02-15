import { useEffect, useState } from "react";
import faunaClient, { newTransaction, getTransactionRef } from "../db/operations";
import { CompleteIcon, PendingIcon, RejectIcon, SubmitButtonIcon } from "./Icons";

export default function Home() {

  const [state, setState] = useState({
    name: '',
    plan: 'individual',
    card: '',
    result: ''
  });

  const [subscribedTransaction, setSubscribedTransaction] = useState(null);

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  }

  useEffect(() => {
    if(state.result) {
      const newTransactionRef = getTransactionRef(state.result)
      faunaClient.stream.document(newTransactionRef)
      .on('snapshot', snapshot => { 
        console.log('snapshot', snapshot);
        setSubscribedTransaction(snapshot.data)
      })
      .on('version', version => {
        console.log('version', version);
        setSubscribedTransaction(version.document.data);
      })
      .start()
    }
  }, [state.result])

  const createNewTransaction = async (e) => {
    e.preventDefault();
    const response = await newTransaction({
      ...state,
      status: 'Pending'
    });
    setState({
      ...state,
      result: response.ref.value.id
    })
  }

  const getStatusIcon = () => {
    console.log('status',subscribedTransaction.status )
    switch(subscribedTransaction.status) {
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

  return (
    <div className="flex flex-col items-center">
      <h3 className="font-medium text-gray-700">New Transaction</h3>
      <div className="mt-1 mb-4">
        <input 
          type="text" 
          name="name"
          placeholder="Name on Card"
          className="shadow-md focus:border-purple-500 min-w-500 rounded-md"
          onChange={handleChange}
        />
      </div>
      <div className="mt-1 mb-4">
        <input 
          type="number" 
          name="card"
          placeholder="Card Number"
          className="shadow-md focus:border-purple-500 min-w-500 rounded-md"
          onChange={handleChange}
        />
      </div>

      <label className="font-medium text-gray-700">Select Tier</label>
      <div className="mt-1 mb-4">
        <select 
          name="plan"
          onChange={handleChange} 
          value={state.type}
          className="shadow-md focus:border-purple-500 min-w-500 rounded-md"
        >
          <option value="individual">Individual (USD 50$/month)</option>
          <option value="start-up">Start up (USD 100$/month)</option>
          <option value="enterprise">Enterprise (USD 500$/month)</option>
        </select>
      </div>

      <button 
        className="inline-flex items-center px-4 py-2 border rounded-md text-white bg-indigo-600 focus:ring-4"
        onClick={createNewTransaction}
      >
        <SubmitButtonIcon />
        Submit
      </button>
      {
        state.result && (
          <div className="mt-4">
            <h3 className="font-medium text-gray-700">Transaction ID</h3>
            <textarea value={state.result} disabled className="mt-4"/>
          </div>
        )
      }
      {
        subscribedTransaction && (
          <div className="mt-4">
            <h3 className="flex font-medium text-gray-700">
              {getStatusIcon()}
              <div className="ml-4 mt-1">
                Transaction Status: {subscribedTransaction.status}
              </div>
            </h3>
          </div>
        )
      }
    </div>

  );
}