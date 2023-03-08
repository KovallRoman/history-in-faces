import {Injectable} from "@angular/core";
import {FaceModel} from "../models/face/face.model";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class FacesHttpService {
  users: FaceModel[] = [

  ];

  constructor(
    private http: HttpClient
  ) {
  }

  getAllFaces(): Observable<FaceModel[]> {
    return this.http.get<FaceModel[]>('http://localhost:8000/api/faces');
  }

  getFace(id: string): Observable<FaceModel> {
    return this.http.get<FaceModel>('http://localhost:8000/api/faces/' + id);
  }

  updateFace(id: string, face: FaceModel): Observable<FaceModel> {
    return this.http.put<FaceModel>('http://localhost:8000/api/faces/' + id, face);
  }

  newFace(face: FaceModel): Observable<FaceModel> {
    return this.http.post<FaceModel>('http://localhost:8000/api/faces', face);
  }

  deleteFace(id: string): Observable<{}>{
    return this.http.delete<FaceModel>('http://localhost:8000/api/faces/' + id);
  }
}
