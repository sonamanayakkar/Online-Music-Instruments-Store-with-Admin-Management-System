



export let getitems = (db) => {

    let getter = localStorage.getItem(db)

    let conversion = JSON.parse(getter);

    return conversion;

}