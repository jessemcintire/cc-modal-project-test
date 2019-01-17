import { Component, OnInit, Input } from "@angular/core";
import { Item } from "../_model/Item";
import {
  NgbModal,
  ModalDismissReasons,
  NgbModalRef
} from "@ng-bootstrap/ng-bootstrap";
import { ApiService } from "../_services/api.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { concat } from "rxjs";

@Component({
  selector: "app-todolist",
  templateUrl: "./todolist.component.html",
  styleUrls: ["./todolist.component.css"]
})
export class TodolistComponent implements OnInit {
  items: Item[];
  closeResult: string;
  modalReference: NgbModalRef;

  static instance: TodolistComponent;

  constructor(
    private service: ApiService,
    private router: Router,
    private modalService: NgbModal
  ) {
    /*private service: HttpItemService*/

    this.updateLocalItems();
  }

  updateLocalItems() {
    console.log("Updating items");
    this.service.getItems().then(items => (this.items = items));
  }

  ngOnInit() {}

  onRemove(item) {
    this.service.removeItem(item).then(() => this.updateLocalItems());
    console.log("Item deleted");
  }

  onEdit(item) {
    this.service.setCurrentItem(item);
    this.router.navigateByUrl("/edit-item");
  }

  open(content) {
    this.modalService.open(content, { centered: true }).result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
}
