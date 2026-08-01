import 'zone.js';
import './styles.css';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([]),
  ],
}).catch(err => {
  console.error('[Angular bootstrap error]', err);
  document.body.innerHTML = '<div style="color:red;padding:2rem;">' + (err?.message || err) + '</div>';
});
