import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Marca } from "../models/marca";

@Injectable({
    providedIn: 'root'
})
export class MarcaService {
    private apiUrl = 'http://localhost:8080/api/marca';

    constructor(private http:HttpClient) { }

    getMarca():Observable<Marca[]>{
        return this.http.get<Marca[]>(`${this.apiUrl}`);
    }
}
