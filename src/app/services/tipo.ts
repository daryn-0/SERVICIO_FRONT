import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Tipo } from "../models/tipo";


@Injectable({
    providedIn: 'root'
})
export class TipoService {
    private apiUrl = 'http://localhost:8080/api/tipo';

    constructor(private http:HttpClient) { }

    getTipo():Observable<Tipo[]>{
        return this.http.get<Tipo[]>(`${this.apiUrl}`);
    }
}