import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Funcionario } from '../Entidades/Funcionario';
import { Album } from '../Entidades/Album';
import { Foto } from '../Entidades/Foto';
import { Carousel } from '../Entidades/carousel';
import { Usuario } from '../Entidades/usuario';
import Swal from 'sweetalert2';
import { Email } from '../Entidades/Email';


@Injectable({
  providedIn: 'root'
})
export class BackServiceService {

  private _usuario: Usuario;

  private _token: string;

  private urlEndPoint: string = 'http://localhost:8080/';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient, private router: Router) { }

  //OAUTh
  private agregarAuthorizationHeader() {
    let token = this.token;
    if (token != null) {
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }
  public get usuario(): Usuario {
    if (this._usuario != null) {
      return this._usuario;
    } else if (this._usuario == null && sessionStorage.getItem('usuario') != null) {
      this._usuario = JSON.parse(sessionStorage.getItem('usuario')) as Usuario;
      return this._usuario;
    }
    return new Usuario();
  }

  public get token(): string {
    if (this._token != null) {
      return this._token;
    } else if (this._token == null && sessionStorage.getItem('token') != null) {
      this._token = sessionStorage.getItem('token');
      return this._token;
    }
    return null;
  }

  hasRole(role: string): boolean {
    if (this.usuario.roles.includes(role)) {
      return true;
    }
    return false;
  }

  logout(): void {
    this._token = null;
    this._usuario = null;
    sessionStorage.clear();
  }

  login(usuario: Usuario): Observable<any> {
    const urlEndPoint2: string = this.urlEndPoint + 'oauth/token';


    const credenciales = btoa('angularapp' + ':' + '12345');

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + credenciales
    });

    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', usuario.username);
    params.set('password', usuario.password);

    return this.http.post<any>(urlEndPoint2, params.toString(), { headers: httpHeaders });
  }

  isAuthenticated(): boolean {
    let payload = this.obtenerDatosToken(this.token);
    if (payload != null && payload.user_name && payload.user_name.length > 0) {
      return true;
    }
    return false;
  }

  guardarUsuario(accessToken: string): void {
    this._usuario = new Usuario();
    let payload = this.obtenerDatosToken(accessToken);

    this._usuario.username = payload.user_name;
    this._usuario.roles = payload.authorities;
    this._usuario.id_Usuario = payload.id;
    this._usuario.nombre = payload.nombre;
    sessionStorage.setItem('usuario', JSON.stringify(this._usuario));
  }
  guardarToken(accessToken: string): void {
    this._token = accessToken;
    sessionStorage.setItem('token', accessToken);

  }

  obtenerDatosToken(accessToken: string): any {
    if (accessToken != null) {
      return JSON.parse(atob(accessToken.split(".")[1]));
    }
    return null;
  }

  private isNoAutorizado(e): boolean {
    if (e.status == 401 || e.status == 402) {
      if (this.isAuthenticated()) {
        this.logout();
      }
      this.router.navigate(['/personal'])
      return true;
    }
    return false;
  }


  /*FUNCIONARIOS */
  getFuncionarios(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(this.urlEndPoint + 'listFuncionario', { headers: this.agregarAuthorizationHeader() }).pipe(
      catchError(e => {
        if (this.isNoAutorizado(e)) {
          return throwError(e);
        }
        console.error(e.error.mensaje);
        return throwError(e);
      })
    );
  }

  getFuncionarioByRut(rut: String): Observable<Funcionario> {
    return this.http.get<Funcionario>(this.urlEndPoint + 'getFunByRut/' + rut, { headers: this.agregarAuthorizationHeader() }).pipe(
      catchError(e => {
        if (this.isNoAutorizado(e)) {
          return throwError(e);
        }
        console.error(e.error.mensaje);
        return throwError(e);
      })
    );
  }


  saveFuncionario(funcionario: Funcionario): Observable<Funcionario> {
    return this.http.post(this.urlEndPoint + "saveFuncionario", funcionario, { headers: this.agregarAuthorizationHeader() }).pipe(
      map((response: any) => response.funcionario as Funcionario),
      catchError(e => {
        if (this.isNoAutorizado(e)) {
          return throwError(e);
        }
        console.error(e.error.mensaje);

        Swal.fire('Error al crear el traslado', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  getFuncionariosPorID(id: number): Observable<Funcionario> {
    return this.http.get<Funcionario>(this.urlEndPoint + "findFuncionario/" + id, { headers: this.agregarAuthorizationHeader() }).pipe(
      catchError(e => {
        if (this.isNoAutorizado(e)) {
          return throwError(e);
        }
        console.error(e.error.mensaje);
        Swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  subirImagenFuncionario(archivo: File, id): Observable<object> {
    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);

    let httpHeaders = new HttpHeaders();
    let token = this.token;
    if (token != null) {
      httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.http.post(this.urlEndPoint + 'SubirImagenFunc', formData, { headers: httpHeaders });

  }

  updateFuncionario(funcionario: Funcionario, id: number): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}updateFuncionario/${id}`, funcionario, { headers: this.agregarAuthorizationHeader() }).pipe(
      catchError(e => {
        if (this.isNoAutorizado(e)) {
          return throwError(e);
        }
        console.error(e.error.mensaje);
        Swal.fire('Error al editar el funcionario', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }
  deleteFuncionario(id: number): Observable<Funcionario> {
    return this.http.delete<Funcionario>(this.urlEndPoint+'DeleteFuncionario/'+id, { headers: this.agregarAuthorizationHeader() }).pipe(
      catchError(e => {
        if (this.isNoAutorizado(e)) {
          return throwError(e);
        }
        console.error(e.error.mensaje);
        Swal.fire('Error al eliminar el funcionario', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  updateProfesional(id: number,) {

    let httpHeaders = new HttpHeaders();
    let token = this.token;
    if (token != null) {
      httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    }

    return this.http.put('http://localhost:8080/darAltaFunc/' + id, { headers: httpHeaders });
  }
  darAlta(funcionario: Funcionario, id: number): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}darAlta/${id}`, funcionario, { headers: this.agregarAuthorizationHeader() }).pipe(
      catchError(e => {
        if (this.isNoAutorizado(e)) {
          return throwError(e);
        }
        console.error(e.error.mensaje);
        Swal.fire('Error al dar de alta el funcionario', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }
 
  /*ALBUM */
  getAlbumes(): Observable<Album[]> {
    return this.http.get<Album[]>(this.urlEndPoint + 'ListAlbumes', { headers: this.agregarAuthorizationHeader() }).pipe(
      catchError(e => {
        if (this.isNoAutorizado(e)) {
          return throwError(e);
        }

        //this.router.navigate(['/administracion-inicio/Afuncionarios']);
        console.error(e.error.mensaje);
        //Swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }
  saveAlbum(album: Album): Observable<Album> {
    return this.http.post<Album>(this.urlEndPoint + "saveAlbum", album, { headers: this.agregarAuthorizationHeader() }).pipe(
      catchError(e => {
        if (this.isNoAutorizado(e)) {
          return throwError(e);
        }

        //this.router.navigate(['/administracion-inicio/Afuncionarios']);
        console.error(e.error.mensaje);
        Swal.fire('Error al guardar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }
  getAlbumxID(id: number): Observable<Album> {
    return this.http.get<Album>(this.urlEndPoint + "AlbumID/" + id, { headers: this.agregarAuthorizationHeader() }).pipe(
      catchError(e => {
        if (this.isNoAutorizado(e)) {
          return throwError(e);
        }

        //this.router.navigate(['/administracion-inicio/Afuncionarios']);
        console.error(e.error.mensaje);
        //Swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  updateAlbum(album: Album, id): Observable<Album> {
    return this.http.put<Album>(this.urlEndPoint + "updateAlbum/" + id, album, { headers: this.agregarAuthorizationHeader() }).pipe(
      catchError(e => {
        if (this.isNoAutorizado(e)) {
          return throwError(e);
        }

        //this.router.navigate(['/administracion-inicio/Afuncionarios']);
        console.error(e.error.mensaje);
        Swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }
  /*CAROUSEL */
  getCarousel(): Observable<Carousel[]> {
    return this.http.get<Carousel[]>(this.urlEndPoint + "carousel", { headers: this.agregarAuthorizationHeader() }).pipe(
      catchError(e => {
        if (this.isNoAutorizado(e)) {
          return throwError(e);
        }

        //this.router.navigate(['/administracion-inicio/Afuncionarios']);
        console.error(e.error.mensaje);
        //Swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  //
  desactivarFotoCarousel(id: number): Observable<Carousel> {
    return this.http.delete<Carousel>(`${this.urlEndPoint}desacCar/${id}`, { headers: this.agregarAuthorizationHeader() }).pipe(
      catchError(e => {
        if (this.isNoAutorizado(e)) {
          return throwError(e);
        }

        //this.router.navigate(['/administracion-inicio/Afuncionarios']);
        console.error(e.error.mensaje);
        Swal.fire('Error al desactivar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  subirNuevaImagenCarousel(archivo: File): Observable<Foto> {
    let formData = new FormData();
    formData.append("archivo", archivo);


    let httpHeaders = new HttpHeaders();
    let token = this.token;
    if (token != null) {
      httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    }

    return this.http.post(this.urlEndPoint + 'saveImagenNueva', formData, { headers: httpHeaders }).pipe(
      map((response: any) => response.foto as Foto),
      catchError(e => {
        if (this.isNoAutorizado(e)) {
          return throwError(e);
        }
        Swal.fire('Error al subir la imagen', e.error.mensaje, 'error');
        console.error(e.error.mensaje);
        return throwError(e);
      })
    );

  }

  subirImagenExistente(carousel: Carousel): Observable<Carousel> {
    return this.http.post<Carousel>(this.urlEndPoint + 'saveImagenExistente', carousel, { headers: this.agregarAuthorizationHeader() }).pipe(
      catchError(e => {
        if (this.isNoAutorizado(e)) {
          return throwError(e);
        }

        //this.router.navigate(['/administracion-inicio/Afuncionarios']);
        console.error(e.error.mensaje);
        Swal.fire('Error al subir la imagen', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  /*FOTOS */
  getFotos(): Observable<Foto[]> {
    return this.http.get<Foto[]>(this.urlEndPoint + 'ListFotos', { headers: this.agregarAuthorizationHeader() }).pipe(
      catchError(e => {
        if (this.isNoAutorizado(e)) {
          return throwError(e);
        }

        //this.router.navigate(['/administracion-inicio/Afuncionarios']);
        console.error(e.error.mensaje);
        //Swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  subirImagen(archivo: File, id): Observable<Foto> {
    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);
    let httpHeaders = new HttpHeaders();
    let token = this.token;
    if (token != null) {
      httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    }

    return this.http.post(this.urlEndPoint + 'saveimagen', formData, { headers: httpHeaders }).pipe(
      map((response: any) => response.foto as Foto),
      catchError(e => {
        if (this.isNoAutorizado(e)) {
          return throwError(e);
        }

        //this.router.navigate(['/administracion-inicio/Afuncionarios']);
        console.error(e.error.mensaje);
        Swal.fire('Error al subir la imagen', e.error.mensaje, 'error');
        return throwError(e);
      })
    );

  }

  fotosPorAlbum(id: number): Observable<Foto[]> {
    return this.http.get<Foto[]>(this.urlEndPoint + 'fotosPorAlbum/' + id, { headers: this.agregarAuthorizationHeader() }).pipe(
      catchError(e => {
        if (this.isNoAutorizado(e)) {
          return throwError(e);
        }

        //this.router.navigate(['/administracion-inicio/Afuncionarios']);
        console.error(e.error.mensaje);
        //Swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  deleteFoto(id: number): Observable<Foto> {
    return this.http.delete<Foto>(`${this.urlEndPoint}deleteFoto/${id}`, { headers: this.agregarAuthorizationHeader() }).pipe(
      catchError(e => {
        if (this.isNoAutorizado(e)) {
          return throwError(e);
        }

        //this.router.navigate(['/administracion-inicio/Afuncionarios']);
        console.error(e.error.mensaje);
        Swal.fire('Error al eliminar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  /*EMAIL*/

sendEmail(mail: Email): Observable<Email> {
    return this.http.post<Email>(this.urlEndPoint + "sendMail", mail).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        Swal.fire('Error al enviar mail', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }
}
