import { Animation } from '@ionic/core';

export function modalAlertEnter(AnimationC: Animation, baseEl: HTMLElement): Promise<Animation> {
  const baseAnimation = new AnimationC();

  const backdropAnimation = new AnimationC();
  backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));

  const wrapperAnimation = new AnimationC();
  wrapperAnimation.addElement(baseEl.querySelector('.modal-wrapper'));

  wrapperAnimation
    .beforeStyles({ opacity: 1, transform: 'none' })
    .fromTo('opacity', 0.01, 1)
    .fromTo('scale', '1.1', '1');

  backdropAnimation.fromTo('opacity', 0.01, 0.3);

  return Promise.resolve(
    baseAnimation
      .addElement(baseEl)
      .easing('cubic-bezier(0.36,0.66,0.04,1)')
      .duration(200)
      .beforeAddClass('show-modal')
      .add(backdropAnimation)
      .add(wrapperAnimation)
  );
}

export function modalAlertLeave(AnimationC: Animation, baseEl: HTMLElement): Promise<Animation> {
  const baseAnimation = new AnimationC();

  const backdropAnimation = new AnimationC();
  backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));

  const wrapperAnimation = new AnimationC();
  const wrapperEl = baseEl.querySelector('.modal-wrapper');
  wrapperAnimation.addElement(wrapperEl);
  // const wrapperElRect = wrapperEl!.getBoundingClientRect();

  wrapperAnimation
    .beforeStyles({ translateY: 0 })
    .fromTo('opacity', 0.99, 0)
    .fromTo('scale', 1, 0.9);

  backdropAnimation.fromTo('opacity', 0.3, 0.0);

  return Promise.resolve(
    baseAnimation
      .addElement(baseEl)
      .easing('ease-out')
      .duration(200)
      .add(backdropAnimation)
      .add(wrapperAnimation)
  );
}
