import { useState } from "react";

export default function Home() {

  const [state, setState] = useState({
    name: '',
    amount: 0,
    type: '',
  });

  const handleChange = (e) => { 
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  }

  const createNewTransaction = (e) => {
    e.preventDefault();

    console.log('createNewTransaction', state);

    setState({name: ''});

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
          name="type" 
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
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
          <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
        </svg>
        Submit
      </button>
    </div>

  );
}