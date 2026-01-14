import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Product } from '../models/product';
import { Category } from '../models/category';
import { Collection } from '../models/collection';

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

  getProductByRef(ref: string): Promise<Product | undefined> {
    return this.getProducts().then(
      products => products.find(p => p.reference_produit === ref)
    );
  }

  getCollections(): Promise<Collection[]> {
    return firstValueFrom(
      this.http.get<Collection[]>('/json/collections.json')
    );
  }
}
