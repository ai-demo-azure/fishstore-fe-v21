import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Fish {
  private apiUrl = environment.apiUrl.endsWith('/') ? environment.apiUrl : `${environment.apiUrl}/`;

  constructor(private http: HttpClient) {}
  // Get all fish (for Catalog page)
  getAllCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'categories');
  }
  // Get all fish (for Catalog page)
  getAllFish(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'products');
  }

  // Get fish by ID (for Detail page)
  getFishById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}products/${id}`);
  }

  // Optional: Get fish by category
  getFishByCategory(categoryId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}products/category/${categoryId}`);
  }

  // Hàm gọi API chatbot
  askChatbot(question: string): Observable<string> {
    // Vì Minimal API của bạn trả về text thuần, ta dùng responseType: 'text'
    return this.http.post(this.apiUrl + 'ask', null, {
      params: { question: question },
      responseType: 'text',
    });
  }
}
