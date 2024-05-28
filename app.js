// Ceci est une fonction auto - ex�cutable.Les fonctions auto - ex�cutables
// sont des fonctions qui s'ex�cutent imm�diatement apr�s leur d�claration,
// sans avoir besoin d'�tre appel�es.Les accolades imm�diatement apr�s la 
// d�claration de la fonction et les parenth�ses � la fin de la d�claration 
// d�finissent la fonction et permettent de l'ex�cuter imm�diatement.
(function () {
    // Utilisation de la directive "use strict" pour activer le mode strict en JavaScript
    // Cela implique une meilleure gestion des erreurs et une syntaxe plus stricte pour le code
    "use stict"
    // D�clare la constante pour la dur�e de chaque slide
    const slideTimeout = 2000;
    // R�cup�re les boutons de navigation
    // R�cup�re tous les �l�ments de type "slide"
    const $slides = document.querySelectorAll('.slide');
    // Initialisation de la variable pour les "dots"
    let $dots;
    // Initialisation de la variable pour l'intervalle d'affichage des slides
    let intervalId;
    // Initialisation du slide courant � 1
    let currentSlide = 1;
    // Fonction pour afficher un slide sp�cifique en utilisant un index
    function slideTo(index) {
        // V�rifie si l'index est valide (compris entre 0 et le nombre de slides - 1)
        currentSlide = index >= $slides.length || index < 1 ? 0 : index;
        // Boucle sur tous les �l�ments de type "slide" pour les d�placer
        $slides.forEach($elt => $elt.style.transform = `translateX(-${currentSlide * 100}%)`);
        // Boucle sur tous les "dots" pour mettre � jour la couleur par la classe "active" ou "inactive"
        $dots.forEach(($elt, key) => $elt.classList = `dot ${key === currentSlide ? 'active' : 'inactive'}`);
    }
    // Fonction pour afficher le prochain slide
    function showSlide() {
        slideTo(currentSlide);
        currentSlide++;
    }
    // Boucle pour cr�er les "dots" en fonction du nombre de slides
    for (let i = 1; i <= $slides.length; i++) {
        let dotClass = i == currentSlide ? 'active' : 'inactive';
        let $dot = `<span data-slidId="${i}" class="dot ${dotClass}"></span>`;
        document.querySelector('.carousel-dots').innerHTML += $dot;
    }
    // R�cup�re tous les "dots"
    $dots = document.querySelectorAll('.dot');
    // Boucle pour ajouter des �couteurs d'�v�nement "click" sur chaque "dot"
    $dots.forEach(($elt, key) => $elt.addEventListener('click', () => slideTo(key)));
   
    // Initialisation de l'intervalle pour afficher les slides
    intervalId = setInterval(showSlide, slideTimeout)
    // Boucle sur tous les �l�ments de type "slide" pour ajouter des �couteurs d'�v�nement pour les interactions avec la souris et le toucher
    $slides.forEach($elt => {
        let startX;
        let endX;
        // Efface l'intervalle d'affichage des slides lorsque la souris passe sur un slide
        $elt.addEventListener('mouseover', () => {
            clearInterval(intervalId);
        }, false)
        // R�initialise l'intervalle d'affichage des slides lorsque la souris sort d'un slide
        $elt.addEventListener('mouseout', () => {
            intervalId = setInterval(showSlide, slideTimeout);
        }, false);
        // Enregistre la position initiale du toucher lorsque l'utilisateur touche un slide
        $elt.addEventListener('touchstart', (event) => {
            startX = event.touches[0].clientX;
        });
        // Enregistre la position finale du toucher lorsque l'utilisateur rel�che son doigt
        $elt.addEventListener('touchend', (event) => {
            endX = event.changedTouches[0].clientX;
            // Si la position initiale est plus grande que la position finale, affiche le prochain slide
            if (startX > endX) {
                slideTo(currentSlide + 1);
                // Si la position initiale est plus petite que la position finale, affiche le slide pr�c�dent
            } else if (startX < endX) {
                slideTo(currentSlide - 1);
            }
        });
    })
})()


window.onscroll = function() {myFunction()};

function myFunction() {
  if (document.documentElement.scrollTop > 80) {
    document.getElementById("myP").className = "contenu3";
  } else {
    document.getElementById("myP").className = "";
  }
}