import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Funcionario } from '../Entidades/Funcionario';
import { Album } from '../Entidades/Album';
import { Foto } from '../Entidades/Foto';

@Injectable({
  providedIn: 'root'
})
export class BackServiceService {

  //private _usuario: Usuario;
  private _token: string;

  private urlEndPoint: string = 'http://localhost:8080/';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient, private router: Router) { }

  /*FUNCIONARIOS */
  getFuncionarios(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(this.urlEndPoint + 'listFuncionario/');
  }

  saveFuncionario(funcionario: Funcionario): Observable<Funcionario> {
    return this.http.post<Funcionario>(this.urlEndPoint + "saveFuncionario", funcionario)
      .pipe(
        catchError(this.handleError('funcionario', funcionario))
      );
  }


  /*ALBUM */
  getAlbumes(): Observable<Album[]> {
    return this.http.get<Album[]>(this.urlEndPoint + 'ListAlbumes/');
  }
  saveAlbum(album: Album): Observable<Album> {
    return this.http.post<Album>(this.urlEndPoint + "saveAlbum", album).pipe(
      catchError(this.handleError('Album', album))
    );
  }
  getAlbumxID(id: number): Observable<Album> {
    return this.http.get<Album>(this.urlEndPoint + "AlbumID/" + id);
  }

  updateAlbum(album: Album, id): Observable<Album> {
    return this.http.put<Album>(this.urlEndPoint+"updateAlbum/"+ id , album);
  }

  /*FOTOS */
  getFotos(): Observable<Foto[]> {
    return this.http.get<Foto[]>(this.urlEndPoint + 'ListFotos/');
  }

  subirImagen(archivo: File, id): Observable<Foto> {
    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);
    return this.http.post(this.urlEndPoint + 'saveimagen', formData).pipe(
      map((response: any) => response.foto as Foto),
      catchError(e => {
        console.log(e.error.mensaje);
        return throwError(e);
      })
    );

  }

  fotosPorAlbum(id: number): Observable<Foto[]>{
    return  this.http.get<Foto[]>(this.urlEndPoint + 'fotosPorAlbum/'+ id);
  }

  deleteFoto(id:number):Observable<Foto>{
    return this.http.delete<Foto>(`${this.urlEndPoint}deleteFoto/${id}`).pipe(
      catchError(e=>{
        console.error(e.error.mensaje);
        return throwError(e);
      })
    );
  }


  /*MANEJO DE ERRORES */

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }
}
