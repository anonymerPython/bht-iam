{ 
    'use-strict';

    let toggleView = document.getElementById('toggleviewbtn');
    let tilestoggles = document.getElementById('tilestoggle');

    toggleView.addEventListener('click', 
            function(){
                /* if tilestoggle classname myapp-tiles exists, remove, if does not exist, add - same for toggleviewbtn */
                if(!tilestoggles.classList.contains("myapp-tiles")){
                    console.log("does not exist");
                    tilestoggles.classList.add('myapp-tiles');
                } else if (tilestoggle.classList.contains("myapp-tiles")){
                    console.log("exists");
                    tilestoggles.classList.remove("myapp-tiles");
                }
                if(tilestoggles.classList.contains("myapp-tiles")){
                    console.log("does not exist");
                    toggleView.classList.add('toggle-view2');
                } else if (!tilestoggle.classList.contains("myapp-tiles")){
                    console.log("exists");
                    toggleView.classList.remove("toggle-view2");
                }
            }
    )
}