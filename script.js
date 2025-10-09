// Dodać zresetuj gre 
// Dodac licznik punktów dla X i dla O
// Dodać dwa przyciski Graj z graczem, graj z komputerem
// udało sie 

// dodanie algorytmu mini max i dodatkowego przycisku żeby grać z komputerem z algorytmem mini max


const gra = {
    flaga: false,
    mapa_gry: [[],[],[]],
    pole_wygranej: document.getElementById("wygrana"),
    czy_koniec_gry: false,
    pola: Array(3).fill().map(()=>Array(3).fill()),
    flaga_komputera: false,
    wyniki : {
        X: 0,
        O: 0
    }
}
// let gra.pola = Array(3).fill().map(()=>Array(3).fill())

function sprawdz_wygrana(znak) {
    if ((gra.mapa_gry[0][0] == znak && gra.mapa_gry[0][1] == znak && gra.mapa_gry[0][2] == znak) || (gra.mapa_gry[1][0] == znak & gra.mapa_gry[1][1] == znak & gra.mapa_gry[1][2] == znak) || gra.mapa_gry[2][0] == znak & gra.mapa_gry[2][1] == znak & gra.mapa_gry[2][2] == znak ) {
        oglos_wygrana(znak)
        console.log("a")
    }
    if ((gra.mapa_gry[0][0] == znak && gra.mapa_gry[1][0] == znak && gra.mapa_gry[2][0] == znak) || (gra.mapa_gry[0][1] == znak & gra.mapa_gry[1][1] == znak & gra.mapa_gry[2][1] == znak) || gra.mapa_gry[0][2] == znak & gra.mapa_gry[1][2] == znak & gra.mapa_gry[2][2] == znak ) {
        oglos_wygrana(znak)
        console.log("a")
    }
    if ((gra.mapa_gry[0][0] == znak && gra.mapa_gry[1][1] == znak && gra.mapa_gry[2][2] == znak) || (gra.mapa_gry[0][2] == znak & gra.mapa_gry[1][1] == znak & gra.mapa_gry[2][0] == znak)) {
        oglos_wygrana(znak)
        console.log("a")
    }
}
function kolko_czy_krzyzyk() {
    if (gra.flaga) {
        return "X"
    } else {
        return "O"
    }
}
function oglos_wygrana(znak){
        znak ? gra.wyniki.X +=1 : gra.wyniki.O +=1
        znak ? document.getElementById("wynik-X").innerHTML = gra.wyniki.X : document.getElementById("wynik-O").innerHTML = gra.wyniki.O
        if (znak === true) {
            znak = "X"
        } else znak = "O"
       gra.pole_wygranej.innerHTML = `Wygrana nalezy do ${znak}`
        zakoncz_gre()
}
function zmien(i,j, znak) {
    gra.pola[i][j].innerHTML = znak
    gra.mapa_gry[i][j] = gra.flaga
    sprawdz_wygrana(gra.flaga)
    gra.flaga = !gra.flaga
}
function sprawdz_czy_wolne(i,j) {
    if (gra.czy_koniec_gry) return false  
    return gra.mapa_gry[i][j] === undefined
}
function klikniecie (i,j) {
    if (sprawdz_czy_wolne(i,j)) zmien(i,j, kolko_czy_krzyzyk())
    // sprawdzenie do gry z komputerem
    if (gra.flaga_komputera) ruch_komputera()
}
function zakoncz_gre () {
    gra.czy_koniec_gry = true
    // zakonczenie ruchow komputera
    gra.flaga_komputera = false
}
function stworz_mape_strony() {
    for(let i = 0; i < 3 ; i++ ){
        for (let j = 0; j < 3 ; j++){
            gra.pola[i][j] = document.getElementById(`Pole-${i}${j}`)
            gra.pola[i][j].addEventListener("click", () => (klikniecie(i,j)))
        }
    }
    wylosuj_losowa_liczbe(3)
    return gra.pola
}


// funkcjonalności

function wylosuj_losowa_liczbe(maks){
    return Math.floor(Math.random()*maks) 
}

function zresetuj_plansze() {
    for(let i = 0; i < 3 ; i++ ){
        for (let j = 0; j < 3 ; j++){
            gra.pola[i][j].innerHTML = ""
        }
    }
    gra.flaga = false
    gra.mapa_gry = [[], [], []]
    gra.czy_koniec_gry = false
    gra.flaga_komputera = false
}


function zagraj_z_graczem() {
    null
}
function ruch_komputera(){
    let a,b 
    a = wylosuj_losowa_liczbe(3)
    b = wylosuj_losowa_liczbe(3)
    do {
        a = wylosuj_losowa_liczbe(3)
        b = wylosuj_losowa_liczbe(3)
    } while ((!sprawdz_czy_wolne(a,b) & !gra.czy_koniec_gry))
    gra.pola[a][b].innerHTML = gra.flaga ? "X" : "O"
    gra.mapa_gry[a][b] = gra.flaga
    sprawdz_wygrana(gra.flaga)
    gra.flaga = !gra.flaga
}
function zagraj_z_komputerem() {
    zresetuj_plansze()
    gra.flaga_komputera = true
}
function zresetuj_wyniki(){
    gra.wyniki.X = 0
    gra.wyniki.O = 0
    document.getElementById("wynik-X").innerHTML = 0
    document.getElementById("wynik-O").innerHTML = 0
}
function pauseBrowser(millis) {
    var date = Date.now();
    var curDate = null;
    do {
        curDate = Date.now();
    } while (curDate-date < millis);
}

function easteregg(){
    // szczerze z czata nie wiem czemu to tak dziala
    const sound = new Audio("sound.mp3");
      sound.play();

      // Po 2 sekundach zatrzymaj i odśwież stronę
      setTimeout(() => {
        sound.pause();
        window.location.reload(); // odśwież stronę
      }, 2000)
    
}

document.getElementById("Reset").addEventListener("click", () => {zresetuj_plansze()})
document.getElementById("Gra-komputer").addEventListener("click", () => {zagraj_z_komputerem()})
document.getElementById("Gra-gracz").addEventListener("click", () => {zresetuj_plansze()} )
document.getElementById("Reset-wynik").addEventListener("click", () => {zresetuj_wyniki()})
document.getElementById("Odswiez").addEventListener("click", () => {easteregg()})
stworz_mape_strony()
