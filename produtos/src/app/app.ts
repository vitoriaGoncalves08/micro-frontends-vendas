import { Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

interface Produto {
  nome: string;
  valor: number;
  imagem: string;
}

@Component({
  selector: 'app-root',
  imports: [CurrencyPipe],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  produtos: Produto[] = [
    {
      nome: 'Notebook Ultra Slim',
      valor: 4999.9,
      imagem: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop'
    },
    {
      nome: 'Smartphone Pro',
      valor: 3299.0,
      imagem: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop'
    },
    {
      nome: 'Fone de Ouvido Bluetooth',
      valor: 349.5,
      imagem: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop'
    },
    {
      nome: 'Smartwatch Fit',
      valor: 899.9,
      imagem: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop'
    },
    {
      nome: 'Câmera Digital',
      valor: 2199.0,
      imagem: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop'
    },
    {
      nome: 'Teclado Mecânico RGB',
      valor: 459.9,
      imagem: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop'
    },
    {
      nome: 'Mouse Gamer',
      valor: 199.9,
      imagem: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=300&fit=crop'
    },
    {
      nome: 'Caixa de Som Bluetooth',
      valor: 279.0,
      imagem: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop'
    }
  ];
}
