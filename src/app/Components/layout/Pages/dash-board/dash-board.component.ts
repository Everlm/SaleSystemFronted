import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { DashBoardService } from 'src/app/Services/dash-board.service';
Chart.register(...registerables);

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit {

  totalIncome: string = "0";
  totalSale: string = "0";
  totalProducts: string = "0";

  constructor(
    private _dashboardService: DashBoardService
  ) { }

  showGraph(labelGraph: any[], dataGraph: any[]) {
    const chartBars = new Chart('chartBars', {
      type: 'bar',
      data: {
        labels: labelGraph,
        datasets: [{
          label: "#sales",
          data: dataGraph,
          backgroundColor: [
            'rgba(54,162,235,0.2)'
          ],
          borderColor: [
            'rgba(54,162,235,1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  ngOnInit(): void {
    this._dashboardService.GetDashBoard().subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.totalIncome = response.data.totalIncome;
          this.totalSale = response.data.totalSale;
          this.totalProducts = response.data.totalProducts;

          const arrayData: any[] = response.data.weekSale;
          const labelTemp = arrayData.map((value) => value.date);
          const dataTemp = arrayData.map((value) => value.total);
          console.log(labelTemp, dataTemp);

          this.showGraph(labelTemp, dataTemp);
        }
      },
      error: (e) => { console.log(e) }
    })
  }

}
