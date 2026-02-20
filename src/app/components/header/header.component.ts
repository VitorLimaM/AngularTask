import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MaterialModule } from 'src/app/material/material.module';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output () public sideNavToggle = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  onToggleSidenav() {
    this.sideNavToggle.emit();
  }
}
