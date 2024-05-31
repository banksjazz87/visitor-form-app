

export default class FormChecker {

    requiredFields: string[];

    constructor (requiredFields: string[]) {
        this.requiredFields = requiredFields;
    }


   //Look through all of the required fields and verify that none are empty.
   verifyNoneRequiredEmpty(): boolean {
        let valid: boolean = true;
        for (let i = 0; i < this.requiredFields.length; i++) {
			let currentElement = document.getElementById(this.requiredFields[i]) as HTMLInputElement;
            if (currentElement.value.length === 0) {
                valid = false;
            }
        } 
        return valid;
    }

    //Hide the required outline.
    hideRequiredOutline(): void {
        for (let i = 0; i < this.requiredFields.length; i++) {
            let currentElement = document.getElementById(this.requiredFields[i]) as HTMLInputElement;
            currentElement.style.borderColor = 'black';
        }
    }


    hideRequiredText(): void {
        const requiredText = document.getElementsByClassName('required-text');
        if (requiredText.length > 0) {
            document.querySelectorAll('.required-text').forEach((e) => {
                e.remove();
            });
        }
    }


    checkForRequired (): void {
        for (let i = 0; i < this.requiredFields.length; i++) {
            let currentElement = document.getElementById(this.requiredFields[i]) as HTMLInputElement;

            if (currentElement.value.length === 0) {
                currentElement.style.border = "3px solid #881337";
                let newElement = document.createElement('p');
                newElement.classList.add('required-text');
                newElement.style.color = "#881337";
                newElement.style.fontSize = "16px";
                newElement.innerHTML = "*Please complete this field."
                let parentDiv = currentElement.closest('div');

                if (parentDiv) {
                    parentDiv.appendChild(newElement);
                }
            }
        }
    }


    scrollToFirstRequired(): void {
        const firstRequired: Element | null = document.querySelector('.required-text');

        if (firstRequired) {
            const elementTop = firstRequired.getBoundingClientRect();
            window.scrollTo(window.scrollX, (elementTop.top - 100) + window.scrollY);
        }
    }


   showRequired (): void {
        this.hideRequiredOutline();
        this.hideRequiredText();

        setTimeout(() => {
            this.checkForRequired();
        }, 1000);
       
       setTimeout(() => {
           this.scrollToFirstRequired();
       }, 1500);
    }

   

}