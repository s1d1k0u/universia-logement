import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ChevronRight, LucideAngularModule } from 'lucide-angular';

interface Fee {
  name: string;
  amount: string;
  paymentType: string;
}

interface Building {
  value: string;
  display: string;
}

interface AccomodationType {
  value: string;
  display: string;
  fees: Fee[];
}

interface Residency {
  value: string;
  display: string;
  accommodations: AccomodationType[];
  buildings?: Building[];
}

@Component({
  selector: 'app-create-reservation',
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule],
  templateUrl: './create-reservation.component.html',
  styleUrl: './create-reservation.component.css',
})
export class CreateReservationComponent {
  bookingForm: FormGroup = new FormGroup({
    firstChoiceResidence: new FormControl('', Validators.required),
    firstChoiceAccommodationType: new FormControl('', Validators.required),
    firstChoiceBuilding: new FormControl(''),
    firstChoiceApartment: new FormControl(''),
    firstChoiceRoom: new FormControl(''),
    secondChoiceResidence: new FormControl('', Validators.required),
    secondChoiceAccommodationType: new FormControl('', Validators.required),
    secondChoiceBuilding: new FormControl(''),
    secondChoiceApartment: new FormControl(''),
    secondChoiceRoom: new FormControl(''),
  });

  readonly arrowRight = ChevronRight;

  currentStep = 0;

  steps = ['Choix des résidences', 'Validation', 'Résumé'];

  firstChoiceAccomodationTypes: AccomodationType[] = [];
  firstChoiceBuildings: Building[] = [];

  secondChoiceAccomodationTypes: AccomodationType[] = [];
  secondChoiceBuildings: Building[] = [];

  firstChoiceFees: Fee[] = [];
  secondChoiceFees: Fee[] = [];

