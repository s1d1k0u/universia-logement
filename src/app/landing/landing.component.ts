import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  ArrowRight,
  ArrowLeft,
  Home,
  House,
  Building,
  LucideAngularModule,
} from 'lucide-angular';
import { ReservationCheckFormComponent } from '../components/reservation-check-form/reservation-check-form.component';

interface Amenagement {
  title: string;
  description: string;
  imageUrl: string;
}

interface AccommodationType {
  name: string;
  description: string;
}

export const RESIDENCIES = [
  {
    src: '/assets/images/logementExt.jpg',
    title: 'Logement externe',
    description:
      'A dix minutes de marche du campus Universiapolis, le logement externe vous offre des appartements et studios meublé avec plusieurs configurations afin de garantir un confort et qualité de vie. Les étudiants ont le choix entre des studios individuelles et des appartements partagés a 2 ou à 3 colocataires. Tous les studios et appartements sont meublés et équipés (lit, armoire, bureau, chauffage solaire des eaux…). Les étudiants peuvent aussi accéder (sur commande) à d’autres équipements (grand lit, télévision…).',
  },
  {
    src: '/assets/images/residencet.jpg',
    title: 'Résidence Intégrée Universiapolis',
    description:
      'Conçue selon les standards des résidences universitaires modernes, la résidence d’Universiapolis propose aux étudiants résidents plusieurs possibilités de logements (studios individuels ou appartements partagés), des espaces de vie et de convivialité, des espaces de travail, des commerces de proximité… C’est une résidence intégrée qui garantit qualité de vie, proximité et sécurité. La résidence offre des studios et appartements indépendants avec différentes configurations. Les étudiants ont le choix entre des studios individuels et des appartements partagés à 2 ou à 3 colocataires. Tous les studios et appartements sont meublés et équipés (lit, armoire, bureau, chauffage solaire des eaux…). Les étudiants peuvent aussi accéder (sur commande) à d’autres équipements (grand lit, télévision…).',
  },
  {
    src: '/assets/images/alKarama.png',
    title: 'Résidence annexe AL Karama',
    description:
      'Une Résidence hors campus qui comprend des studios individuels et des appartements individuels et partagés meublés et équipés avec les commodités nécessaires à leurs conforts. Cette résidence dispose d’une salle de lecture, une salle de détente avec télévision. sécurité et gardiennage … La résidence offre des studios et appartements indépendants avec différentes configurations. Les étudiants ont le choix entre des studios individuels et des appartements partagés à 2 ou à 3 colocataires. Tous les studios et appartements sont meublés et équipés (lit, armoire, bureau, chauffage solaire des eaux…). Les étudiants peuvent aussi accéder (sur commande) à d’autres équipements (grand lit, télévision…). Chaque appartement dispose d’une cuisine équipée d’un réfrigérateur, cuisinière et salle à manger. Ceci permet aux étudiants résidants une meilleure autonomie dans la gestion de leurs repas quotidiens. Les accès à la Résidence sont sous vidéo-surveillance 24h/24. L’entrée de la résidence est également surveillée par des agents de sécurité. L’accès à la Résidence est réservé aux étudiants de l’Université et l’accès aux invités est régi par un règlement interne spécifique. ',
  },
];

@Component({
  selector: 'app-landing',
  imports: [LucideAngularModule, CommonModule, ReservationCheckFormComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
})
export class LandingComponent {
  selectedResidence = 0;
  isTransitioning = false;
  readonly arrowRight = ArrowRight;
  readonly arrowLeft = ArrowLeft;
  readonly home = Home;
  readonly house = House;
  readonly building = Building;

  selectedType: AccommodationType;

  accommodationTypes: AccommodationType[] = [
    {
      name: 'V.I.P',
      description:
        'Logement premium offrant un confort exceptionnel avec des équipements haut de gamme. Idéal pour les étudiants recherchant une expérience luxueuse avec un espace privé généreux et des finitions soignées.',
    },
    {
      name: 'Appartement Hotel',
      description:
        "Solution d'hébergement flexible combinant le confort d'un appartement avec les services d'un hôtel. Parfait pour les séjours de courte ou moyenne durée avec un excellent rapport qualité-prix.",
    },
    {
      name: 'Individuelle',
      description:
        'Chambre privée moderne et fonctionnelle, conçue pour offrir indépendance et tranquillité. Espace personnel optimisé avec tout le nécessaire pour un séjour confortable.',
    },
    {
      name: 'Confort',
      description:
        "Logement équilibré offrant un bon niveau de confort et d'équipements. Solution idéale pour les étudiants souhaitant un environnement agréable sans superflu.",
    },
    {
      name: 'Partagé',
      description:
        'Espace de colocation convivial permettant de partager les zones communes tout en conservant un espace privé. Excellent choix pour les étudiants sociables souhaitant réduire leurs coûts.',
    },
  ];

  amenagements: Amenagement[] = [
    {
      title: 'Espaces de lecture',
      description:
        'Les étudiants peuvent se retrouver dans la grande salle de lecture située au rez-de-chaussée pour effectuer leurs travaux et projet de groupe. Les horaires d’ouverture sont aménagés pour donner aux étudiants le maximum de temps de travail et de concentration.',
      imageUrl: '/assets/images/lecture.jpg',
    },
    {
      title: 'Restauration',
      description:
        'Pizzeria au feu du bois et sandwicherie, la « Siciliana » d’Universiapolis offre des menus très variés à des petits prix accessibles à tous les étudiants.',
      imageUrl: '/assets/images/restau.jpg',
    },
    {
      title: 'Commerces de proximité',
      description:
        'A l’intérieur de la résidence, l’étudiant a accès à plusieurs prestations sans être obligé de quitter le campus. Une supérette, une laverie, un centre de photocopie, une école de surf… sont tous accessibles au rez-de-chaussée de la résidence pour un meilleur confort des résidants.',
      imageUrl: '/assets/images/commerce.jpg',
    },
    {
      title: 'Salle de sport',
      description:
        'UniversiaSport est un club de gym disposant d’une grande salle de sport polyvalente située au sein de la résidence Universiapolis. Animé par des coachs professionnels, le club permet aux étudiants et aux autres membres de pratiquer différentes activités sportives (Biking, Body Pump, Boxing et autres animations).',
      imageUrl: '/assets/images/sport.jpg',
    },
    {
      title: 'Agence Canal M',
      description:
        'Pour faciliter les transferts d’argents vers les étudiants, une agence Canal M est installée à l’entrée de la résidence. Rapidité, proximité et sécurité sont les principaux avantages de disposer d’une telle agence au sein du campus.',
      imageUrl: '/assets/images/agence.jpg',
    },
  ];
  RESIDENCIES = RESIDENCIES;

  

  constructor() {
    this.selectedType = this.accommodationTypes[0]; // Initialize with V.I.P
  }

  selectType(type: AccommodationType) {
    this.selectedType = type;
  }

  nextResidence(): void {
    this.isTransitioning = true;
    setTimeout(() => {
      this.selectedResidence =
        (this.selectedResidence + 1) % this.RESIDENCIES.length;
      this.isTransitioning = false;
    }, 300);
  }

  previousResidence(): void {
    this.isTransitioning = true;
    setTimeout(() => {
      this.selectedResidence =
        (this.selectedResidence - 1 + this.RESIDENCIES.length) %
        this.RESIDENCIES.length;
      this.isTransitioning = false;
    }, 300);
  }

  selectResidence(index: number): void {
    if (index === this.selectedResidence) return;
    this.isTransitioning = true;
    setTimeout(() => {
      this.selectedResidence = index;
      this.isTransitioning = false;
    }, 300);
  }
}
