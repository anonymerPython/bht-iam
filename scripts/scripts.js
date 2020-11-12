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
       // this.menuInteraction();
        this.loadDataFromServerAndPopulateList();
        this.addingNewElements();
        this.refreshView();
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
            let clickedElement = evt.target;
            let alertText = this.getTitleFromLi(liElement);
            if(clickedElement instanceof HTMLButtonElement){
                alertText += "\n" + this.getUrlFromImg(liElement);
                if (confirm(alertText + "\n wirklich löschen?")) {
                    ulElement.removeChild(liElement);
                }
            }else if(liElement){
                alert(alertText);
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
            let today = this.getTodaysDate();
            const newObj = {title: Date.now(), src: "https://placeimg.com/" + ((Date.now() % 3) + 1)*100 +"/" + ((Date.now() % 3) + 1)*100, owner: "placeimg.com", added: today, numOfTags: Math.floor(Math.random() * 100)};
            this.addNewElementToList(newObj);
        }
    }

    getTodaysDate(){
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
        today = dd + '.' + mm + '.' + yyyy;
        return today;
    }

    addNewElementToList(obj){
        const ulElement = document.querySelectorAll("ul")[0];
        this.dolly = this.root.querySelector("ul li");
        /**
         * clone Element, remove template-id and fill it with data
         * @type {ActiveX.IXMLDOMNode | Node}
         */
        const newli = this.dolly.cloneNode(true);
        newli.removeAttribute("id");
        newli.querySelector(".medianame").textContent = obj.title;
        newli.querySelector(".imgsrc").textContent = obj.owner;
        newli.querySelector(".date").textContent = obj.added;
        newli.querySelector(".playnumber").textContent = obj.numOfTags;
        newli.querySelector(".coverimg").src = obj.src;
        ulElement.appendChild(newli);
       // newli.scrollIntoView();
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

    removeElement(){
        //this.dolly.parentNode.removeChild(this.dolly);
    }


    //funktioniert technisch, aber es läd keine anderen Bilder - wieso?
    refreshView(){
        const refreshButton = document.getElementById("refreshbtn");
        const ulElement = document.querySelectorAll("ul")[0];
        refreshButton.onclick = (evt) =>{
            evt.stopPropagation();
            while (ulElement.childElementCount > 1) {
                ulElement.removeChild(ulElement.lastChild);
            }
            this.loadDataFromServerAndPopulateList();
        }
    }
}

window.onload = () => {
    const instance = new ViewController(document.body);
    instance.initialiseView();
}