  residencies: Residency[] = [
    {
      value: 'interne',
      display: 'Résidence intégré Universiapolis',
      accommodations: [
        {
          value: 'hotel',
          display: 'Appt. Hôtel',
          fees: [
            {
              name: "FRAIS D'ADHESION",
              amount: '50.0',
              paymentType: 'Une seule fois',
            },
            {
              name: 'CAUTION',
              amount: '1500.0',
              paymentType: 'Une seule fois',
            },
            { name: 'LOYER', amount: '4800.00', paymentType: 'Bi-Mensuel' },
            {
              name: 'LOYER 1/2 SEPTEMBRE',
              amount: '3600.0',
              paymentType: 'Une seule fois',
            },
          ],
        },
        {
          value: 'individual',
          display: 'Individuelle',
          fees: [
            {
              name: "FRAIS D'ADHESION",
              amount: '50.0',
              paymentType: 'Une seule fois',
            },
            {
              name: 'CAUTION',
              amount: '1500.0',
              paymentType: 'Une seule fois',
            },
            {
              name: 'LOYER 1/2 SEPTEMBRE',
              amount: '2700.0',
              paymentType: 'Une seule fois',
            },
            { name: 'LOYER', amount: '3600.0', paymentType: 'Bi-Mensuel' },
          ],
        },
        {
          value: 'shared',
          display: 'Partagée',
          fees: [
            {
              name: "FRAIS D'ADHESION",
              amount: '50.0',
              paymentType: 'Une seule fois',
            },
            {
              name: 'CAUTION',
              amount: '1500.0',
              paymentType: 'Une seule fois',
            },
            {
              name: 'LOYER 1/2 SEPTEMBRE',
              amount: '1950.0',
              paymentType: 'Une seule fois',
            },
            { name: 'LOYER', amount: '2600.0', paymentType: 'Bi-Mensuel' },
          ],
        },
        {
          value: 'vip-hotel',
          display: 'VIP Hôtel',
          fees: [
            {
              name: "FRAIS D'ADHESION",
              amount: '50.0',
              paymentType: 'Une seule fois',
            },
            {
              name: 'CAUTION',
              amount: '1500.0',
              paymentType: 'Une seule fois',
            },
          ],
        },
        {
          value: 'comfort',
          display: 'Confort',
          fees: [
            {
              name: 'CAUTION',
              amount: '1500.0',
              paymentType: 'Une seule fois',
            },
            {
              name: 'LOYER 1/2 SEPTEMBRE',
              amount: '3000.0',
              paymentType: 'Une seule fois',
            },
            {
              name: "FRAIS D'ADHESION",
              amount: '50.0',
              paymentType: 'Une seule fois',
            },
            { name: 'LOYER', amount: '4000.0', paymentType: 'Bi-Mensuel' },
          ],
        },
      ],
      buildings: [
        { value: 'metz', display: 'Metz' },
        { value: 'ottawa', display: 'Ottawa' },
      ],
    },
    {
      value: 'al_karama',
      display: 'Résidence annexe AL Karama',
      accommodations: [
        {
          value: 'hotel',
          display: 'Appt. Hôtel',
          fees: [],
        },
        {
          value: 'individual',
          display: 'Individuelle',
          fees: [
            {
              name: 'CAUTION',
              amount: '1200.0',
              paymentType: 'Une seule fois',
            },
            {
              name: 'LOYER 1/2 SEPTEMBRE',
              amount: '2250.0',
              paymentType: 'Une seule fois',
            },
            { name: 'LOYER', amount: '3000.0', paymentType: 'Bi-Mensuel' },
            { name: 'SYNDIC', amount: '300.00', paymentType: 'Une seule fois' },
          ],
        },
        {
          value: 'shared',
          display: 'Partagée',
          fees: [
            {
              name: 'CAUTION',
              amount: '1200.0',
              paymentType: 'Une seule fois',
            },
            {
              name: 'LOYER 1/2 SEPTEMBRE',
              amount: '1500.0',
              paymentType: 'Une seule fois',
            },
            { name: 'LOYER', amount: '2000.0', paymentType: 'Bi-Mensuel' },
            { name: 'SYNDIC', amount: '300.00', paymentType: 'Une seule fois' },
          ],
        },
        {
          value: 'studio',
          display: 'Studio',
          fees: [
            {
              name: 'CAUTION',
              amount: '1200.0',
              paymentType: 'Une seule fois',
            },
            {
              name: 'LOYER 1/2 SEPTEMBRE',
              amount: '5250.0',
              paymentType: 'Une seule fois',
            },
            { name: 'LOYER', amount: '7000.0', paymentType: 'Bi-Mensuel' },
            { name: 'SYNDIC', amount: '300.00', paymentType: 'Une seule fois' },
          ],
        },
        {
          value: 'comfort',
          display: 'Confort',
          fees: [
            {
              name: 'CAUTION',
              amount: '1200.0',
              paymentType: 'Une seule fois',
            },
            {
              name: 'LOYER 1/2 SEPTEMBRE',
              amount: '2550.0',
              paymentType: 'Une seule fois',
            },
            { name: 'LOYER', amount: '3400.0', paymentType: 'Bi-Mensuel' },
            { name: 'SYNDIC', amount: '300.00', paymentType: 'Une seule fois' },
          ],
        },
      ],
      buildings: [
        { value: 'al_karama_2_garçon', display: 'AL KARAMA 2 (GARÇON)' },
      ],
    },
    {
      value: 'external',
      display: 'Logement externe',
      accommodations: [
        {
          value: 'studio',
          display: 'Studio',
          fees: [],
        },
        {
          value: 'individual',
          display: 'Individuelle',
          fees: [
            {
              name: 'CAUTION',
              amount: '1000.0',
              paymentType: 'Une seule fois',
            },
            {
              name: 'LOYER 1/2 SEPTEMBRE',
              amount: '600.0',
              paymentType: 'Une seule fois',
            },
            {
              name: "FRAIS D'ADHESION",
              amount: '50.0',
              paymentType: 'Une seule fois',
            },
            { name: 'LOYER', amount: '1200.0', paymentType: 'Mensuel' },
            { name: 'SYNDIC', amount: '200.00', paymentType: 'Une seule fois' },
          ],
        },
        {
          value: 'shared',
          display: 'Partagée',
          fees: [
            {
              name: 'CAUTION',
              amount: '1000.00',
              paymentType: 'Une seule fois',
            },
            {
              name: 'LOYER 1/2 SEPTEMBRE',
              amount: '400.0',
              paymentType: 'Une seule fois',
            },
            {
              name: "FRAIS D'ADHESION",
              amount: '50.0',
              paymentType: 'Une seule fois',
            },
            { name: 'LOYER', amount: '800.0', paymentType: 'Mensuel' },
            { name: 'SYNDIC', amount: '200.00', paymentType: 'Une seule fois' },
          ],
        },
        {
          value: 'comfort',
          display: 'Confort',
          fees: [
            {
              name: 'CAUTION',
              amount: '1000.00',
              paymentType: 'Une seule fois',
            },
            {
              name: 'LOYER 1/2 SEPTEMBRE',
              amount: '700.0',
              paymentType: 'Une seule fois',
            },
            {
              name: "FRAIS D'ADHESION",
              amount: '50.0',
              paymentType: 'Une seule fois',
            },
            { name: 'LOYER', amount: '1400.0', paymentType: 'Mensuel' },
            { name: 'SYNDIC', amount: '200.00', paymentType: 'Une seule fois' },
          ],
        },
      ],
      buildings: [
        { value: 'ext_madou', display: 'EXT-MADOU' },
        { value: 'ext_tilila', display: 'EXT-TILILA' },
        { value: 'ext-aderdour', display: 'EXT-ADERDOUR' },
        { value: 'ext-albayane', display: 'EXT-AL BAYANE' },
        { value: 'ext-boujemaa', display: 'EXT-BOUJEMAA' },
      ],
    },
  ];

