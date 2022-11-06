// Code goes here!

interface Validatable { 
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}

function validate(validatableInput: Validatable): boolean { 
    let isValid = true;
    if (validatableInput.required) {
        isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    }
    if (validatableInput.minLength != null &&
        typeof validatableInput.value === 'string'
        ) { 
        isValid =
            isValid && validatableInput.value.length >= validatableInput.minLength
    }
    if (validatableInput.maxLength != null &&
        typeof validatableInput.value === 'string'
        ) { 
        isValid =
            isValid && validatableInput.value.length <= validatableInput.maxLength
    }
    if (validatableInput.min != null &&
        typeof validatableInput.value === 'number'
        ) { 
        isValid =
            isValid && validatableInput.value >= validatableInput.min
    }
    if (validatableInput.max != null &&
        typeof validatableInput.value === 'number'
        ) { 
        isValid =
            isValid && validatableInput.value <= validatableInput.max
    }
    return isValid
}

function Autobind(_: any, _2: string, propertyDescriptor: PropertyDescriptor) { 
    const originalMethod = propertyDescriptor.value
    const adjDescriptor: PropertyDescriptor = { 
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn
        }
    }
    return adjDescriptor
    
}

class ProjectInput {
    templateElement: HTMLTemplateElement; 
    hostElement: HTMLDivElement;
    element: HTMLFormElement;
    peopleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    titleInputElement: HTMLInputElement;
    
    constructor() { 
        this.templateElement = document.getElementById("project-input")! as HTMLTemplateElement;
        this.hostElement = document.getElementById("app")! as HTMLDivElement;

        const importNode = document.importNode(
            this.templateElement.content,
            true
        );
        this.element = importNode.firstElementChild as HTMLFormElement;
        this.element.id = 'user-input'
        
        this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;
        this.configure();
        this.attach();
    }
    private configure() {
        this.element.addEventListener('submit', this.submitHandler);
        console.log(this.titleInputElement);
    }
    
    @Autobind
    private submitHandler(event: Event) {
        event.preventDefault();
        this.gatherUserInput();
        this.clearInput();
    }
    
    private clearInput() {
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value = '';
    }
    private gatherUserInput(): [string, string, number] | void {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value
        const titleValidatable: Validatable = {
            value: enteredTitle,
            required: true,
        }
        const descriptionValidatable: Validatable = {
            value: enteredDescription,
            required: true,
            minLength: 5
        }
        const peopleValidatable: Validatable = {
            value: enteredPeople,
            required: true,
            min: 1,
            max: 5
        }
        if (
            !validate(titleValidatable) ||
            !validate(descriptionValidatable) ||
            !validate(peopleValidatable)
            ) { 
            alert("Invalid input, please try again");
            return
        } else {
            return [
                enteredTitle,
                enteredDescription,
                +enteredPeople
            ]
        }
    }

    private attach(){ 
        this.hostElement.insertAdjacentElement('afterbegin', this.element)
    }
}

const pjInput = new ProjectInput();