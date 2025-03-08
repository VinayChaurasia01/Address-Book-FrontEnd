import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressService, Person } from 'src/app/services/address.service';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss']
})
export class PersonFormComponent implements OnInit {
  person: Person = { fullName: '', phoneNumber: '', address: '', city: '', state: '', zipCode: '' };
  isEditMode: boolean = false;
  personId!: number;

  cities: string[] = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'];
  states: string[] = ['New York', 'California', 'Illinois', 'Texas', 'Arizona'];

  constructor(
    private addressService: AddressService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.personId = +id;
        this.loadPerson(this.personId);
      }
    });
  }

  loadPerson(id: number): void {
    this.addressService.getPersonById(id).subscribe(
      (person) => {
        if (person) {
          this.person = person;
        } else {
          console.error('Person not found');
        }
      },
      (error) => {
        console.error('Error loading person:', error);
      }
    );
  }

  savePerson(): void {
    if (this.isEditMode) {
      this.addressService.updatePerson(this.personId, this.person).subscribe(() => {
        this.router.navigate(['/']);
      });
    } else {
      this.addressService.addPerson(this.person).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }

  closeForm(): void {
    this.router.navigate(['/']);
  }

  goToList(): void {
    this.router.navigate(['/']);
  }
  resetForm(): void {
  this.person = { fullName: '', phoneNumber: '', address: '', city: '', state: '', zipCode: '' };
}

}
