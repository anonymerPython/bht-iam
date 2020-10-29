class ViewController {

        constructor(root){
            console.log("created Viewcontroller " + root);
            this.root = root;
        }

        initialiseView() {
            this.mainElement = this.root.querySelector("ul")[0];
            console.log(this.mainElement);
            this.prepareToggleViewmode();
            //this.prepareFading();
        }

        prepareToggleViewmode(){
            this.toggleButton = this.root.querySelector("#toggleviewbtn");
            this.toggleViewElement = this.root.querySelector("#tilestoggle");
            this.toggleButton.onclick = () => {
                this.toggleViewElement.classList.toggle("myapp-tiles");
                this.toggleButton.classList.toggle("toggle-view2")
            }
        }

        prepareFading() {
            const fadingSwitch = this.root.querySelector("#toggleviewbtn");
            fadingSwitch.onclick = () => {
                console.log("fade!");
            } 
        }
}

window.onload = () => {
    const instance = new ViewController(document.body);
    instance.initialiseView();
}

