let date1 = new Date(2022, 01, 27);
let jourSemaine = date1.getDay();
let jourMois = date1.getDate();
let mois = date1.getMonth();
let annee = date1.getFullYear();
document.getElementById('p1').innerHTML =
    jourMois + '/' + mois + '/' + annee;


    