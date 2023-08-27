import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit, OnDestroy{
  @Input()
  public textInput: string = '';

  @Input()
  public initialValue: string = '';

  @Output()
  public onValue: EventEmitter<string> = new EventEmitter();
  emitBusqueda(busqueda: string): void {
    this.onValue.emit(busqueda)
  }

  private debouncer: Subject<string> = new Subject<string>;


  @Output()
  public onDebounce: EventEmitter<string> = new EventEmitter();
  ngOnInit(): void {
  this.debouncer
      .pipe(
        debounceTime(1000)
      )
      .subscribe(busqueda => {
        this.onDebounce.emit(busqueda);
      });
  }

  onKeyPress(busqueda: string) {
    this.debouncer.next(busqueda);
  }

  ngOnDestroy(): void {
    this.debouncer.unsubscribe();
  }
}
