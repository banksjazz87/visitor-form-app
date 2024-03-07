

export default class FormChecker {

    requiredFields: string[];

    constructor (requiredFields: string[]) {
        this.requiredFields = requiredFields;
    }

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
                currentElement.style.border = "1px solid red";
                let newElement = document.createElement('p');
                newElement.classList.add('required-text');
                newElement.style.color = "red";
                newElement.style.fontSize = "12px";
                newElement.innerHTML = "*Please complete this field."
                let parentDiv = currentElement.closest('div');

                if (parentDiv) {
                    parentDiv.appendChild(newElement);
                }
            }
        }
    }

   showRequired (): void {
        this.hideRequiredOutline();
        this.hideRequiredText();

        setTimeout(() => {
            this.checkForRequired();
        }, 1000);
    }

   

}