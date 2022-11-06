// Code goes here!

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
        console.log(this.titleInputElement.value);
    }

    private attach() { 
        this.hostElement.insertAdjacentElement('afterbegin', this.element)
    }
}

const pjInput = new ProjectInput();