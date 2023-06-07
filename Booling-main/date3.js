let date3 = new Date(2022, 03, 18);
let jourSemaine3 = date3.getDay();
let jourMois3 = date3.getDate();
let mois3 = date3.getMonth();
let annee3 = date3.getFullYear();
document.getElementById('p3').innerHTML =
    jourMois3 + '/' + mois3 + '/' + annee3;