  constructor(private fb: FormBuilder) {}

  updateTarifs(choice: string, accommodationType: string) {
    const residence = this.bookingForm.get(choice)?.value;
    const type = this.bookingForm.get(accommodationType)?.value;

    const fees = this.residencies
      .find((r) => r.value === residence)
      ?.accommodations.find((a) => a.value === type)?.fees;

    if (choice === 'firstChoiceResidence') {
      this.firstChoiceFees = fees ?? [];
    } else {
      this.secondChoiceFees = fees ?? [];
    }
  }

  // updatePage(residenceName: string, accommodationType: string) {
  //   this.updateAccomodationTypes();
  //   this.updateBuildings();
  //   this.updateTarifs(residenceName, accommodationType);
  // }

  updateAccomodationTypes(choice: string) {
    const residency = this.bookingForm.get(choice)?.value;

    const accommodations = this.residencies.find(
      (r) => r.value === residency
    )?.accommodations;

    if (choice === 'firstChoiceResidence') {
      this.firstChoiceAccomodationTypes = accommodations ?? [];
    } else {
      this.secondChoiceAccomodationTypes = accommodations ?? [];
    }
  }

  updateBuildings(choice: string) {
    const residency = this.bookingForm.get(choice)?.value;

    const buildings = this.residencies.find(
      (r) => r.value === residency
    )?.buildings;

    if (choice === 'firstChoiceResidence') {
      this.firstChoiceBuildings = buildings ?? [];
    } else {
      this.secondChoiceBuildings = buildings ?? [];
    }
  }

  calculateFees(choice: 'first' | 'second') {}

  isStepValid(): boolean {
    if (this.currentStep === 0) {
      return (
        (this.bookingForm.get('firstChoiceResidence')?.valid ?? false) &&
        (this.bookingForm.get('firstChoiceAccommodationType')?.valid ??
          false) &&
        (this.bookingForm.get('secondChoiceResidence')?.valid ?? false) &&
        (this.bookingForm.get('secondChoiceAccommodationType')?.valid ?? false)
      );
    }
    return true;
  }

  showError(fieldName: string): boolean {
    const field = this.bookingForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  getResidenceName(value: string): string {
    // Add logic to map residence values to display names

    return value === 'external' ? 'Logement externe' : value;
  }

  nextStep() {
    if (this.currentStep < this.steps.length - 1 && this.isStepValid()) {
      console.log(this.bookingForm.value);

      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  printSummary() {
    window.print();
  }

  onSubmit() {
    console.log(this.bookingForm.value);
  }
}
