console.clear();

// ACTION CREATORS - simulate someone dropping off an insurance form
const createPolicy = (name, amount) => {
  // action to be returned
  return {
    type: 'CREATE_POLICY',
    payload: { name, amount }
  };
};

const deletePolicy = (name) => {
  return {
    type: 'DELETE_POLICY',
    payload: { name }
  };
};

const createClaim = (name, dollarAmount) => {
  return {
    type: 'CREATE_CLAIM',
    payload: { name, dollarAmount }
  };
};

// REDUCERS - departments that take in the form
// default oldListOfClaims in case it is undefined
const claimsHistory = (claimsList = [], action) => {
  // we care about the action (form)
  if (action.type === 'CREATE_CLAIM') {
    // always return a new data structure as opposed to modifying existing data
    // i.e. do NOT use oldListOfClaims.push(action.payload)
    return [...claimsList, action.payload];
  }
  
  // we don't care about the action (form)
  return claimsList;
};

// arbitrarily setting default to 100 as an example
const accounting = (totalDollars = 100, action) => {
  if (action.type === 'CREATE_CLAIM') {
    return totalDollars - action.payload.dollarAmount;
  } else if (action.type === 'CREATE_POLICY') {
    return totalDollars + action.payload.amount;
  }
  
  // default return
  return totalDollars;
};

// existing policies
const policies = (policyList = [], action) => {
  if (action.type === 'CREATE_POLICY') {
    return [...policyList, action.payload.name];
  } else if (action.type === 'DELETE_POLICY') {
    return policyList.filter(name => name !== action.payload.name);
  }
  
  // default return
  return policyList;
};

// pull functions off of Redux
const { createStore, combineReducers } = Redux;

// combine Reducers together
const departments = combineReducers({
  accounting,
  claimsHistory,
  policies
});

// creat Redux store
// store represents our entire Redux app
// contains references to all Reducers and all state (data) produced by those reducers
const store = createStore(departments);

// call action creators and dispatch the actions
const action = createPolicy('Alex', 20);
store.dispatch(action);
store.dispatch(createPolicy('Jim', 30));
store.dispatch(createPolicy('Bob', 40))

store.dispatch(createClaim('Alex', 120));
store.dispatch(createClaim('Jim', 50));

store.dispatch(deletePolicy('Bob'));

console.log(store.getState());
