// ACTION CREATORS - simulate someone dropping off a form
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
