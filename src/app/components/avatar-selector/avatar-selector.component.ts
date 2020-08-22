import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-avatar-selector',
  templateUrl: './avatar-selector.component.html',
  styleUrls: ['./avatar-selector.component.scss'],
})
export class AvatarSelectorComponent implements OnInit {

  @Output() avatarSel = new EventEmitter<string>();
  @Input() avatarActual = 'av-1.png';
  // @Input() set selectedAvatar(val: string) {
  //   console.log('Nuevo avatar', val);
  // }

  avatars = [
    {
      img: 'av-1.png',
      seleccionado: true
    },
    {
      img: 'av-2.png',
      seleccionado: false
    },
    {
      img: 'av-3.png',
      seleccionado: false
    },
    {
      img: 'av-4.png',
      seleccionado: false
    },
    {
      img: 'av-5.png',
      seleccionado: false
    },
    {
      img: 'av-6.png',
      seleccionado: false
    },
    {
      img: 'av-7.png',
      seleccionado: false
    },
    {
      img: 'av-8.png',
      seleccionado: false
    },
  ];

  avatarSlide = {
    slidesPerView: 3.5
  };

  constructor() { }

  ngOnInit() {
    if (this.avatarActual) {
      this.avatars.forEach(av => av.seleccionado = false);

      const avatar = this.avatars.find(av => av.img === this.avatarActual)
      if (avatar) {
        avatar.seleccionado = true;
      }
    }
  }

  seleccionarAvatar(avatar) {
    this.avatars.forEach(av => av.seleccionado = false);
    avatar.seleccionado = true;

    console.log('avatar.img', avatar.img);
    this.avatarSel.emit(avatar.img);
  }

}
