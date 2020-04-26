const mySetDate = (d) => {
    const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        // hour: 'numeric',
        // minute: 'numeric',
        // second: 'numeric',
        timezone: 'UTC'
    };
    return new Date(d).toLocaleString("ru", options);
}


export default mySetDate;