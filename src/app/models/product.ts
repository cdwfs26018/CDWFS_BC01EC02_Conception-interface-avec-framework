export interface Product {
  reference_produit: string;
  reference_image: string;
  nom: string;
  nombre_pieces: number;
  description: string;
  ingredients: string[];
  allergenes: string[];
  categorie: number;
  collection: number | null;
  prix_lot: number;
  prix_unitaire: number;
}
