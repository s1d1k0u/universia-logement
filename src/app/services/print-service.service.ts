import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PrintServiceService {
  printSelection(contentId: string) {
    console.log(contentId);

    const contentToPrint = document.getElementById(contentId)?.innerHTML;
    console.log(contentToPrint);
    if (!contentToPrint) {
      return;
    }

    const originalBody = document.body.innerHTML;
    document.body.innerHTML = contentToPrint;
    window.print();
    document.body.innerHTML = originalBody;
    location.reload();
  }

  constructor() {}
}
