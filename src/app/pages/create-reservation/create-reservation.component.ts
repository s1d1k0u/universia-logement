import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ChevronRight, LucideAngularModule, EyeOff, Eye } from 'lucide-angular';
import { PrintServiceService } from '../../services/print-service.service';
import { TarifsTableComponent } from '../../components/tarifs-table/tarifs-table.component';
import { ChoiceSummaryComponent } from '../../components/choice-summary/choice-summary.component';
import {
  ReservationService,
  residencies,
  AccommodationType,
  Booking,
  BookingStatus,
  Building,
  Fee,
  rejectionReasons,
} from '../../services/reservation.service';

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
  private formBuilder = inject(FormBuilder);
  residencies = residencies;
  rejectionReason =
    rejectionReasons[Math.floor(Math.random() * rejectionReasons.length)];
  rulesAccepted = false;

  bookingForm: FormGroup = this.formBuilder.group({
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
    remarks: ['', [Validators.maxLength(500)]], // Add this line if not already present
  });

  readonly arrowRight = ChevronRight;
  readonly eyeOff = EyeOff;
  readonly eye = Eye;

  currentStep = 1;
  isValidated = false;
  showDetails = false;
  case = 'pending';

  steps = ['Choix', 'Résumé', 'Confirmation', 'Résultat'];

  booking?: Booking;

  firstChoiceAccomodationTypes: AccommodationType[] = [];
  firstChoiceBuildings: Building[] = [];
  firstChoiceFees: Fee[] = [];

  secondChoiceAccomodationTypes: AccommodationType[] = [];
  secondChoiceBuildings: Building[] = [];
  secondChoiceFees: Fee[] = [];

  updateTarifs(choice: string) {
    const residence = this.bookingForm.get(choice)?.get('residence')?.value;
    const type = this.bookingForm.get(choice)?.get('accommodation')?.value;

    const fees = residencies
      .find((r) => r.value === residence)
      ?.accommodations.find((a: AccommodationType) => a.value === type)?.fees;

    if (choice === 'firstChoice') {
      this.firstChoiceFees = fees ?? [];
    } else {
      this.secondChoiceFees = fees ?? [];
    }
  }

  updateAccomodationTypes(choice: string) {
    const residence = this.bookingForm.get(choice)?.get('residence')?.value;

    const accommodations = residencies.find(
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

    const buildings = residencies.find((r) => r.value === residency)?.buildings;

    if (choice === 'firstChoice') {
      this.firstChoiceBuildings = buildings ?? [];
    } else {
      this.secondChoiceBuildings = buildings ?? [];
    }
  }

  getResidenceName(choice: string): string {
    const residence = this.bookingForm.get(choice)?.get('residence')?.value;
    const value = residencies.find((r) => r.value === residence)?.display;

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
    const building =
      this.bookingForm.get(choice)?.get('building')?.value ||
      this.booking?.firstChoice.building;

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

  showError(choice: string, fieldName: string): boolean {
    const field = this.bookingForm.get(choice)?.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  // Check for existing booking
  checkExistingBooking() {
    this.reservationService.getOneBooking().subscribe((booking) => {
      if (booking) {
        this.booking = booking;
        this.bookingForm.patchValue({
          firstChoice: booking.firstChoice,
          secondChoice: booking.secondChoice,
        });
        this.updateAccomodationTypes('firstChoice');
        this.updateAccomodationTypes('secondChoice');
        this.updateBuildings('firstChoice');
        this.updateBuildings('secondChoice');
        this.updateTarifs('firstChoice');
        this.updateTarifs('secondChoice');

        this.currentStep = 3;
      }
    });
  }

  acceptAlternative() {
    throw new Error('Method not implemented.');
  }

  rejectAlternative() {
    throw new Error('Method not implemented.');
  }

  handleExistingBooking() {
    if (this.booking) {
      switch (this.booking.status) {
        case BookingStatus.PENDING:
          this.currentStep = 3;
          break;
        case BookingStatus.ACCEPTED:
          this.currentStep = 4;
          break;
        case BookingStatus.REJECTED:
          this.currentStep = 4;
          break;
        case BookingStatus.ALTERNATIVE_OFFERED:
          this.currentStep = 4;
          break;
        default:
          this.currentStep = 1;
      }
    }
  }

  ngOnInit() {
    this.checkExistingBooking();
  }

  constructor(
    private fb: FormBuilder,
    private printService: PrintServiceService,
    private reservationService: ReservationService
  ) {}

  isStepValid(): boolean {
    if (this.currentStep === 1) {
      return (
        (this.bookingForm.get('firstChoice')?.valid ?? false) &&
        (this.bookingForm.get('secondChoice')?.valid ?? false)
      );
    }
    return true;
  }

  nextStep() {
    if (this.currentStep === 1 && this.bookingForm.valid) {
      this.currentStep++;
    } else if (this.currentStep === 2) {
      this.isValidated = true;
      this.booking = {
        firstChoice: this.bookingForm.get('firstChoice')?.value,
        secondChoice: this.bookingForm.get('secondChoice')?.value,
        remarks: this.bookingForm.get('remarks')?.value,
        status: BookingStatus.PENDING,
      };
      this.submitBooking(this.booking);

      //@TODO: Send the booking to the server

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

  submitBooking(booking: Booking) {
    // Submit booking to the server
    console.log(this.bookingForm.value);
  }
}
