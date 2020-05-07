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
    return d==='' ? null : new Date(d).toLocaleString("fr-CA", options);
}


export default mySetDate;