import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product';
import { CatalogueService } from '../../services/catalogue.service';

@Component({
  selector: 'app-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './box.html',
  styleUrls: ['./box.less'],
})
export class BoxComponent {
  products: Product[] = [];
  boxProducts = signal<Product[]>([]);

  constructor(private catalogueService: CatalogueService) {}

  async ngOnInit() {
    this.products = await this.catalogueService.getProducts();
  }

  addToBox(product: Product): void {
    const current = this.boxProducts();

    if (current.length >= 9) return;

    this.boxProducts.set([...current, product]);
  }

  removeFromBox(index: number): void {
    const current = [...this.boxProducts()];
    current.splice(index, 1);
    this.boxProducts.set(current);
  }

  get boxSize(): number {
    const count = this.boxProducts().length;
    if (count <= 4) return 4;
    if (count <= 6) return 6;
    return 9;
  }

  get boxClass(): string {
    return `box-${this.boxSize}`;
  }
}
