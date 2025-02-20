import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ChevronRight, LucideAngularModule, EyeOff, Eye } from 'lucide-angular';
import { PrintServiceService } from '../../services/print-service.service';
import { TarifsTableComponent } from '../../components/tarifs-table/tarifs-table.component';
import { ChoiceSummaryComponent } from '../../components/choice-summary/choice-summary.component';

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

enum BookingStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  ALTERNATIVE_OFFERED = 'ALTERNATIVE_OFFERED',
}

@Component({
  selector: 'app-create-reservation',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LucideAngularModule,
    TarifsTableComponent,
    ChoiceSummaryComponent,
  ],
  templateUrl: './create-reservation.component.html',
  styleUrl: './create-reservation.component.css',
})
export class CreateReservationComponent {
  bookingForm: FormGroup;
  private formBuilder = inject(FormBuilder);

  /**
   * This component is a 4 step form
   * On the first step the user should choose
   * the residence, the type of accomodation and the building
   * for the first and second choice
   * On the second step the user should validate the choices
   * made on the first step
   * and if the choices are validated,
   * the page should display a confirmation message
   * and 2 buttons one to print the summary and the
   * other to go show/hide the details of the choices made
   */

  readonly arrowRight = ChevronRight;
  readonly eyeOff = EyeOff;
  readonly eye = Eye;

  currentStep = 1;
  isValidated = false;
  showDetails = false;

  steps = ['Choix des résidences', 'Validation', 'Résumé', 'Résultat'];

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

  constructor(
    private fb: FormBuilder,
    private printService: PrintServiceService
  ) {
    this.bookingForm = this.formBuilder.group({
      firstChoice: this.formBuilder.group({
        residence: ['', Validators.required],
        accommodation: ['', Validators.required],
        building: [''],
        apartment: [''],
        room: [''],
      }),
      secondChoice: this.formBuilder.group({
        residence: ['', Validators.required],
        accommodation: ['', Validators.required],
        building: [''],
        apartment: [''],
        room: [''],
      }),
    });

    // this.bookingForm = new FormGroup({
    //   firstChoiceResidence: new FormControl('', Validators.required),
    //   firstChoiceAccommodationType: new FormControl('', Validators.required),
    //   firstChoiceBuilding: new FormControl(''),
    //   firstChoiceApartment: new FormControl(''),
    //   firstChoiceRoom: new FormControl(''),
    //   secondChoiceResidence: new FormControl('', Validators.required),
    //   secondChoiceAccommodationType: new FormControl('', Validators.required),
    //   secondChoiceBuilding: new FormControl(''),
    //   secondChoiceApartment: new FormControl(''),
    //   secondChoiceRoom: new FormControl(''),
    // });
  }

  updateTarifs(choice: string) {
    const residence = this.bookingForm.get(choice)?.get('residence')?.value;
    const type = this.bookingForm.get(choice)?.get('accommodation')?.value;

    console.log(residence, type);

    const fees = this.residencies
      .find((r) => r.value === residence)
      ?.accommodations.find((a) => a.value === type)?.fees;

    if (choice === 'firstChoice') {
      this.firstChoiceFees = fees ?? [];
    } else {
      this.secondChoiceFees = fees ?? [];
    }
  }

  updateAccomodationTypes(choice: string) {
    const residence = this.bookingForm.get(choice)?.get('residence')?.value;

    const accommodations = this.residencies.find(
      (r) => r.value === residence
    )?.accommodations;

    if (choice === 'firstChoice') {
      this.firstChoiceAccomodationTypes = accommodations ?? [];
    } else {
      this.secondChoiceAccomodationTypes = accommodations ?? [];
    }
  }

  updateBuildings(choice: string) {
    const residency = this.bookingForm.get(choice)?.get('residence')?.value;

    const buildings = this.residencies.find(
      (r) => r.value === residency
    )?.buildings;

    if (choice === 'firstChoice') {
      this.firstChoiceBuildings = buildings ?? [];
    } else {
      this.secondChoiceBuildings = buildings ?? [];
    }
  }

  isStepValid(): boolean {
    if (this.currentStep === 1) {
      return (
        ((this.bookingForm.get('firstChoice')?.valid ?? false ?? false) &&
          (this.bookingForm.get('secondChoice')?.valid ?? false)) ??
        false
      );
    }
    return true;
  }

  showError(choice: string, fieldName: string): boolean {
    const field = this.bookingForm.get(choice)?.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  getResidenceName(choice: string): string {
    const residence = this.bookingForm.get(choice)?.get('residence')?.value;
    const value = this.residencies.find((r) => r.value === residence)?.display;

    return value ?? 'Non spécifié';
  }

  getAccommodationName(choice: string): string {
    const accommodation = this.bookingForm
      .get(choice)
      ?.get('accommodation')?.value;

    let value: string;
    switch (choice) {
      case 'firstChoice':
        value =
          this.secondChoiceAccomodationTypes.find(
            (a) => a.value === accommodation
          )?.display ?? 'Non spécifié';
        break;
      case 'secondChoice':
        value =
          this.secondChoiceAccomodationTypes.find(
            (a) => a.value === accommodation
          )?.display ?? 'Non spécifié';
        break;
      default:
        value = 'Non spécifié';
    }

    return value;
  }

  getBuildingName(choice: string): string {
    const building = this.bookingForm.get(choice)?.get('building')?.value;

    let value: string;
    switch (choice) {
      case 'firstChoice':
        value =
          this.firstChoiceBuildings.find((a) => a.value === building)
            ?.display ?? 'Non spécifié';
        break;
      case 'secondChoice':
        value =
          this.secondChoiceBuildings.find((a) => a.value === building)
            ?.display ?? 'Non spécifié';
        break;
      default:
        value = 'Non spécifié';
    }

    return value;
  }

  nextStep() {
    if (this.currentStep === 1) {
      this.isValidated = this.isStepValid();
      this.currentStep++;
    } else if (this.currentStep < this.steps.length - 1 && this.isStepValid()) {
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
    this.printService.printSelection('summaryToPrint');
  }

  onSubmit() {
    console.log(this.bookingForm.value);
  }
}
