import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "../../core/components/footer/footer.component";

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.scss'],
  standalone: true,
  imports: [CommonModule, FooterComponent]
})
export class OfferDetailsComponent implements OnInit {
  offer: any = {
    title: 'Développeur Full Stack Senior',
    company: 'Tech Solutions Inc.',
    location: 'Paris, France',
    type: 'CDI',
    salary: '45 000€ - 65 000€',
    experience: '5+ ans',
    postedDate: '2024-03-30',
    description: `
      <p>Nous recherchons un Développeur Full Stack Senior passionné et expérimenté pour rejoindre notre équipe et contribuer au développement de nos applications web et mobiles. Vous interviendrez sur l'ensemble du cycle de développement, de la conception à la mise en production, en passant par l'optimisation et la maintenance des solutions existantes.</p>

      <h3>🎯 Missions principales</h3>
      <ul>
        <li>Concevoir, développer et maintenir des applications web et mobiles performantes, sécurisées et évolutives.</li>
        <li>Participer aux choix technologiques et aux décisions d'architecture logicielle.</li>
        <li>Développer des API et des microservices robustes pour assurer l'interopérabilité entre les systèmes.</li>
        <li>Assurer la qualité du code via des tests unitaires et d'intégration (TDD, CI/CD).</li>
        <li>Optimiser les performances et la sécurité des applications.</li>
        <li>Encadrer et accompagner les développeurs juniors en partageant votre expertise.</li>
        <li>Collaborer avec les équipes produit, design et infrastructure pour garantir une expérience utilisateur optimale.</li>
        <li>Assurer une veille technologique continue et proposer des améliorations techniques.</li>
      </ul>

      <p>Vous travaillerez sur des projets stimulants pour des clients internationaux, avec une stack technique moderne incluant Angular, Node.js, et les services cloud AWS.</p>
    `,
    requirements: [
      'Maîtrise des technologies Front-end (Angular, React)',
      'Expérience en Back-end (Node.js, Python)',
      'Connaissance des bases de données (PostgreSQL, MongoDB)',
      'Expérience en développement cloud (AWS, Azure)',
      'Capacité à travailler en équipe et à communiquer efficacement'
    ],
    benefits: [
      'Télétravail flexible (3 jours/semaine)',
      'Mutuelle 100% prise en charge',
      'Tickets restaurant (12€/jour)',
      'Budget formation annuel de 2000€',
      'RTT et 25 jours de congés payés',
      'Prime de participation et intéressement',
      'Équipement dernière génération'
    ],
    companyInfo: {
      name: 'Tech Solutions Inc.',
      description: `Tech Solutions Inc. est une entreprise leader dans le développement de solutions numériques innovantes, spécialisée dans la transformation digitale des grandes entreprises.

Fondée en 2015, notre société a connu une croissance rapide grâce à notre expertise technique pointue et notre engagement envers l'innovation. Nous accompagnons aujourd'hui plus de 50 clients majeurs dans leur transformation numérique.

Notre culture d'entreprise est basée sur l'innovation, la collaboration et le développement personnel. Nous encourageons fortement le partage de connaissances et l'apprentissage continu à travers des formations régulières et des événements tech internes.`,
      size: '150-200 employés',
      industry: 'Services et Conseil IT'
    },
    applicationProcess: {
      steps: [
        'Entretien téléphonique avec un recruteur (30 min)',
        'Test technique à réaliser à la maison (2-3h)',
        'Entretien technique avec l\'équipe (1h)',
        'Entretien final avec le CTO (45 min)'
      ],
      deadline: '2024-04-30'
    }
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log('ID de l\'offre:', params['id']);
    });
  }
} 