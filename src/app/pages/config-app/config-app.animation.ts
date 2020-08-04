import { trigger, state, style, transition, animate } from "@angular/animations";

export const fadeInAnim = [
  trigger("fadeInAnim", [
    state(
      "true",
      style({
        opacity: 1,
        height: "*",
      })
    ),
    state(
      "false",
      style({
        opacity: 0,
        height: "0",
      })
    ),
    transition("false <=> true", [animate("300ms ease-in")]),
  ]),
];
