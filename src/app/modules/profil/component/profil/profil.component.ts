import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';

// PrimeNG
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { TimelineModule } from 'primeng/timeline';
import { CardModule } from 'primeng/card';
import { RatingModule } from 'primeng/rating';
import { FileUploadModule } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { PasswordModule } from 'primeng/password';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { TextareaModule } from 'primeng/textarea';

interface Profile {
  civility: string;
  firstName: string;
  lastName: string;
  birthDate: Date | null;
  phoneNumber: string;
  email: string;
  password: string;
  country: string;
  location: string;
  studyField: string;
  educationType: string;
  educationLevel: string;
  summary: string;
  photoUrl: string;
  website?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  mobile?: string;
}

interface Experience {
  position: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Education {
  degree: string;
  school: string;
  year: string;
}

interface Skill {
  name: string;
  rating: number;
}

interface DiversItem {
  title: string;
  description: string;
}

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AvatarModule,
    ButtonModule,
    InputTextModule,
    CalendarModule,
    DropdownModule,
    EditorModule,
    TimelineModule,
    CardModule,
    RatingModule,
    FileUploadModule,
    ToastModule,
    DialogModule,
    PasswordModule,
    MenuModule,
    TextareaModule
  ],
  providers: [MessageService, ConfirmationService]
})
export class ProfilComponent implements OnInit {
  title = 'profil';
  items: MenuItem[] = [];
  activeItem: MenuItem | undefined;
  civilityControl = new FormControl('');
  firstNameControl = new FormControl('');
  lastNameControl = new FormControl('');
  birthDateControl = new FormControl<Date | null>(null);
  phoneNumberControl = new FormControl('');
  emailControl = new FormControl('');
  passwordControl = new FormControl('');
  countryControl = new FormControl('');
  locationControl = new FormControl('');
  studyFieldControl = new FormControl('');
  educationTypeControl = new FormControl('');
  educationLevelControl = new FormControl('');
  summaryControl = new FormControl('');
  skillRatings: FormControl[] = [];
  cvFileControl = new FormControl(null);
  docsFileControl = new FormControl(null);

  showPasswordModal = false;
  currentPassword = '';
  newPassword = '';
  confirmPassword = '';

  showEditModal = false;
  currentEditSection = '';

  showExperienceModal = false;
  showEducationModal = false;
  showSkillModal = false;

  currentExperience: any = {};
  currentEducation: any = {};

  photoUrl: string = '/public/picture/pdp.jpg';
  
  profile: Profile = {
    civility: '',
    firstName: '',
    lastName: '',
    birthDate: null,
    phoneNumber: '',
    email: '',
    password: '',
    country: '',
    location: '',
    studyField: '',
    educationType: '',
    educationLevel: '',
    summary: '',
    photoUrl: '/public/picture/pdp.jpg'
  };

  experiences: Experience[] = [];
  educations: Education[] = [];
  skills: string[] = [];
  mainSkills: Skill[] = [];
  civilities: any[] = [
    { label: 'M.', value: 'M.' },
    { label: 'Mme', value: 'Mme' },
    { label: 'Autre', value: 'Autre' }
  ];

  countries: any[] = [
    { label: 'France', value: 'France' },
    { label: 'Belgique', value: 'Belgique' },
    { label: 'Suisse', value: 'Suisse' },
    { label: 'Canada', value: 'Canada' },
    { label: 'Madagascar', value: 'Madagascar' }
  ];

  cities: any[] = [
    { label: 'Paris', value: 'Paris' },
    { label: 'Lyon', value: 'Lyon' },
    { label: 'Marseille', value: 'Marseille' },
    { label: 'Toulouse', value: 'Toulouse' },
    { label: 'Bordeaux', value: 'Bordeaux' }
  ];

  studyFields: any[] = [
    { label: 'Informatique', value: 'Informatique' },
    { label: 'Commerce', value: 'Commerce' },
    { label: 'Ingénierie', value: 'Ingénierie' },
    { label: 'Médecine', value: 'Médecine' },
    { label: 'Droit', value: 'Droit' }
  ];

