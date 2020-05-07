const mySetDate = (d, locate='ru') => {
    const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        // hour: 'numeric',
        // minute: 'numeric',
        // second: 'numeric',
        timezone: 'UTC'
    };
    return d==='' ? null : new Date(d).toLocaleString(locate, options);
}


export default mySetDate;