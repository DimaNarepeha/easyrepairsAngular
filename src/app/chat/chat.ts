import {UserDTO} from "./userDTO";


export class Chat {
    id: string;
    customerId: string;
    providerId: string;
    message: string;
    sentBy: string;
    messageTo: UserDTO;
    messageFrom: UserDTO;
    isRead:string="false";
}
