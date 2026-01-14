import {Component, inject, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { CatalogueService } from '../../services/catalogue.service';
import { Product } from '../../models/product';
import { Category } from '../../models/category';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-catalogue',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalogue.html',
})
export class Catalogue {
  private service = inject(CatalogueService);
  private cartService = inject(CartService);
  private router = inject(Router);

  categories: Category[] = [];
  products: Product[] = [];
  filteredProducts = signal<Product[]>([]);

  selectedCategoryId = signal<number>(0);
  selectedCategoryTitle = signal<string>('Tous');

  async ngOnInit() {
    this.categories = await this.service.getCategories();
    this.products = await this.service.getProducts();

    this.selectCategory(0, 'Tous');
  }

  selectCategory(categoryId: number, title: string): void {
    this.selectedCategoryId.set(categoryId);
    this.selectedCategoryTitle.set(title);

    this.filteredProducts.set(
      categoryId === 0
        ? this.products
        : this.products.filter(p => p.categorie === categoryId)
    );
  }

  addToCart(product: Product): void {
    this.cartService.add(product);

    Swal.fire({
      icon: 'success',
      title: 'Ajouté au panier',
      text: product.nom,
      timer: 1000,
      showConfirmButton: false,
    });
  }
  getImage(product: Product): string {
    return product.reference_image
      ? `/imgs/products/${product.reference_image}`
      : '/imgs/products/placeholder.png';
  }

  goToProduct(product: Product): void {
    this.router.navigate([
      '/produit',
      product.reference_produit
    ]);
  }
}
