import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Product } from '../models/product';
import { Category } from '../models/category';

@Injectable({ providedIn: 'root' })
export class CatalogueService {
  constructor(private http: HttpClient) {}

  getProducts(): Promise<Product[]> {
    return firstValueFrom(
      this.http.get<Product[]>('/json/products.json')
    );
  }

  getCategories(): Promise<Category[]> {
    return firstValueFrom(
      this.http.get<Category[]>('/json/categories.json')
    );
  }
}
