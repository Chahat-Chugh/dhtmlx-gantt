import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { gantt } from 'dhtmlx-gantt';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'gantt',
  styleUrls: ['./gantt.component.css'],
  template: `<div #gantt_here class="gantt-chart"></div>`,
})
export class GanttComponent implements OnInit {
  @ViewChild('gantt_here', { static: true }) ganttContainer!: ElementRef;
  tasks: Object[] = [];

  async ngOnInit() {
    gantt.config.date_format = '%Y-%m-%d %H:%i';

    gantt.init(this.ganttContainer.nativeElement);

    await fetch('./assets/data.json', {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then(function (response) {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    }).then(function (data) {
        //Load the data as new DataSource
        gantt.parse(data);
    }).catch(function (error) {
        alert(error.message);
    });
  }
}
