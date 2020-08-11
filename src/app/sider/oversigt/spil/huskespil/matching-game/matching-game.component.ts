import { Component, OnInit, Input, ContentChild, TemplateRef, EventEmitter, Output} from '@angular/core';
import { Subscription, Subject, merge, Observable } from 'rxjs';
import { pairwise, filter, partition, map} from "rxjs/operators";
import { Pair } from '../pair';

@Component({
  selector: 'app-matching-game',
  templateUrl: './matching-game.component.html',
  styleUrls: ['./matching-game.component.css']
})

export class MatchingGameComponent implements OnInit {

  @Input() pairs: Pair[];
  
  @Output() leftpartSelected = new EventEmitter<number>();
  @Output() rightpartSelected = new EventEmitter<number>();
  @Output() leftpartUnselected = new EventEmitter();
  @Output() rightpartUnselected = new EventEmitter();
  
  @ContentChild('leftpart', {static: false}) leftpart_temp: TemplateRef<any>;
  @ContentChild('rightpart', {static: false}) rightpart_temp: TemplateRef<any>;
  
  private solvedPairs: Pair[] = [];
  private unsolvedPairs: Pair[] = [];
  
  test: number;
  
  private assignmentStream = new Subject<{pair:Pair, side:string}>();
  
  private solvedStream = new Observable<Pair>();
  private failedStream = new Observable<string>();
  
  private s_Subscription: Subscription;
  private f_Subscription: Subscription;
  
  constructor() { }

  ngOnInit() {
	  
	for(let i=0; i<this.pairs.length; i++){
		
		this.unsolvedPairs.push(this.pairs[i]);
	}
	
	//TODO: Anwendung von Stream-Operatoren auf
	//leftpartClicked und rightpartClicked
	
	const stream = this.assignmentStream.pipe(
							pairwise(),
							filter(comb => comb[0].side != comb[1].side),
				   );
			
    //pipe-Notation führt zu einer Fehlermeldung (Angular 8.2.2, RxJS 6.4.0)			
	const [stream1, stream2] = partition(comb => comb[0].pair === comb[1].pair)(stream);
				
    this.solvedStream = stream1.pipe(	
							map(comb => comb[0].pair)
						);

    this.failedStream = stream2.pipe(	
							map(comb => comb[0].side)
						);
	
	this.s_Subscription = this.solvedStream.subscribe(pair => this.handleSolvedAssignment(pair));
	
	this.f_Subscription = this.failedStream.subscribe(side => this.handleFailedAssignment(side));
  }
  
  ngOnDestroy() {
	  
	  this.s_Subscription.unsubscribe();
	  this.f_Subscription.unsubscribe();
  }
  
  private handleSolvedAssignment(pair: Pair):void{
	  
	this.solvedPairs.push(pair);	  
	this.remove(this.unsolvedPairs, pair);
	
	this.leftpartUnselected.emit();
	this.rightpartUnselected.emit();
	
	//workaround, um Aktualisierung der shuffle-Pipe zu erzwingen
	this.test = Math.random() * 10;
	  
  }
  
  private handleFailedAssignment(side1: string):void{
	  
	if(side1=="left"){		
		this.leftpartUnselected.emit();		
    }else{			
		this.rightpartUnselected.emit();
	}  
  }
  
  private remove(array: Pair[], pair:Pair){
	  
	  let index = array.indexOf(pair);
	  
	  if(index > -1){
		  
		  array.splice(index, 1);
	  }
  }

}
