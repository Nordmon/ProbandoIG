export function flip_card_ext(){
    
    const flipCardToggle = document.querySelector("#flip-card-toggle-inac");

    const flipCardToggle2 = document.querySelector("#flip-card-toggle2-inac");

    flipCardToggle.addEventListener('click', toggleFlipCard);   

        function toggleFlipCard(){

            var flipCard = flipCardToggle.parentNode.parentNode.parentNode.parentNode;

                document.getElementById("nombres").value="";
                document.getElementById("pass").value="";

            flipCard.classList.toggle('flipped');

            

            flipCardToggle2.addEventListener('click', toggleFlipCard2);  
        }
        function toggleFlipCard2(){

            var flipCard = flipCardToggle2.parentNode.parentNode.parentNode.parentNode;

                document.getElementById("correo2").value="";
                document.getElementById("nombres2").value="";
                document.getElementById("pass2").value="";

            flipCard.classList.toggle('flipped');

           


            flipCardToggle.addEventListener('click', toggleFlipCard);  
        }

}