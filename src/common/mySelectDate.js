const selectDate = (amount, type) => {
    let D = new Date();
    return type === 'month' ? D.setMonth(D.getMonth() + amount) : D.setDate(D.getDate() + amount);
  }


export default selectDate;