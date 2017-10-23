export const required = value => value ? undefined : 'Povinné';
// export const email = value => !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Neplatný formát e-mail adresy' : undefined;
// export const isNumeric = value => isNaN(Number(value)) ? 'Zadejte číselnú hodnotu' : undefined;
export const greaterEqual50 = value => !isNaN(Number(value)) && Number(value) >= 50 ? undefined : "Minimum je 50";