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
    },
    flaga_minimax: false,
    flaga_minimax_kto_wygral_gre: null,
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
    if (sprawdz_czy_wolne(i,j)){
        zmien(i,j, kolko_czy_krzyzyk())
        if (gra.flaga_komputera) ruch_komputera()
        if (gra.flaga_minimax) ruch_minimax()
    } 
    
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
    gra.flaga_minimax = false
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
document.getElementById("minimax").addEventListener("click", () => {zagraj_minimax()})
stworz_mape_strony()

// minimax algorytm implementacja 
function zagraj_minimax(){
    zresetuj_plansze()
    gra.flaga_minimax = true
    gra.flaga = false
}

function ruch_minimax(){
    const [a,b] = znajdz_najlepszy_ruch(gra.mapa_gry,gra.flaga)
    console.log(a,b)
    gra.pola[a][b].innerHTML = gra.flaga ? "X" : "O"
    gra.mapa_gry[a][b] = gra.flaga
    sprawdz_wygrana(gra.flaga)
    gra.flaga = !gra.flaga
}

function znajdz_najlepszy_ruch(plansza,aktualny_gracz) {
   
    let najlepszywynik = -Infinity
    let najlepszyruch = null
    for(let i=0;i <3;i++){
        for(let j=0;j<3;j++){     
            console.log(i)      
            if(plansza[i][j] === undefined){
                let nowa_plansza = plansza.map(rzad => [...rzad])  // z czata
                
                nowa_plansza[i][j]= aktualny_gracz
                let wynik = minimax(nowa_plansza , 0, !aktualny_gracz)    

                if (wynik > najlepszywynik) {
                    najlepszywynik = wynik
                    najlepszyruch = [i,j]
                } 
            }
        }
    }
    console.log("Najlepszy ruch to:", najlepszyruch)
    return najlepszyruch
}
// true ruch komputera false ruch gracza, f
function minimax(plansza,ruchy, tura_komputera) {
    const winner = sprawdz_wygrana_do_minimaxa(plansza)
    if (winner !== null){
        return oblicz_wynik(winner,ruchy)
    }
    if (sprawdz_remis(plansza)) {
        return 0
    }
    if (tura_komputera) {
        let maks = -Infinity
        for (let [i,j] of wszystkie_mozliwe_ruchy(plansza)){
            let nowa_plansza = plansza.map(rzad => [...rzad]) // z czata
            nowa_plansza[i][j] = true  // z czata
            let wynik = minimax(nowa_plansza, ruchy + 1, false)
            maks = Math.max(maks,wynik)
            // console.log(najlepszywynik)
        }
        return maks
    } else {
        let min = Infinity
        for (let [i,j] of wszystkie_mozliwe_ruchy(plansza)){
            // nowa_plansza = zrob_ruch(plansza,ruch,true)
            let nowa_plansza = plansza.map(rzad => [...rzad]) // z czata
            nowa_plansza[i][j] = false // z czata
            let wynik = minimax(nowa_plansza, ruchy + 1, true)
            min= Math.min(min,wynik)
        }
        return min
    }
}

function wszystkie_mozliwe_ruchy(plansza){
    let mozliwe_ruchy = []
    for(let i=0;i <3;i++){
        for(let j=0;j<3;j++){
            if(plansza[i][j]==undefined){
                mozliwe_ruchy.push([i,j])
            }
        }
    }
    return mozliwe_ruchy
}

function sprawdz_remis(plansza){
    for (let rzad of plansza){
        if (rzad.includes(undefined))
        {
            return false
        }
    };
    return true
}


function sprawdz_wygrana_do_minimaxa(plansza) {
    const linie = [
        [plansza[0][0], plansza[0][1], plansza[0][2]],
        [plansza[1][0], plansza[1][1], plansza[1][2]],
        [plansza[2][0], plansza[2][1], plansza[2][2]],
        [plansza[0][0], plansza[1][0], plansza[2][0]],
        [plansza[0][1], plansza[1][1], plansza[2][1]],
        [plansza[0][2], plansza[1][2], plansza[2][2]],
        [plansza[0][0], plansza[1][1], plansza[2][2]],
        [plansza[0][2], plansza[1][1], plansza[2][0]]
    ];
    for (let linia of linie) {
        if (linia[0] !== undefined && linia[0] === linia[1] && linia[1] === linia[2]) {
            return linia[0]; 
        }
    }
    return null;
}
function oblicz_wynik(zwyciezca, ruchy) {
    if (zwyciezca === true) return 10 - ruchy;  
    if (zwyciezca === false) return ruchy - 10; 
    return 0;
}

// dobra wyjasmijmy sobie tak że podstawowo zaczyna sie od O == false a X == true 
// czyli jezeli wygra X to +10 jezeli wygra X to - 10 co jezeli remis?
// ustalmy narazie ze true to jest komputer zawsze a O to gracz

// pojawił się problem ponieważ ma jakąś tam strategie na wygrana ten program, ale przestaje dzialac glebsze wywolywanie sie po pierwszym uzyciu, jak by za pierwszym razem a pozniej przestaje
// no i nie probuje blokowac wygranej jak wiadomo ze gracz ma dwa kolka to powinien postawic tak zeby nie wygral
// no nie wiem jakos tak dziwnie to gra


// bez czata bym sobie nie poradził miałem za dużo błedów po składniowych, po logiczne gdzie przypisywałem true zamiast false i na odwrot
// po bledy takie ze globalne flagi mialem i sie zmieniało , po to ze nie wywowywalem let var, pogubiłem się w swoich zmiennych 
// sprawdzalem czy wszystkie 3 linie są takie same ale zapomnialem ze moga byc jezeli jest undefined 
// no ogolnie to bym tego nie zrobil , teraz juz prawie dobrze jest tylko kodu no trzeba go by zrozumiec i zrobic jeszcze zeby komputer nie myslal ze jest pierwszy