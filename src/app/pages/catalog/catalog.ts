import { Component, OnInit, effect, signal } from '@angular/core';
import { Fish } from '../../services/fish';
import { RouterLink } from '@angular/router'; // Giải quyết lỗi [routerLink]
import { FormsModule } from '@angular/forms'; // Giải quyết lỗi [ngModel]

@Component({
  selector: 'app-catalog',
  imports: [RouterLink, FormsModule],
  templateUrl: './catalog.html',
  styleUrl: './catalog.scss',
})
export class Catalog implements OnInit {
  readonly ls_category = signal<any[]>([]);
  readonly filteredFish = signal<any[]>([]);
  readonly searchTerm = signal('');

  constructor(private fishService: Fish) {}

  ngOnInit(): void {
    this.fishService.getAllCategories().subscribe((data) => {
      this.ls_category.set(data);
    });
  }

  filterByCategory(category: string) {
    console.log(`Filtering by category: ${category}`);
    this.fishService.getFishByCategory(category).subscribe((data) => {
      this.filteredFish.set(data);
      console.log('Fish in category:', data);
    });
  }

  onSearchTermChange(value: string) {
    const term = this.searchTerm().toLowerCase(); // unwrap the signal value
    this.filteredFish().forEach((fish) => {
      const matchesSearch = fish.name.toLowerCase().includes(term);
      fish.visible = matchesSearch;
    });
  }
}
