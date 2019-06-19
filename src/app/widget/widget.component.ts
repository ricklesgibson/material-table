import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { WidgetsService} from '../widgets/widgets.service';
import { Widget} from '../widget';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css']
})
export class WidgetComponent implements OnInit {
  displayedColumns: string[] = ['title', 'description', 'price', 'date', 'edit', 'delete'];
  dataSource = new MatTableDataSource<any>();
  selectedWidget: Widget = new Widget();
  loading = false;

  constructor(public widgetService: WidgetsService) { }

  ngOnInit() {
    this.refresh();
  }
  async refresh() {
    this.loading = true;
    const data = await this.widgetService.getWidgets();
    this.dataSource.data = data;
    this.loading = false;
  }
  async updateWidget() {
    if (this.selectedWidget.id !== undefined) {
      await this.widgetService.updateWidget(this.selectedWidget);
    } else {
      await this.widgetService.createWidget(this.selectedWidget);
    }
    this.selectedWidget = new Widget();
    await this.refresh();
  }
  editWidget(widget: Widget) {
    this.selectedWidget = widget;
  }

  clearWidget() {
    this.selectedWidget = new Widget();
  }
  async deleteWidget(widget: Widget) {
    this.loading = true;
    if (confirm(`Are you sure you want to delete the widget ${widget.title}. This cannot be undone.`)) {
      this.widgetService.deleteWidget(widget.id);
    }
    await this.refresh();
  }


}
