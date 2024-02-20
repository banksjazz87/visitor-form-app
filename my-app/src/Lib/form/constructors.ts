import {FormFields, Visitor, BtnGroup} from "../../interfaces.ts";

export default class SetupForm  {
 
     public initStates: FormFields = {
        type: "select",
        name: "",
        placeHolder: '',
        label: '',
        id: "",
        value: "",
        visitorKey: 'state'
    };

    public initVisitor: Visitor = {
        title: '',
        visitorName: {
            firstName: 'Burt', 
            lastName: ''
        },
        address: '',
        city: '',
        state: '',
        phone: '',
        email: '',
        contactMethod: '', 
        interests: [''], 
        prayerRequest: ''
    };

    public initInterest: BtnGroup = {
        value: '', 
        visitorKey: ''
    }

    public getInitStates() {
        return this.initStates;
    }

    public getInitVisitor() {
        return this.initVisitor;
    }

    public getInitInterests(){
        return this.initInterest;
    }
}