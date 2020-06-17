export const updateObjectInArray = (items, itemId) => { 
    if(!itemId) return [];
    const id = items.length > 0 ? items.indexOf(itemId) : -1;
    return id === -1 ? [...items, itemId] : items.filter(g => g !== itemId);
}



