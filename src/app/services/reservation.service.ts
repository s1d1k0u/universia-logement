import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export enum ReservationStatus {
  EN_COURS_DE_REGLEMENT = '6a7f44b2-afa8-4faa-b6bd-068696572837',
  REJETE = 'd2c7e401-5a38-4e34-ac95-45f7949b12b1',
  EN_COURS_DE_VALIDATION_ADMIN = '5e5c8dce-3352-4a67-8ea7-ac7c2bdb463c',
  EN_COURS_DE_VALIDE_ETUDIANT = 'e0346ce1-6955-4585-83ee-b6ecd83ef7ee',
  EN_COURS_DE_CONFIRMATION = '4ded9543-bbe3-4f68-8b19-ba1befe8bf44',
  COMPLETEE = 'c0cfde43-1e93-4763-be74-bf2812d05782',
  ANNULE = 'd91adddd-70a0-44d2-b67c-dff82feff869',
  EN_COURS_DE_RESERVATION = '1e7f149c-7346-4146-95e4-ef81e4a84a6f',
}

export interface NewResidency {
  RES_Id: string;
  RES_Nom: string;
  RES_Description: string | null;
}

export interface NewBuilding {
  BAT_ID: string;
  BAT_NOM: string;
  Sex_Id: string;
}

export interface NewApartment {
  APRT_ID: string;
  APRT_NOM: string;
}

export interface NewRoom {
  CHBR_ID: string;
  NUMEROCHAMBRE: number;
  INVISIBLE: boolean;
}

export interface NewFee {
  TAR_Id: string;
  TAR_Montant: number;
  Fact_Nom: string;
  VersRec_Nom: string;
}

export interface Choice {
  residence: string;
  accommodation: string;
  building: string;
  apartment: string;
  room: string;
}

export interface Reservation {
  id?: string;
  firstChoice: Choice;
  secondChoice: Choice;
  remarks?: string;
  status: ReservationStatus;
}

export interface NewReservation {
  RSV_ID: string;
  MBR_ID: string;
  RSV_DATE: Date;
  ANN_ID: string;
  RSV_ANNULER: boolean;
  RSV_CODE: string;
  Et_ID: string;
  Fac_Id: string | null;
  Niv_Id: string | null;
  RSV_REMARQUEMBR: string | null;
  RSV_REMARQUEADMIN: string | null;
  Rejete_Id: string | null;
}

interface RoomDetails {
  roomType: string;
  items: string[];
}

export interface AmenagementType {
  AMNGMNT_ID: string;
  AMNGMNT_TYPE: string;
  AMNGMNT_NMBREPLACE: number;
}

export interface Member {
  MBR_ID: string;
  PERS_ID: string;
  MBR_MATRICULE: string;
  MBR_NOM: string;
  MBR_PRENOM: string;
  MBR_DATENAISSANCE: Date;
  MBR_CINOUPASS: string;
  MBR_ADRESSE: string;
  MBR_GSM: string;
  MBR_EMAIL: string;
  MBR_REMARQUE: string;
  MBR_CARDNO: string;
  MBR_CARDISACTIVE: number;
  MBR_GENRE: string;
}

export interface UpdateMember {
  MBR_NOM: string;
  MBR_PRENOM: string;
  MBR_GENRE: string;
}

export enum ChoiceType {
  FIRST_CHOICE = 'd17e634c-3956-484d-9556-3f429548c72b',
  SECOND_CHOICE = '680853a6-30aa-412c-b3b0-0d090e9130a9',
}

export interface NewChoice {
  MBR_ID: string;
  RSV_ID: string;
  CH_ID: string;
  APRT_ID: string;
  CHBR_ID: string;
  AMNGMNT_ID: string;
  TCH_ID: ChoiceType;
  BAT_ID: string;
  RES_Id: string;
}

export interface ChoiceTarif {
  TAR_Id: string;
  TAR_Montant: number;
  Fact_Nom: string;
  VersRec_Nom: string;
}

export interface ChoiceDetails {
  CH_ID: string;
  TCH_ID: string;
  RSV_ID: string;
  RES_Nom: string;
  AMNGMNT_TYPE: string;
  BAT_Nom: string;
  APRT_Nom: string;
  NUMEROCHAMBRE: string;
  CHOIX_TARIF: ChoiceTarif[];
  CH_VALIDE: boolean | null;
}

