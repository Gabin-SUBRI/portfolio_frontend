let date2 = new Date(2022, 02, 15);
let jourSemaine2 = date2.getDay();
let jourMois2 = date2.getDate();
let mois2 = date2.getMonth();
let annee2 = date2.getFullYear();
document.getElementById('p2').innerHTML =
    jourMois2 + '/' + mois2 + '/' + annee2;