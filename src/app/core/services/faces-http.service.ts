import { Injectable } from '@angular/core';
import { FaceModel } from '../models/face/face.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable({ providedIn: 'root' })
export class FacesHttpService {
  apiUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient,
  ) {
  }

  getAllFaces(): Observable<FaceModel[]> {
    return this.http.get<FaceModel[]>(`${this.apiUrl}/api/faces`);
  }

  getFace(id: string): Observable<FaceModel> {
    return this.http.get<FaceModel>(`${this.apiUrl}/api/faces/` + id);
  }

  updateFace(id: string, face: FaceModel): Observable<FaceModel> {
    return this.http.put<FaceModel>(`${this.apiUrl}/api/faces/` + id, face);
  }

  newFace(face: FaceModel): Observable<FaceModel> {
    return this.http.post<FaceModel>(`${this.apiUrl}/api/faces`, face);
  }

  deleteFace(id: string): Observable<{}> {
    return this.http.delete<FaceModel>(`${this.apiUrl}/api/faces/` + id);
  }
}
