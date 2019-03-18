import {
  trigger,
  transition,
  style,
  animate,
  AnimationTriggerMetadata,
} from '@angular/animations';

export const welightShimmerAnimations: AnimationTriggerMetadata = trigger(
  'fadeInOut',
  [
    transition('void => *', [
      style({ opacity: 0 }),
      animate('400ms', style({ opacity: 1 })),
    ]),
    transition('* => void', [
      style({ opacity: 1 }),
      animate('200ms', style({ opacity: 0 })),
    ]),
  ],
);
