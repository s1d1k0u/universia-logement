// modal.component.ts
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('150ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('150ms', style({ opacity: 0 }))]),
    ]),
  ],
  template: `
    <div
      *ngIf="isOpen"
      @fadeInOut
      class="w-full fixed inset-0 bg-black/75 flex items-center justify-center z-50"
      (click)="closeOnBackdrop($event)"
    >
      <div
        class="bg-white rounded-lg shadow-xl p-6 w-full md:max-w-4xl mx-4 relative"
      >
        <!-- Header -->
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold text-gray-900">{{ title }}</h2>
        </div>

        <!-- Content -->
        <div class="text-gray-600">
          <ng-content></ng-content>
          <!--Rules Acceptance-->
          <form
            [formGroup]="rulesForm"
            (ngSubmit)="confirm()"
            class="flex flex-col gap-4 mt-6 order-2"
          >
            <div class="flex items-center gap-x-2">
              <input
                type="checkbox"
                id="rulesAcceptance"
                formControlName="rulesAcceptance"
                class="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <label for="rulesAcceptance" class="text-sm text-gray-700">
                J'ai lu et j'accepte le règlement intérieur
              </label>
            </div>
            <div class="mt-4 text-sm text-gray-500">
              Pour toute question concernant le règlement, contactez notre
              service client.
            </div>
            <div class="mt-6 flex justify-end space-x-3">
              <button
                (click)="close()"
                class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Annuler
              </button>
              <button
                [disabled]="!rulesForm.valid || false"
                type="submit"
                class="px-4 py-2 text-sm font-medium text-white bg-violet-600 disabled:bg-violet-600/45 cursor-pointer disabled:cursor-not-allowed rounded-md hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
              >
                Accepter
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
})
export default class ModalComponent {
  @Input() isOpen = false;
  @Input() title = '';
  @Input() showConfirm = true;
  @Output() closeModal = new EventEmitter<boolean>();
  @Output() confirmModal = new EventEmitter<boolean>();

  acceptRules = false;
  fb: FormBuilder = inject(FormBuilder);
  rulesForm: FormGroup = this.fb.group({
    rulesAcceptance: [false, Validators.requiredTrue],
  });

  close() {
    this.closeModal.emit(false);
  }

  confirm() {
    if (this.rulesForm.valid) {
      this.confirmModal.emit(true);
      this.close();
    }
  }

  closeOnBackdrop(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }
}
