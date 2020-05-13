console.clear();

// ACTION CREATORS - simulate someone dropping off an insurance form
const createPolicy = (name, amount) => {
  // action to be returned
  return {
    type: 'CREATE_POLICY',
    payload: { name, amount }
  };
}

const deletePolicy = name => {
  return {
    type: 'DELETE_POLICY',
    payload: { name }
  }
}

const createClaim = (name, dollarAmount) => {
  return {
    type: 'CREATE_CLAIM',
    payload: { name, dollarAmount }
  }
}

// REDUCERS - departments that take in the form
// default oldListOfClaims in case it is undefined
const claimsHistory(claimsList = [], action) => {
  // we care about the action (form)
  if (action.type === 'CREATE_CLAIM') {
    // always return a new data structure as opposed to modifying existing data
    // i.e. do NOT use oldListOfClaims.push(action.payload)
    return [...claimsList, action.payload];
  }
  
  // we don't care about the action (form)
  return claimsList;
}

// arbitrarily setting default to 100 as an example
const accounting = (totalDollars = 100, action) {
  if (action.type === 'CREATE_CLAIM') {
    return totalDollas - action.payload.dollarAmount;
  } else if (action.type === 'CREATE_POLICY') {
    return totalDollars + action.payload.amount;
  }
  
  // default return
  return totalDollars;
}

// existing policies
const policies = (policyList = [], action) => {
  if (action.type === 'CREATE_POLICY') {
    return [...policyList, action.payload.name];
  } else if (action.type === 'DELETE_POLICY') {
    return policyList.filter(name => name !== action.payload.name);
  }
  
  // default return
  return policyList;
}
