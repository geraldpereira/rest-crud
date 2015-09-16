module Model {
    export interface Identifiable {
        id?: number;
    }

    export interface User extends Identifiable {
        firstname: string;
        lastname: string;
        age: number;
    }
}