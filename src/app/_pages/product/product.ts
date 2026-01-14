import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CatalogueService } from '../../services/catalogue.service';
import { Product } from '../../models/product';
import { Category } from '../../models/category';
import { Collection } from '../../models/collection';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.html',
})
export class ProductComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private service = inject(CatalogueService);

  product = signal<Product | null>(null);
  category = signal<Category | null>(null);
  collection = signal<Collection | null>(null);

  async ngOnInit() {
    const ref = this.route.snapshot.paramMap.get('ref');
    if (!ref) return;

    const product = await this.service.getProductByRef(ref);
    if (!product) return;

    this.product.set(product);

    const categories = await this.service.getCategories();
    this.category.set(
      categories.find(c => c.id === product.categorie) || null
    );

    const collections = await this.service.getCollections();
    this.collection.set(
      collections.find(c => c.id === product.collection) || null
    );
  }

  addToCart(): void {
    Swal.fire({
      icon: 'success',
      title: 'Ajouté au panier',
      timer: 1200,
      showConfirmButton: false,
    });
  }

  back(): void {
    this.router.navigate(['/catalogue']);
  }

  getImage(): string {
    const p = this.product();
    return p?.reference_image
      ? `/imgs/products/${p.reference_image}`
      : '/imgs/products/placeholder.png';
  }
}