export const rejectionReasons = [
  'Vous avez déjà atteint le nombre maximum de réservations autorisées pour ce semestre. Consultez votre compte pour vérifier vos réservations existantes.',
  'Malheureusement, le type de chambre sélectionné est complet. Veuillez choisir un autre logement ou vérifier plus tard.',
  'Veuillez vérifier votre nom, votre numéro d’étudiant et vos coordonnées avant de réessayer.',
  'Votre demande est incomplète. Merci d’ajouter les documents nécessaires (carte d’étudiant, certificat de scolarité, etc.) et de soumettre à nouveau votre demande.',
  'Votre réservation a été refusée en raison d’une violation des règles du logement lors d’un précédent séjour. Contactez l’administration pour plus d’informations.',
  'Vous avez déjà atteint le nombre maximum de réservations autorisées pour ce semestre. Consultez votre compte pour vérifier vos réservations existantes.',
  'Ce logement est temporairement indisponible pour cause de maintenance. Veuillez choisir une autre résidence.',
  'En raison des mesures en vigueur, nous ne pouvons pas accepter de nouvelles réservations pour le moment. Merci de vérifier ultérieurement.',
  'Cette résidence est réservée aux étudiants boursiers ou bénéficiant d’un statut particulier. Veuillez choisir une autre option.',
];

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private http: HttpClient = inject(HttpClient);
  baseUrl = 'http://localhost:5219/api/Reservation';
  member?: Member;
  reservation?: NewReservation;

  getResidencies(): Observable<NewResidency[]> {
    return this.http.get<NewResidency[]>(`${this.baseUrl}/SearchResidence`);
  }

  getAmenagementType(residenceId: string): Observable<AmenagementType[]> {
    return this.http.get<AmenagementType[]>(
      `${this.baseUrl}/SearchAmenagement?RES_Id=${residenceId}`
    );
  }

  getBuildings(
    residenceId: string,
    amenagementId: string
  ): Observable<NewBuilding[]> {
    return this.http.get<NewBuilding[]>(
      `${this.baseUrl}/SearchBatiment?Res_Id=${residenceId}&AMNGMNT_ID=${amenagementId}`
    );
  }

  getApartments(
    buildingId: string,
    amenagementId: string
  ): Observable<NewApartment[]> {
    return this.http.get<NewApartment[]>(
      `${this.baseUrl}/SearchAppartement?BAT_ID=${buildingId}&AMNGMNT_ID=${amenagementId}`
    );
  }

  getRooms(apartmentId: string, amenagementId: string): Observable<NewRoom[]> {
    return this.http.get<NewRoom[]>(
      `${this.baseUrl}/SearchChambre?APRT_ID=${apartmentId}&AMNGMNT_ID=${amenagementId}`
    );
  }

  getTarifs(residenceId: string, amenagementId: string): Observable<NewFee[]> {
    return this.http.get<NewFee[]>(
      `${this.baseUrl}/SearchTarifs?RES_Id=${residenceId}&AMNGMNT_ID=${amenagementId}`
    );
  }

  getReservationByCode(reservationCode: string): Observable<NewReservation[]> {
    return this.http.get<NewReservation[]>(
      `${this.baseUrl}/GetReservationByCode?RSV_CODE=${reservationCode}`
    );
  }

  getReservationChoices(reservationId: string) {
    return this.http.get<ChoiceDetails[]>(
      `${this.baseUrl}/SearchReservationChoix?RSV_ID=${reservationId}`
    );
  }

  updateReservation({
    RSV_ID,
    ANN_ID,
    Et_ID,
    RSV_ANNULER,
  }: {
    RSV_ID: string;
    ANN_ID: string;
    Et_ID: string;
    RSV_ANNULER: boolean;
  }) {
    return this.http.patch<any>(`${this.baseUrl}/UpdateReservation`, {
      RSV_ID,
      ANN_ID,
      Et_ID,
      RSV_ANNULER,
    });
  }

  createReservation(reservation: NewReservation): Observable<boolean> {
    return this.http.post<any>(
      `${this.baseUrl}/CreateReservation`,
      reservation
    );
  }

  createReservationChoice(choice: NewChoice): Observable<boolean> {
    return this.http.post<any>(
      `${this.baseUrl}/CreateReservationChoice`,
      choice
    );
  }

  cancelReservation(reservation: NewReservation): Observable<boolean> {
    return this.http.patch<any>(`${this.baseUrl}/UpdateReservation`, {
      RSV_ID: reservation.RSV_ID,
      ANN_ID: reservation.ANN_ID,
      Et_ID: 'd91adddd-70a0-44d2-b67c-dff82feff869', // Annulée
      RSV_ANNULER: true,
    });
  }

  getMember(mbrMatricule: string, email?: string): Observable<Member[]> {
    return this.http.get<Member[]>(
      `${this.baseUrl}/GetMemberByMatricule?MBR_MATRICULE=${mbrMatricule}&MBR_EMAIL=${email}`
    );
  }

  getMemberById(mbrId: string): Observable<Member[]> {
    return this.http.get<Member[]>(
      `${this.baseUrl}/SearchMemberByID?MBR_ID=${mbrId}`
    );
  }

  updateMember(newMember: UpdateMember): Observable<boolean> {
    return this.http.patch<any>(`${this.baseUrl}/UpdateMember`, newMember);
  }

  setMember(member: Member) {
    this.member = member;
  }

  setReservation(reservation: NewReservation) {
    this.reservation = reservation;
  }

  constructor() {}
}
