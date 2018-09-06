import { Injectable } from '@angular/core';
import { Item } from '../_model/Item';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AbstractItemsService } from '../_services/abstract-items.service';
import { HttpItemsService } from '../_services/http-items.service';
import { MockItemsService } from '../_services/mock-items.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService{

	itemsStrategy: AbstractItemsService;

	constructor(private http: HttpClient) { 
		
		this.itemsStrategy = new HttpItemsService(http); //MockItemsService
	}
	getCurrentItem(): Item {
		return this.itemsStrategy.getCurrentItem();
	};
	setCurrentItem(item: Item) {
		this.itemsStrategy.setCurrentItem(item);
	};
	getItems(): Promise<Item[]> {
		return this.itemsStrategy.getItems();
	};
	removeItem(item: Item): Promise<Object> {
		return this.itemsStrategy.removeItem(item);
	};
	addItem(item: Item): Promise<Object>{
		return this.itemsStrategy.addItem(item);
	};
	updateItem(item: Item): Promise<Object>{
		return this.itemsStrategy.updateItem(item);
	};
}
