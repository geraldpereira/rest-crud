/// <reference path="model.ts" />

module DAO {
    export interface DAO<T extends Model.Identifiable> {
        create(t: T):T;
        read(id: number):T;
        update(t: T):boolean;
        delete(id: number):boolean;
    }
}