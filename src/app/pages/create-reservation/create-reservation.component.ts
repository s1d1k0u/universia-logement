import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import {
  ChevronRight,
  LucideAngularModule,
  EyeOff,
  Eye,
  CheckCircle,
} from 'lucide-angular';
import { v4 as uuidv4 } from 'uuid';

import { PrintServiceService } from '../../services/print-service.service';
import { TarifsTableComponent } from '../../components/tarifs-table/tarifs-table.component';
import { ChoiceSummaryComponent } from '../../components/choice-summary/choice-summary.component';
import {
  ReservationService,
  AmenagementType,
  ChoiceTarif,
  ReservationStatus,
  rejectionReasons,
  NewResidency,
  NewBuilding,
  NewApartment,
  NewRoom,
  NewFee,
  ChoiceType,
  NewReservation,
} from '../../services/reservation.service';
import { ActivatedRoute } from '@angular/router';
import ModalComponent from '../../components/modal/modal.component';
import { ReglementComponent } from '../../components/reglement/reglement.component';
import { PersonalizationComponent } from '../../components/personalization/personalization.component';
import { RESIDENCIES } from '../../landing/landing.component';

interface Summary {
  firstChoice: {
    residence: string;
    accommodation: string;
    building: string;
    apartment: string;
    room: string;
    tarifs: ChoiceTarif[];
    isValidated: boolean | null;
  };
  secondChoice: {
    residence: string;
    accommodation: string;
    building: string;
    apartment: string;
    room: string;
    tarifs: ChoiceTarif[];
    isValidated: boolean | null;
  };
  remarks: string | null;
}

@Component({
  selector: 'app-create-reservation',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LucideAngularModule,
    TarifsTableComponent,
    ChoiceSummaryComponent,
    ModalComponent,
    ReglementComponent,
  ],
  templateUrl: './create-reservation.component.html',
  styleUrl: './create-reservation.component.css',
})
export class CreateReservationComponent {
  private formBuilder = inject(FormBuilder);
  residencies: NewResidency[] = [];
  ReservationStatus = ReservationStatus;
  RESIDENCIES = RESIDENCIES;

  rejectionReason =
    rejectionReasons[Math.floor(Math.random() * rejectionReasons.length)];
  rulesAccepted = false;

