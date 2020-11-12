class ViewController {


    constructor(root) {
        console.log("created Viewcontroller " + root);
        this.root = root;
    }

    initialiseView() {
       // this.mainElement = document.querySelectorAll("ul")[0];
       // console.log(this.mainElement);
        this.toggleViewmode();
        this.listInteraction();
        this.menuInteraction();
        this.loadDataFromServerAndPopulateList();
        this.addingNewElements();
    }

    toggleViewmode() {
        const toggleButton = this.root.querySelector("#toggleviewbtn");
        const toggleViewElement = this.root.querySelector("#tilestoggle");
        this.fadeElement = this.root.querySelector("main");

        toggleButton.onclick = () => {
            this.fadeElement.classList.toggle("myapp-faded");

            this.fadeElement.ontransitionend = () => {
                this.fadeElement.classList.remove("myapp-faded");
            }
            // not the most elegant approach, i know. But it works.
            setTimeout(function () {
                toggleViewElement.classList.toggle("myapp-tiles");
                toggleButton.classList.toggle("toggle-view2");
            }, 2000)

            // Graue Leiste wird mit ausgeblendet. Das ist dem geschuldet, dass es ein subelement von 
            // main ist. Wenn Zeit ist, noch ändern //TODO
        }
    }

    listInteraction() {
        const ulElement = document.querySelectorAll("ul")[0];
        ulElement.onclick = (evt) => {
            console.log("evt.target.list: " + evt.target, evt);
            const liElement = this.lookupLi(evt.target);
            console.log("liElement: ", liElement);
            if(liElement){
                alert("click on: " + this.getTitleFromLi(liElement));
            } else {
                alert("no li could be found!");
            }
        }
    }

    lookupLi(el){
        if (el instanceof HTMLLIElement) {
            return el;
        } else if (el === document.body){
            alert("Something went wrong");
        } else if (el.parentNode) {
            return this.lookupLi(el.parentNode);
        }
    }
    
    getTitleFromLi(liElement){
        return liElement.querySelector(".medianame").textContent;
        // paragraph class medianame textcontent
    }

    menuInteraction(){
        const optElement = this.root.querySelector(".limenu");
        optElement.onclick = (evt) => {
            console.log("evt.target.menu: " + evt.target, evt);
            evt.stopPropagation();

            const liElement = this.lookupLi(evt.target);
            console.log("liElement: ", liElement);
            if (liElement){
                alert("click on: " + this.getTitleFromLi(liElement) + " img URL is: " + this.getUrlFromImg(liElement));
            } else {
                alert("no li could be found"); 
            }
        }
    }

    getUrlFromImg(liElement){
        return liElement.querySelector("img").src;
    }

    addingNewElements(){
        const dolly  = document.getElementById("template");
        //this.dolly.parentNode.removeChild(this.dolly); //remove Element
        console.log("template dolly is " + dolly);
        const addNewElementsButton = document.getElementById("additembtn");
        addNewElementsButton.onclick = (evt) => {
            evt.stopPropagation();
            const newObj = {title: Date.now(), src: "images/100_100.jpg"};
            this.addNewElementToList(newObj);
        }
    }

    addNewElementToList(obj){
        const ulElement = document.querySelectorAll("ul")[0];
        console.log("ul Element is: " + ulElement);

        this.dolly = this.root.querySelector("ul li");
        console.log("diese dolly ist " + this.dolly);
        const newli = this.dolly.cloneNode(true);
        newli.removeAttribute("id");
        newli.querySelector(".medianame").textContent = obj.title;
        newli.querySelector(".imgsrc").textContent = obj.owner;
        newli.querySelector(".date").textContent = obj.added;
        newli.querySelector(".playnumber").textContent = obj.numOfTags;
        newli.querySelector(".coverimg").src = obj.src;
       //newli.querySelector(".imgsrc").textContent
        //newli.querySelector(".imgsrc").textContent = obj.owner;
        console.log("newli is " + newli);

        ulElement.appendChild(newli);
        newli.scrollIntoView();
    }

    loadDataFromServerAndPopulateList(){
        xhr("GET","data/items.json", null, (xhrobj) => {
            //alert("xhrobj: " + xhrobj);
            const objs = JSON.parse(xhrobj.responseText);
            //alert("objs: " + JSON.stringify(objs));
            objs.forEach(obj => {
                this.addNewElementToList(obj);
            })
        })
    }
}

window.onload = () => {
    const instance = new ViewController(document.body);
    instance.initialiseView();
}