  educationTypes: any[] = [
    { label: 'Formation initiale', value: 'Formation initiale' },
    { label: 'Formation continue', value: 'Formation continue' },
    { label: 'Alternance', value: 'Alternance' },
    { label: 'Apprentissage', value: 'Apprentissage' }
  ];

  educationLevels: any[] = [
    { label: 'Bac', value: 'Bac' },
    { label: 'Bac+2', value: 'Bac+2' },
    { label: 'Bac+3', value: 'Bac+3' },
    { label: 'Bac+5', value: 'Bac+5' },
    { label: 'Bac+8', value: 'Bac+8' }
  ];

  newSkill: string = '';

  showDiversModal = false;
  currentDivers: DiversItem = { title: '', description: '' };
  divers: DiversItem[] = [];

  showSocialModal = false;

  constructor(
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loadProfile();
    this.updateFormControls();
    this.items = [
      { label: 'Tableau de bord', icon: 'pi pi-fw pi-home', command: () => this.router.navigate(['/profil']) },
      { label: 'Déconnexion', icon: 'pi pi-fw pi-power-off', command: () => this.logout() }
    ];
    
    this.activeItem = this.items[0];
  }

  loadProfile(): void {
    // TODO: Implémenter le chargement du profil depuis l'API
    this.profile = {
      civility: 'M.',
      firstName: 'Jean',
      lastName: 'Dupont',
      birthDate: new Date('1990-01-01'),
      phoneNumber: '0612345678',
      email: 'jean.dupont@email.com',
      password: '********',
      country: 'France',
      location: 'Paris',
      studyField: 'Informatique',
      educationType: 'Formation initiale',
      educationLevel: 'Bac+5',
      summary: 'Développeur Full Stack avec 5 ans d\'expérience spécialisé dans les technologies Angular et Node.js. Passionné par la création d\'applications web performantes et intuitives. Je recherche actuellement de nouvelles opportunités pour relever des défis techniques et contribuer à des projets innovants.',
      photoUrl: 'assets/images/avatar-placeholder.png'
    };

    this.experiences = [
      {
        position: 'Développeur Full Stack',
        company: 'TechCorp',
        startDate: 'Jan 2018',
        endDate: 'Déc 2023',
        description: 'Développement d\'applications web et mobiles. Mise en place d\'architectures microservices, intégration continue et déploiement automatisé.'
      },
      {
        position: 'Développeur Front-End',
        company: 'WebAgency',
        startDate: 'Mai 2015',
        endDate: 'Déc 2017',
        description: 'Conception et développement d\'interfaces utilisateur réactives et accessibles pour divers clients.'
      }
    ];

    this.educations = [
      {
        degree: 'Master en Informatique',
        school: 'Université Paris-Saclay',
        year: '2015'
      },
      {
        degree: 'Licence en Informatique',
        school: 'Université de Lyon',
        year: '2013'
      }
    ];

    this.skills = ['Angular', 'React', 'Node.js', 'TypeScript', 'MongoDB', 'Docker', 'Git'];
    this.mainSkills = [
      { name: 'Angular', rating: 4 },
      { name: 'React', rating: 3 },
      { name: 'Node.js', rating: 4 },
      { name: 'TypeScript', rating: 5 },
      { name: 'MongoDB', rating: 3 },
      { name: 'Docker', rating: 3 }
    ];
  }

  updateFormControls(): void {
    this.civilityControl.setValue(this.profile.civility);
    this.firstNameControl.setValue(this.profile.firstName);
    this.lastNameControl.setValue(this.profile.lastName);
    if (this.profile.birthDate) {
      this.birthDateControl.setValue(this.profile.birthDate);
    }
    this.phoneNumberControl.setValue(this.profile.phoneNumber);
    this.emailControl.setValue(this.profile.email);
    this.passwordControl.setValue(this.profile.password);
    this.countryControl.setValue(this.profile.country);
    this.locationControl.setValue(this.profile.location);
    this.studyFieldControl.setValue(this.profile.studyField);
    this.educationTypeControl.setValue(this.profile.educationType);
    this.educationLevelControl.setValue(this.profile.educationLevel);
    this.summaryControl.setValue(this.profile.summary);
    
    // this.skillRatings = this.mainSkills.map(skill => new FormControl(skill.rating));
  }

