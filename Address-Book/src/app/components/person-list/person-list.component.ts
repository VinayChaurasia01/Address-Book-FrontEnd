import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddressService, Person } from 'src/app/services/address.service';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss']
})
export class PersonListComponent implements OnInit {
  persons: Person[] = [];

  constructor(private addressService: AddressService, private router: Router) {}

  ngOnInit(): void {
    this.loadPersons();
  }

  loadPersons(): void {
    this.addressService.getPersons().subscribe({
      next: (data) => this.persons = data,
      error: (err) => console.error('Error fetching persons:', err)
    });
  }

  deletePerson(id?: number): void {
    if (id !== undefined && confirm('Are you sure you want to delete this person?')) {
      this.addressService.deletePerson(id).subscribe({
        next: () => this.persons = this.persons.filter(p => p.id !== id),
        error: (err) => console.error('Error deleting person:', err)
      });
    }
  }

  editPerson(person: Person): void {
    if (person.id !== undefined) {
      this.router.navigate(['/edit-person', person.id]);
    } else {
      console.error('Cannot edit person: ID is undefined');
    }
  }
}
