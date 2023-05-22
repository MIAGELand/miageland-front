import {Ticket, Visitor} from '../models/models';
import {api} from "../main";
import {Ref} from "vue";
import {deleteCookie} from "../util/cookie";

export async function getVisitor(name: Ref<string>, surname: Ref<string>): Promise<Visitor> {
    return api.get(`/visitors?name=${name.value}&surname=${surname.value}`).then(
        (response) => {
            document.cookie = "name=" + response.data.name + ";";
            document.cookie = "surname=" + response.data.surname + ";";
            document.cookie = "id=" + response.data.id + ";";
            deleteCookie('email')
            return response.data;
        }
    );
}

export async function getTicketListByVisitor(id: number): Promise<Ticket[]> {
    const response = await api.get(`/visitors/${id}/tickets`)
    return response.data;
}
export async function deleteVisitor(id: number): Promise<Visitor> {
    const response = await api.delete(`/visitors/${id}`)
    return response.data;
}
export const visitorService = {
    getVisitor,
    getTicketListByVisitor,
    deleteVisitor
};