  showPasswordDialog(): void {
    this.currentPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';
    this.showPasswordModal = true;
  }

  updatePassword(): void {
    // Validation des champs
    if (!this.currentPassword) {
      this.showError('Veuillez saisir votre mot de passe actuel');
      return;
    }

    if (!this.newPassword) {
      this.showError('Veuillez saisir un nouveau mot de passe');
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.showError('Les mots de passe ne correspondent pas');
      return;
    }

    // TODO: Intégrer avec l'API pour mettre à jour le mot de passe
    this.showSuccess('Mot de passe mis à jour avec succès');
    this.showPasswordModal = false;
  }

  editSection(section: string): void {
    this.currentEditSection = section;
    this.showEditModal = true;
  }

  saveSection(): void {
    // Mise à jour des données selon la section éditée
    if (this.currentEditSection === 'about') {
      this.profile.summary = this.summaryControl.value || '';
    } else if (this.currentEditSection === 'personal') {
      this.profile.civility = this.civilityControl.value || '';
      this.profile.firstName = this.firstNameControl.value || '';
      this.profile.lastName = this.lastNameControl.value || '';
      this.profile.birthDate = this.birthDateControl.value;
    }

    this.showSuccess('Informations mises à jour avec succès');
    this.showEditModal = false;
  }