  reservationForm: FormGroup = this.formBuilder.group({
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
  readonly checkCircle = CheckCircle;

  currentStep = 1;
  isValidated = false;
  showDetails = false;
  case = 'pending';

  steps = ['Choix', 'Résumé', 'Confirmation', 'Paiement'];

  reservation?: NewReservation;
  summary: Summary = {} as Summary;
  firstChoiceAccomodationTypes: AmenagementType[] = [];
  firstChoiceBuildings: NewBuilding[] = [];
  firstChoiceApartments: NewApartment[] = [];
  firstChoiceRooms: NewRoom[] = [];
  firstChoiceFees: NewFee[] = [];

  secondChoiceAccomodationTypes: AmenagementType[] = [];
  secondChoiceBuildings: NewBuilding[] = [];
  secondChoiceApartments: NewApartment[] = [];
  secondChoiceRooms: NewRoom[] = [];
  secondChoiceFees: NewFee[] = [];

  isModalOpen = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal(close: boolean) {
    this.isModalOpen = close;
  }

  handleConfirm(confirm: boolean) {
    if (confirm) {
      console.log('Rules accepted+Parent');
      this.rulesAccepted = true;
      this.reservationService
        .updateReservation({
          RSV_ID: this.reservation!.RSV_ID,
          ANN_ID: this.reservation!.ANN_ID,
          Et_ID: ReservationStatus.EN_COURS_DE_REGLEMENT,
          RSV_ANNULER: false,
        })
        .subscribe({
          next: () => {
            this.currentStep = 4;
            console.log('En cours de reglement');
          },
          error: () => {
            console.log('Failed to update reservation');
          },
        });
    }
  }

  updateTarifs(choice: string) {
    const residenceId = this.reservationForm
      .get(choice)
      ?.get('residence')?.value;
    const amenagementId = this.reservationForm
      .get(choice)
      ?.get('accommodation')?.value;

    this.reservationService.getTarifs(residenceId, amenagementId).subscribe({
      next: (fees) => {
        console.log(fees);

        if (choice === 'firstChoice') {
          this.firstChoiceFees = fees ?? [];
        } else {
          this.secondChoiceFees = fees ?? [];
        }
      },
      error: () => {
        console.log('Error');
      },
    });
  }

  updateAccomodationTypes(choice: string) {
    const residence = this.reservationForm.get(choice)?.get('residence')?.value;

    this.reservationService.getAmenagementType(residence).subscribe({
      next: (accommodations) => {
        if (choice === 'firstChoice') {
          this.firstChoiceAccomodationTypes = accommodations ?? [];
        } else {
          this.secondChoiceAccomodationTypes = accommodations ?? [];
        }
      },
      error: () => {
        console.log('Error');
      },
    });
  }

  updateBuildings(choice: string) {
    const residency = this.reservationForm.get(choice)?.get('residence')?.value;
    const amenagementId = this.reservationForm
      .get(choice)
      ?.get('accommodation')?.value;
    this.reservationService.getBuildings(residency, amenagementId).subscribe({
      next: (buildings) => {
        if (choice === 'firstChoice') {
          this.firstChoiceBuildings = buildings ?? [];
        } else {
          this.secondChoiceBuildings = buildings ?? [];
        }
      },
      error: () => {
        console.log('Error');
      },
    });
  }

  updateApartments(choice: string) {
    const building = this.reservationForm.get(choice)?.get('building')?.value;
    const amenagementId = this.reservationForm
      .get(choice)
      ?.get('accommodation')?.value;

    this.reservationService
      .getApartments(building as string, amenagementId)
      .subscribe({
        next: (apartments) => {
          if (choice === 'firstChoice') {
            this.firstChoiceApartments = apartments ?? [];
          } else {
            this.secondChoiceApartments = apartments ?? [];
          }
        },
        error: () => {
          console.log('Error');
        },
      });
  }

  updateRooms(choice: string) {
    const apartment = this.reservationForm.get(choice)?.get('apartment')?.value;
    const amenagementId = this.reservationForm
      .get(choice)
      ?.get('accommodation')?.value;
    this.reservationService
      .getRooms(apartment as string, amenagementId)
      .subscribe({
        next: (rooms) => {
          if (choice === 'firstChoice') {
            this.firstChoiceRooms = rooms ?? [];
          } else {
            this.secondChoiceRooms = rooms ?? [];
          }
        },
        error: () => {
          console.log('Error');
        },
      });
  }

  getResidenceName(choice: string): string {
    const residence = this.reservationForm.get(choice)?.get('residence')?.value;
    const value = this.residencies.find((r) => r.RES_Id === residence)?.RES_Nom;

    return value ?? 'Non spécifié';
  }

  getAccommodationName(choice: string): string {
    const accommodation = this.reservationForm
      .get(choice)
      ?.get('accommodation')?.value;

    let value: string;
    switch (choice) {
      case 'firstChoice':
        value =
          this.secondChoiceAccomodationTypes.find(
            (a) => a.AMNGMNT_ID === accommodation
          )?.AMNGMNT_TYPE ?? 'Non spécifié';
        break;
      case 'secondChoice':
        value =
          this.secondChoiceAccomodationTypes.find(
            (a) => a.AMNGMNT_ID === accommodation
          )?.AMNGMNT_TYPE ?? 'Non spécifié';
        break;
      default:
        value = 'Non spécifié';
    }

    return value;
  }

  getBuildingName(choice: string): string {
    const currentBuilding = this.reservationForm
      .get(choice)
      ?.get('building')?.value;

    let value: string;
    switch (choice) {
      case 'firstChoice':
        value =
          this.firstChoiceBuildings.find(
            (building) => building.BAT_ID === currentBuilding
          )?.BAT_NOM ?? 'Non spécifié';
        break;
      case 'secondChoice':
        value =
          this.secondChoiceBuildings.find(
            (building) => building.BAT_ID === currentBuilding
          )?.BAT_NOM ?? 'Non spécifié';
        break;
      default:
        value = 'Non spécifié';
    }

    return value;
  }

  getApartmentName(choice: string): string {
    const currentApartment = this.reservationForm
      .get(choice)
      ?.get('apartment')?.value;

    let value: string;
    switch (choice) {
      case 'firstChoice':
        value =
          this.firstChoiceApartments.find(
            (apartment) => apartment.APRT_ID === currentApartment
          )?.APRT_NOM ?? 'Non spécifié';
        break;
      case 'secondChoice':
        value =
          this.secondChoiceApartments.find(
            (apartment) => apartment.APRT_ID === currentApartment
          )?.APRT_NOM ?? 'Non spécifié';
        break;
      default:
        value = 'Non spécifié';
    }
    return value;
  }

  getRoomName(choice: string): string | number {
    const currentRoom = this.reservationForm.get(choice)?.get('room')?.value;

    let value: number | string;
    switch (choice) {
      case 'firstChoice':
        value =
          this.firstChoiceRooms.find((room) => room.CHBR_ID === currentRoom)
            ?.NUMEROCHAMBRE ?? 'Non spécifié';
        break;
      case 'secondChoice':
        value =
          this.secondChoiceRooms.find((room) => room.CHBR_ID === currentRoom)
            ?.NUMEROCHAMBRE ?? 'Non spécifié';
        break;
      default:
        value = 'Non spécifié';
    }

    return value;
  }

  showError(choice: string, fieldName: string): boolean {
    const field = this.reservationForm.get(choice)?.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  acceptOffer() {
    this.openModal();
  }

  rejectOffer() {
    this.reservationService.cancelReservation(this.reservation!).subscribe({
      next: () => {
        console.log('Reservation Rejected');
      },
      error: () => {
        console.log('Failed to reject reservation');
      },
    });
  }

  ngOnInit() {
    const RSV_CODE = this.activeRouter.snapshot.params['RSV_CODE'];

    if (!RSV_CODE) {
      this.currentStep = 1;
      console.log('No Reservation Found');

      this.reservationService.getResidencies().subscribe({
        next: (residencies) => {
          this.residencies = residencies;
        },
      });
      return;
    } else {
      console.log('Found A Reservation');

      this.reservationService
        .getReservationByCode(RSV_CODE as string)
        .subscribe({
          next: (reservations) => {
            this.reservation = reservations[0];

            switch (this.reservation.Et_ID) {
              case ReservationStatus.EN_COURS_DE_VALIDATION_ADMIN:
              case ReservationStatus.EN_COURS_DE_CONFIRMATION:
                this.currentStep = 3; // EN_COURS_DE_VALIDATION_ADMIN
                this.reservationService
                  .getReservationChoices(this.reservation.RSV_ID)
                  .subscribe({
                    next: (choices) => {
                      this.summary!.firstChoice = {
                        residence: choices.find(
                          (ch) => ch.TCH_ID === ChoiceType.FIRST_CHOICE
                        )?.RES_Nom!,
                        accommodation: choices.find(
                          (ch) => ch.TCH_ID === ChoiceType.FIRST_CHOICE
                        )?.AMNGMNT_TYPE!,
                        building: choices.find(
                          (ch) => ch.TCH_ID === ChoiceType.FIRST_CHOICE
                        )?.BAT_Nom!,
                        apartment: choices.find(
                          (ch) => ch.TCH_ID === ChoiceType.FIRST_CHOICE
                        )?.APRT_Nom!,
                        room: choices.find(
                          (ch) => ch.TCH_ID === ChoiceType.FIRST_CHOICE
                        )?.NUMEROCHAMBRE!,
                        tarifs: choices.find(
                          (ch) => ch.TCH_ID === ChoiceType.FIRST_CHOICE
                        )?.CHOIX_TARIF! as [],
                        isValidated: choices.find(
                          (ch) => ch.TCH_ID === ChoiceType.FIRST_CHOICE
                        )?.CH_VALIDE!,
                      };
                      this.summary!.secondChoice = {
                        residence: choices.find(
                          (ch) => ch.TCH_ID === ChoiceType.SECOND_CHOICE
                        )?.RES_Nom!,
                        accommodation: choices.find(
                          (ch) => ch.TCH_ID === ChoiceType.SECOND_CHOICE
                        )?.AMNGMNT_TYPE!,
                        building: choices.find(
                          (ch) => ch.TCH_ID === ChoiceType.SECOND_CHOICE
                        )?.BAT_Nom!,
                        apartment: choices.find(
                          (ch) => ch.TCH_ID === ChoiceType.SECOND_CHOICE
                        )?.APRT_Nom!,
                        room: choices.find(
                          (ch) => ch.TCH_ID === ChoiceType.SECOND_CHOICE
                        )?.NUMEROCHAMBRE!,
                        tarifs: choices.find(
                          (ch) => ch.TCH_ID === ChoiceType.SECOND_CHOICE
                        )?.CHOIX_TARIF! as [],
                        isValidated: choices.find(
                          (ch) => ch.TCH_ID === ChoiceType.SECOND_CHOICE
                        )?.CH_VALIDE!,
                      };
                    },
                  });

                break;
              case ReservationStatus.REJETE:
                this.currentStep = 3;
                break;
              case ReservationStatus.EN_COURS_DE_REGLEMENT:
                this.currentStep = 4;
                break;
              default:
                this.currentStep = 1;
            }
          },
          error: () => console.log('Failed To get reservation'),
        });
    }
  }

  constructor(
    private fb: FormBuilder,
    private printService: PrintServiceService,
    private reservationService: ReservationService,
    private activeRouter: ActivatedRoute
  ) {}

  isStepValid(): boolean {
    if (this.currentStep === 1) {
      return (
        (this.reservationForm.get('firstChoice')?.valid ?? false) &&
        (this.reservationForm.get('secondChoice')?.valid ?? false)
      );
    }
    return true;
  }

  nextStep() {
    if (this.currentStep === 1 && this.reservationForm.valid) {
      this.currentStep++;
    } else if (this.currentStep === 2) {
      this.isValidated = true;
      this.submitReservation();

      this.currentStep++;
    } else if (this.currentStep < this.steps.length - 1 && this.isStepValid()) {
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

  submitReservation() {
    // Submit reservation to the server
    const newReservation = {
      RSV_ID: uuidv4(),
      MBR_ID: '07882adb-4dea-4b65-87b0-1698d1227082',
      RSV_DATE: new Date(),
      ANN_ID: '40261ce7-cf25-4a32-a1fd-c933f91dd900',
      RSV_ANNULER: false,
      RSV_CODE: 'string',
      Et_ID: ReservationStatus.EN_COURS_DE_VALIDATION_ADMIN, //'1e7f149c-7346-4146-95e4-ef81e4a84a6f',
      Fac_Id: null,
      Niv_Id: null,
      RSV_REMARQUEMBR: this.reservationForm.get('remarks')?.value,
      RSV_REMARQUEADMIN: null,
      Rejete_Id: null,
    };
    this.reservationService.createReservation(newReservation).subscribe({
      next: (reservation) => {
        const choices = [
          {
            MBR_ID: '07882adb-4dea-4b65-87b0-1698d1227082',
            RSV_ID: newReservation.RSV_ID,
            CH_ID: uuidv4(),
            APRT_ID: this.reservationForm.get('firstChoice')?.get('apartment')
              ?.value,
            CHBR_ID: this.reservationForm.get('firstChoice')?.get('room')
              ?.value,
            AMNGMNT_ID: this.reservationForm
              .get('firstChoice')
              ?.get('accommodation')?.value,
            TCH_ID: ChoiceType.FIRST_CHOICE,
            BAT_ID: this.reservationForm.get('firstChoice')?.get('building')
              ?.value,
            RES_Id: this.reservationForm.get('firstChoice')?.get('residence')
              ?.value,
          },
          {
            MBR_ID: '07882adb-4dea-4b65-87b0-1698d1227082',
            RSV_ID: newReservation.RSV_ID,
            CH_ID: uuidv4(),
            APRT_ID: this.reservationForm.get('secondChoice')?.get('apartment')
              ?.value,
            CHBR_ID: this.reservationForm.get('secondChoice')?.get('room')
              ?.value,
            AMNGMNT_ID: this.reservationForm
              .get('secondChoice')
              ?.get('accommodation')?.value,
            TCH_ID: ChoiceType.SECOND_CHOICE,
            BAT_ID: this.reservationForm.get('secondChoice')?.get('building')
              ?.value,
            RES_Id: this.reservationForm.get('secondChoice')?.get('residence')
              ?.value,
          },
        ];

        choices.forEach((choice) => {
          this.reservationService.createReservationChoice(choice).subscribe({
            next: (choice) => {
              console.log(choice);
            },
            error: () => {
              console.log('Failed to create choice');
            },
          });
        });
        document.location.reload();
      },
      error: () => {
        console.log('Failed to create reservation');
      },
    });
  }
}
