import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {
  image: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.image = this.route.snapshot.paramMap.get('id');
  }
}