  updatePhoto(): void {
    // Ouvrir un sélecteur de fichier
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        // TODO: Implémenter le téléchargement de la photo
        // Pour l'instant, simulons un succès
        this.showSuccess('Photo de profil mise à jour');
      }
    };
    fileInput.click();
  }

  addExperience(): void {
    this.experiences.unshift({
      position: 'Nouveau poste',
      company: 'Nouvelle entreprise',
      startDate: 'Date de début',
      endDate: 'Date de fin',
      description: 'Description du poste'
    });
    
    this.showSuccess('Expérience ajoutée. Veuillez modifier les détails.');
  }

  addEducation(): void {
    this.educations.unshift({
      degree: 'Nouveau diplôme',
      school: 'Nouvelle école',
      year: 'Année'
    });
    
    this.showSuccess('Formation ajoutée. Veuillez modifier les détails.');
  }

  onCvUpload(event: any): void {
    // Récupérer le fichier depuis l'événement input
    const file = event.target.files[0];
    if (file) {
      this.cvFileControl.setValue(file);
      console.log('CV uploadé:', file.name);
      this.showSuccess(`Votre CV "${file.name}" a été uploadé avec succès`);
    }
  }

  onDocumentUpload(event: any): void {
    // Récupérer les fichiers depuis l'événement input
    const files = event.target.files;
    if (files && files.length > 0) {
      this.docsFileControl.setValue(files);
      console.log('Documents uploadés:', files.length);
      this.showSuccess(`${files.length} document(s) ont été uploadés avec succès`);
    }
  }

  saveProfile(): void {
    this.profile.civility = this.civilityControl.value || '';
    this.profile.firstName = this.firstNameControl.value || '';
    this.profile.lastName = this.lastNameControl.value || '';
    this.profile.birthDate = this.birthDateControl.value;
    this.profile.phoneNumber = this.phoneNumberControl.value || '';
    this.profile.email = this.emailControl.value || '';
    this.profile.password = this.passwordControl.value || '';
    this.profile.country = this.countryControl.value || '';
    this.profile.location = this.locationControl.value || '';
    this.profile.studyField = this.studyFieldControl.value || '';
    this.profile.educationType = this.educationTypeControl.value || '';
    this.profile.educationLevel = this.educationLevelControl.value || '';
    this.profile.summary = this.summaryControl.value || '';
    
    this.mainSkills.forEach((skill, index) => {
      if (this.skillRatings[index]) {
        skill.rating = this.skillRatings[index].value || 0;
      }
    });
    
    // TODO: Implémenter la sauvegarde du profil vers l'API
    this.showSuccess('Votre profil a été mis à jour avec succès');
  }

  showSuccess(message: string): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Succès',
      detail: message
    });
  }

  showError(message: string): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Erreur',
      detail: message
    });
  }

  showExperienceDialog(experience?: any) {
    this.currentExperience = experience ? {...experience} : {
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: ''
    };
    this.showExperienceModal = true;
  }

  saveExperience() {
    // Validation des champs obligatoires
    if (!this.currentExperience.company || !this.currentExperience.position || !this.currentExperience.startDate) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Veuillez remplir tous les champs obligatoires'
      });
      return;
    }
    
    // Vérifier si c'est une mise à jour ou un ajout
    const existingIndex = this.experiences.findIndex(e => 
      e.company === this.currentExperience.company && 
      e.position === this.currentExperience.position);
    
    if (existingIndex >= 0) {
      // Mise à jour d'une expérience existante
      this.experiences[existingIndex] = {...this.currentExperience};
    } else {
      // Ajout d'une nouvelle expérience
      this.experiences.push({...this.currentExperience});
    }
    
    this.messageService.add({
      severity: 'success',
      summary: 'Succès',
      detail: 'Expérience enregistrée avec succès'
    });
    
    this.showExperienceModal = false;
  }

  showEducationDialog(education?: any) {
    this.currentEducation = education ? {...education} : {
      school: '',
      degree: '',
      year: ''
    };
    this.showEducationModal = true;
  }

  saveEducation() {
    // Validation des champs obligatoires
    if (!this.currentEducation.school || !this.currentEducation.degree || !this.currentEducation.year) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Veuillez remplir tous les champs obligatoires'
      });
      return;
    }
    
    // Vérifier si c'est une mise à jour ou un ajout
    const existingIndex = this.educations.findIndex(e => 
      e.school === this.currentEducation.school && 
      e.degree === this.currentEducation.degree);
    
    if (existingIndex >= 0) {
      // Mise à jour d'une formation existante
      this.educations[existingIndex] = {...this.currentEducation};
    } else {
      // Ajout d'une nouvelle formation
      this.educations.push({...this.currentEducation});
    }
    
    this.messageService.add({
      severity: 'success',
      summary: 'Succès',
      detail: 'Formation enregistrée avec succès'
    });
    
    this.showEducationModal = false;
  }

  addSkill(skill: string): void {
    if (skill && !this.skills.includes(skill)) {
      this.skills.push(skill);
      this.messageService.add({
        severity: 'success',
        summary: 'Succès',
        detail: 'Compétence ajoutée avec succès'
      });
    }
  }

  removeSkill(index: number) {
    this.skills.splice(index, 1);
    this.messageService.add({
      severity: 'info',
      summary: 'Info',
      detail: 'Compétence supprimée'
    });
  }

  logout() {
    // Logique de déconnexion
    this.router.navigate(['/login']);
  }

  addSkillFromModal(): void {
    if (this.newSkill && !this.skills.includes(this.newSkill)) {
      this.skills.push(this.newSkill);
      this.messageService.add({
        severity: 'success',
        summary: 'Succès',
        detail: 'Compétence ajoutée avec succès'
      });
      this.newSkill = '';
      this.showSkillModal = false;
    } else if (this.skills.includes(this.newSkill)) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Attention',
        detail: 'Cette compétence existe déjà'
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Veuillez saisir une compétence'
      });
    }
  }

  openSkillDialog(): void {
    this.newSkill = '';
    this.showSkillModal = true;
  }

  openDiversDialog(): void {
    this.currentDivers = { title: '', description: '' };
    this.showDiversModal = true;
  }

  addDivers(): void {
    if (this.currentDivers.title.trim()) {
      this.divers.push({ ...this.currentDivers });
      this.messageService.add({
        severity: 'success',
        summary: 'Succès',
        detail: 'Élément ajouté avec succès'
      });
      this.showDiversModal = false;
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Veuillez saisir un titre'
      });
    }
  }

  removeDivers(index: number): void {
    this.divers.splice(index, 1);
    this.messageService.add({
      severity: 'info',
      summary: 'Info',
      detail: 'Élément supprimé'
    });
  }

  openSocialDialog(): void {
    this.showSocialModal = true;
  }

  saveSocialLinks(): void {
    // TODO: Implémenter la sauvegarde vers l'API
    this.messageService.add({
      severity: 'success',
      summary: 'Succès',
      detail: 'Réseaux sociaux mis à jour avec succès'
    });
    this.showSocialModal = false;
  }
}
