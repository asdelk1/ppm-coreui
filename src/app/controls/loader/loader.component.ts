import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {LoaderService} from '../../services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  loading: boolean;

  @Output()
  public isLoading: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private loaderService: LoaderService) {

    this.loaderService.isLoading.subscribe((v) => {
      console.log(v);
      this.loading = v;
      this.isLoading.emit(v);
    });

  }

  ngOnInit(): void {
  }

}
