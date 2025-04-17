import { TotalReports } from './model/reports';
import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [CardModule, CommonModule, ChartModule],
})
export class ReportsComponent implements OnInit {
  totals = [
    new TotalReports('Total visit', 200000),
    new TotalReports('Total unique visit', 100),
    new TotalReports('Total users', 100),
    new TotalReports('Total offers', 100),
  ];

  pieData = {
    labels: ['offers', 'qualified'],
    datasets: [
      {
        data: [500, 50],
        backgroundColor: ['#0C9B6E', '#0C9B6A'],
        hoverBackgroundColor: ['#0C9B6E', '#0C9B6A'],
        borderWidth: 1
      },
    ],
  };

  pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'offers vs qualified',
      },
      layout: {
        padding: 20
      }
    },
  };

  constructor() {}

  ngOnInit() {}
}
