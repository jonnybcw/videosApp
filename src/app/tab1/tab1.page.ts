import { IFilme } from './../models/IFilme.model';
import { DadosService } from './../services/dados.service';
import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  titulo = 'Vídeos App';

  listaFilmes: IFilme[] = [
    {
      nome: 'Viúva Negra (2021)',
      lancamento: '08/07/2021',
      duracao: '2h 13m',
      classificacao: 78,
      cartaz: 'https://www.themoviedb.org/t/p/w1280/rKq1Vlw0Bqe2EEvdmIkkkgPQAGf.jpg',
      generos: [
        'Ação', 'Aventura', 'Thriller', 'Ficção científica'
      ],
      pagina: '/mortal-kombat'
    },
    {
      nome: 'O Esquadrão Suicida (2021)',
      lancamento: '05/08/2021',
      duracao: '2h 12m',
      classificacao: 82,
      cartaz: 'https://www.themoviedb.org/t/p/w1280/wTS3dS2DJiMFFgqKDz5fxMTri.jpg',
      generos: [
        'Ação', 'Aventura', 'Fantasia'
      ],
      pagina: '/liga-justica'
    }
  ];

  constructor(
    public alertController: AlertController,
    public toastController: ToastController,
    public dadosService: DadosService,
    public route: Router
    ) {}

  exibirFilme(filme: IFilme){
    this.dadosService.guardarDados('filme', filme);
    this.route.navigateByUrl('/dados-filme');
  }

  async exibirAlertaFavorito() {
    const alert = await this.alertController.create({
      header: 'Alerta!',
      message: 'Deseja realmente favoritar o filme?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Sim, favoritar!',
          handler: () => {
            this.exibirToast();
          }
        }
      ]
    });

    await alert.present();
  }

  async exibirToast() {
    const toast = await this.toastController.create({
      message: 'Filme adicionado aos favoritos.',
      duration: 2000,
      color: 'success'
    });
    toast.present();
  }

}
