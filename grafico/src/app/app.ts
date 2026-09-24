import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  ngOnInit(): void {
    const dados = [
      { categoria: 'Eletrônicos', valor: 42 },
      { categoria: 'Games', valor: 28 },
      { categoria: 'Moda', valor: 19 },
      { categoria: 'Casa', valor: 15 },
      { categoria: 'Esportes', valor: 11 },
    ];

    const labels = dados.map(v => v.categoria);
    const valores = dados.map(v => v.valor);

    new Chart('barChart', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Categorias Mais Vendidas',
            data: valores,
            backgroundColor: '#111111',
            borderRadius: 6,
            maxBarThickness: 48,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              font: { family: 'Inter', size: 13, weight: 600 },
              color: '#111111',
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: '#f0f0f0' },
            ticks: { font: { family: 'Inter' }, color: '#6e6e73' }
          },
          x: {
            grid: { display: false },
            ticks: { font: { family: 'Inter' }, color: '#6e6e73' }
          }
        }
      }
    });
  }
}
