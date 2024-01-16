import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  breadcrumbItems = [];

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateBreadcrumb();
    });
  }

  private updateBreadcrumb(): void {
    this.breadcrumbItems = [];
    const currentUrl = this.router.url;
    const urlSegments = currentUrl.split('/');
    if (!urlSegments[2]) {
      this.breadcrumbItems.push({ label: "Dashboard", link: '/' });
    }
    const targetValue = urlSegments[2].replace(/-/g, ' ');
    const capitalizedLabel = targetValue.charAt(0).toUpperCase() + targetValue.slice(1).toLowerCase();
    this.breadcrumbItems.push({ label: capitalizedLabel, link: '/' + urlSegments.slice(1, 3).join('/') });
  }
}