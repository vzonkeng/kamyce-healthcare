import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone:true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  successMessage = '';
  errorMessage = '';
  isLoading = false;
  whatsappNumber = '+32484484598'; // remplace par ton numéro
   contactForm: any;

 

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern('^[0-9]{9,15}$')]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });
  }

  onSubmit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.successMessage = '';
    this.errorMessage = '';

    try {
      const { name, email, phone, message } = this.contactForm.value;

      const text = `Bonjour,\n\nNom: ${name}\nEmail: ${email}\nTéléphone: ${phone}\nMessage: ${message}`;
      const url = `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(text!)}`;

      setTimeout(() => {
        window.open(url, '_blank');
        this.successMessage = "Votre message a bien été envoyé. Nous vous contacterons rapidement.";
        this.contactForm.reset();
        this.isLoading = false;
      }, 1000);
    } catch (error) {
      this.isLoading = false;
      this.errorMessage = "Une erreur est survenue lors de l’envoi. Veuillez réessayer.";
    }
  }

  sendEmail() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.successMessage = '';
    this.errorMessage = '';

    try {
      const { name, email, phone, message } = this.contactForm.value;
      const subject = 'Demande de contact';
      const body = `Nom: ${name}\nEmail: ${email}\nTéléphone: ${phone}\n\nMessage:\n${message}`;
      const mailtoLink = `mailto:tonemail@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body!)}`;

      setTimeout(() => {
        window.location.href = mailtoLink;
        this.successMessage = "Votre message a bien été envoyé par email. Merci pour votre confiance.";
        this.contactForm.reset();
        this.isLoading = false;
      }, 1000);
    } catch (error) {
      this.isLoading = false;
      this.errorMessage = "Impossible d’envoyer le message pour le moment. Veuillez réessayer plus tard.";
    }
  }

  get f() {
    return this.contactForm.controls;
  }
}
