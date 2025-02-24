import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export enum BookingStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  ALTERNATIVE_OFFERED = 'ALTERNATIVE_OFFERED',
}

export interface Fee {
  name: string;
  amount: string;
  paymentType: string;
}

export interface Building {
  value: string;
  display: string;
}

export interface AccommodationType {
  value: string;
  display: string;
  fees: Fee[];
}

export interface Residency {
  value: string;
  display: string;
  accommodations: AccommodationType[];
  buildings?: Building[];
}

export interface Choice {
  residence: string;
  accommodation: string;
  building: string;
  apartment: string;
  room: string;
}

export interface Booking {
  id?: string;
  firstChoice: Choice;
  secondChoice: Choice;
  remarks?: string;
  status: BookingStatus;
}

interface RoomDetails {
  roomType: string;
  items: string[];
}

interface Article {
  title: string;
  content?: string[] | RoomDetails[] | string; // Content can be a list of points, room details, or a single paragraph
  details?: string | string[]; // Additional details or points
}

interface Rules {
  generalInfo: string;
  articles: Article[];
}

export const residencies: Residency[] = [
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

export const rules: Rules = {
  generalInfo:
    'Le règlement intérieur est un engagement de toutes les parties prenantes de la résidence qui résume l’ensemble des mesures et des règles permanentes relatives à l’hygiène, la sécurité et la discipline qui organisent la vie commune au sein de la résidence. Une vie commune dans la résidence pour étudiants est tributaire d’un respect mutuel de l’entourage, de la vie individuelle et collective,  de la direction de la résidence ALKARAMA et également la sauvegarde des équipements et infrastructures mis à la disposition des résidents.',
  articles: [
    {
      title: 'Article 2 : POLITIQUE DE LOCATION',
      content: [
        '-  9 mois et demi  (du 15 septembre au 30 juin) étudiant session Automne,',
        '-  8 mois et demi (du 15 octobre au 30 juin) étudiant session de novembre,',
        '-  6 mois (du 1er jan au 30 juin) étudiant session de janvier,',
        'Un contrat  spécifique d’été est prévu pour le mois de juillet et août.',
      ],
    },

    {
      title: 'Article 3 : EQUIPEMENT ET SERVICES',
      content: [
        {
          roomType: 'Chambre individuelle ou partagée',
          items: [
            'Lit simple (1m de largeur)',
            'Bureau avec chaise',
            '- Armoire ou placard',
          ],
        },
        {
          roomType: 'Chambre confort',
          items: [
            'Lit simple (1m.40 de largeur)',
            'Bureau avec chaise',
            'Armoire ou placard ',
            'TV',
          ],
        },
        {
          roomType: 'Chambre VIP',
          items: [
            'Lit simple (1m de largeur)',
            'Bureau avec chaise',
            'Armoire ou placard ',
            'TV',
            'Salle de bain intégrée',
          ],
        },
      ],
      details: [
        'La cuisine est équipée d’un réfrigérateur, d’une plaque de cuisson à gaz et des placards de rangement.La consommation d’eau est comprise dans le loyer. L’installation d’une parabole groupée est existante l’étudiant peut brancher directement son décodeur, les  chaines marocaines sont offertes ainsi que la connexion internet par wifi.',
        'La consommation d’électricité est à la charge des locataires. Les colocataires sont amenés à payer  leur quittance d’électricité, conjointement et chaque fin de mois. S’il y a résiliation du compteur faute de non-paiement, le locataire devra payer la somme due ainsi qu’une pénalité de 500dh chacun pour rétablissement de compteur et dérangement. Avant le départ, les colocataires doivent apportés au service de la résidence le reçu de paiement de la dernière quittance (dernier mois habité).',
      ],
    },
    {
      title: 'Article 4 : OCCUPATION DES LIEUX',
      content:
        "Le locataire dont le nom apparaît sur le bail a seul le droit d'occuper la chambre qui lui est allouée en vertu du bail. Le résident signataire du dit bail, bénéficie d’un droit d’occupation personnelle et inaliénable .Aucune sous location  n’est tolérée faute de quoi une pénalité est appliquée (1000 dh)",
    },
    {
      title: 'Article 5 : ETAT DES LIEUX',
      content: [
        'Les états des lieux entrée et sortie sont conjointement signés par le résident et la direction de la résidence ALKARAMA. Il est impératif avant de signer le compte rendu des états des lieux d’inspecter tous les lieux ainsi  que les meubles afin d’éviter toute contestation ultérieure.',
        "Le résident s'engage à maintenir en bon état tous les biens de sa chambre et ne faire aucun changement ou altération (peindre, teindre, perforer, etc.) aux lieux loués ou aux biens meubles mis à sa disposition. Il doit  laisser à leur lieu respectif, l'ameublement des chambres, des unités et des autres pièces. En son absence, le locataire s'engage à éteindre les lumières, à fermer les fenêtres et à toujours fermer à clé sa chambre, son appartement et la porte de son  bâtiment.",
      ],
      details: [
        'Le résident doit informer dans les plus brefs délais la direction de la  résidence de toute défectuosité ou détérioration des lieux loués (anomalie d’installation électrique, de gaz ou dégâts des eaux…) et des biens meubles mis à sa disposition.',
        'Le résident doit avertir la direction de la  résidence 15 jours avant  la date de son départ.',
        'A défaut, l’état des lieux sera dressé unilatéralement par la direction sans possibilités de contestations de la part du résident.',
      ],
    },
    {
      title: 'Article 6 : CAUTION',
      content: [
        'Le résident devra verser à la Direction des résidences ALKARAMA, une caution forfaitaire de mille deux cent dirhams (1200,00 Dhs) à la signature du contrat. La dite caution restera en dépôt durant toute la période d’hébergement, et elle sera restituée au résident à la fin de son contrat le 30 Juin (si ce dernier est respecté), après déduction des montants dégâts ou autres frais.',
        'Pour un nouveau résident, la direction lui donne la possibilité de loger 3 jours d’essai, au-delà de cette date aucun remboursement de caution n’est acceptable.',
      ],
    },
    {
      title: 'Article 7 : FRAIS DE SYNDIC',
      content:
        'Les frais de syndic sont payables au début de l’année à hauteur de 300.00 dhs annuellement (Entretien des espaces communs, Sécurité et Ascenseur.)',
    },
    {
      title: 'Article 8 : REGLEMENT DE REDEVANCES',
      content: [
        'Le règlement des redevances est bi-mensuel. Le premier versement est exigible lors de la signature du contrat de bail.',
        'Le 2ème versement au plus tard le 15 novembre',
        'Le 3ème versement avant le 15 janvier,',
        'Le 4ème versement avant le 15 mars,',
        'Le 5ème versement avant le 15 mai, ',
        'Tout retard de paiement (dépassant de délai prescris de 2 semaines) peut faire l’objet d’une pénalité de retard de 50 dh et 100 dh à partir du mois d’après.',
      ],
    },
    {
      title: 'Article 10 : SIGNATURE DU CONTRAT DE BAIL',
      content:
        'Le résident ne signe le contrat de bail et l’avenant qu’une fois qu’il ait pris connaissance du règlement intérieur et visité son futur logement',
    },
    {
      title: 'Article 11 : RESILIATION D’UN CONTRAT DE BAIL',
      content: [
        'Le résident résilie son bail au plus tard 3 jours après la signature du contrat, un montant de 500 Dh seulement sera déduit de la caution. Au-delà de cette durée aucun remboursement de caution ne pourra être accepté.',
        "Exceptionnellement le résident est libéré de son bail sans pénalité s'il achève son programme d’études ou  effectue un stage prévu dans le programme d’études. Dans ce cas, un préavis d’un mois est exigé.",
      ],
    },
    {
      title: 'Article 12   : VOLS',
      content:
        'La  porte de l’appartement et la porte de la chambre doivent constamment être  fermées car  la direction de la  résidence Al KARAMA  décline toute responsabilité en cas de vol dont pourraient être victimes les résidents, dans leur appartement ou leur chambre. ',
    },
    {
      title: 'Article 13 : ACCES AUX APPARTEMENTS ET CHAMBRES.',
      content: [
        'Le résident sera le seul responsable des visiteurs qu’il introduira au sein de la résidence. Ces derniers doivent présenter leurs cartes d’identité à l’entrée. ',
        'Les visites ne doivent pas être fréquentes. Les visites ne doivent pas dérangées les colocataires.',
        'Pour l’hébergement d’un membre de famille (père, mère, sœur), la direction doit donner son accord.',
      ],
    },
    {
      title: 'Article 14 : RESPONSABILITÉS DU LOCATAIRE',
      content: [
        'Le résident doit mettre ses ordures ménagères dans des sacs en plastique et les déposer dans la grande poubelle située au bas de l’immeuble. Il est strictement interdit de jeter les ordures par la fenêtre.',
        "Pour des raisons d'hygiène, le résident doit veiller à la propreté de sa chambre, de la cuisine comprenant réfrigérateur, plaque de cuisson et évier de la salle de bain. Les résidents partageant l’appartement seront tenus conjointement responsables des dommages causés aux lieux communs (salle de bain, cuisine….) ainsi que les dégâts causés par la saleté. Voir tarifs des dégâts",
        "Le résident s'engage à ne faire cuire ou réchauffer aucun aliment dans sa chambre et à n'utiliser dans celle-ci aucun appareil électrique à l’exception  de la télévision et de l’ordinateur, de l’imprimante, du séchoir et du fer à repasser.",
        "Le locataire ne devra garder dans les lieux loués ou dans l'édifice faisant partie des lieux loués aucun animal.",
        'Aucune n’arme à feu et aucune substance inflammable, explosive, corrosive ou autrement dommageable n’est permise dans les lieux loués.',
        'La consommation des boissons alcoolisées est strictement interdite dans les lieux loués. La possession et/ou le trafic de drogue ne sont interdits à toute personne dans la résidence.',
        "En tout temps le locataire s'engage à assurer le bien-être et le repos des personnes du voisinage. Les téléviseurs, les systèmes de son ou tout autre appareil pouvant produire des bruits excessifs doivent nécessairement être utilisés exclusivement avec des écouteurs. ",
        'Il est  interdit de fumer dans tous les lieux de la résidence. Conséquemment, tous les lieux loués sont désignés zone non-fumeurs. ',
      ],
      details:
        "Le courant électrique des chambres de la résidence a été installé en prévision de l'usage normal d'une chambre. La surcharge électrique peut occasionner des dangers d'incendie. Le locataire dérogeant à cet article crée ainsi une surcharge électrique compromettant sa propre sécurité et celle des autres locataires. En cas de sinistre, il peut conséquemment être tenu responsable.",
    },
    {
      title: 'Article 16 : CONSIGNE',
      content:
        'Le résident peut bénéficier du service consigne gracieusement du 1er juin au 1er octobre pour garder ses affaires durant la période d’été seulement.',
    },
    {
      title: 'Article 17 : NON RESPECT DES REGLES / SANCTION',
      content: [
        "Dans le cas où la direction de la résidence constate qu'il y a des dommages, des articles manquants ou des réparations non conformes qui ont été effectuées par le résident aux lieux loués ou aux biens meubles mis à sa disposition, une estimation des coûts engendrés sera effectuée. Le locataire devra assumer la totalité de ces coûts.",
        'Le nonrespect des présentes règles par le résident peut entraîner des sanctions, qui sont classées par ordre : Avertissement écrit (1er ,2ème), Exclusion de la résidence, Exclusion des cours et examens',
      ],
      details: [
        'Les parents du résident sanctionné sont informés chaque fois qu’une sanction lui sera infligée.',
      ],
    },
  ],
};

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  bookings = [
    {
      code: 'BK001',
      status: BookingStatus.ALTERNATIVE_OFFERED,
      firstChoice: {
        residence: 'interne',
        accommodation: 'hotel',
        building: 'metz',
        apartment: '101',
        room: '1A',
      },
      secondChoice: {
        residence: 'al_karama',
        accommodation: 'individual',
        building: 'al_karama_2_garçon',
        apartment: '202',
        room: '2B',
      },
    },
    {
      code: 'BK002',
      status: BookingStatus.ALTERNATIVE_OFFERED,
      firstChoice: {
        residence: 'interne',
        accommodation: 'individual',
        building: 'ottawa',
        apartment: '303',
        room: '3C',
      },
      secondChoice: {
        residence: 'al_karama',
        accommodation: 'studio',
        building: 'al_karama_2_garçon',
        apartment: '404',
        room: '4D',
      },
    },
    {
      code: 'BK003',
      status: BookingStatus.ALTERNATIVE_OFFERED,
      firstChoice: {
        residence: 'al_karama',
        accommodation: 'shared',
        building: 'al_karama_2_garçon',
        apartment: '505',
        room: '5E',
      },
      secondChoice: {
        residence: 'external',
        accommodation: 'individual',
        building: 'ext_tilila',
        apartment: '606',
        room: '6F',
      },
    },
    {
      code: 'BK004',
      status: BookingStatus.ALTERNATIVE_OFFERED,
      firstChoice: {
        residence: 'external',
        accommodation: 'studio',
        building: 'ext_madou',
        apartment: '707',
        room: '7G',
      },
      secondChoice: {
        residence: 'interne',
        accommodation: 'comfort',
        building: 'metz',
        apartment: '808',
        room: '8H',
      },
    },
    {
      code: 'BK005',
      status: BookingStatus.ALTERNATIVE_OFFERED,
      firstChoice: {
        residence: 'interne',
        accommodation: 'vip-hotel',
        building: 'ottawa',
        apartment: '909',
        room: '9I',
      },
      secondChoice: {
        residence: 'external',
        accommodation: 'shared',
        building: 'ext-albayane',
        apartment: '1010',
        room: '10J',
      },
    },
  ];

  getOneBooking(): Observable<Booking> {
    const idx = Math.floor(Math.random() * this.bookings.length);
    return of(this.bookings[idx]);
  }

  constructor() {}
}
