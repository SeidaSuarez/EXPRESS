"use strict";

const btnEliminar = document.getElementById('eliminar');
btnEliminar.addEventListener('click', async () => {
    console.log(btnEliminar.dataset.id);
    try {

        const data = await fetch(`/Pokemon/${btnEliminar.dataset.id}`, {
            method: 'delete'
        });
        const res = await data.json()
        console.log(res);
        if (res.estado) {
            window.location.href='/Pokemon';
        } else {
            console.log(res);
        }
    } catch (error) {
        console.log(error);
    }
})