import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'img[appImgfall]',
  standalone: true
})
export class ImgfallDirective {

  @Input() appImgfall: string|null = null;

  constructor(private eRef: ElementRef) {}

  @HostListener('error')
  loadFallbackOnError() {
    const element: HTMLImageElement = <HTMLImageElement>this.eRef.nativeElement;
    element.src = this.appImgfall || '/assets/image-placeholder.webp';
  }

}
