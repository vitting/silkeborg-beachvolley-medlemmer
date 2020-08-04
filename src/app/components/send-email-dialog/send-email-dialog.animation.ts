import { trigger, state, style, transition, animate } from "@angular/animations";

export const sendEmailDialogAnim = [
  trigger("variablesAnim", [
    state(
      "show",
      style({
        transform: "scale(1)",
        opacity: 0.9,
      })
    ),
    state(
      "hide",
      style({
        transform: "scale(0)",
        opacity: 0,
      })
    ),
    transition("hide <=> show", [animate("300ms ease-in")]),
  ]),
  trigger("variablesButtonAnim", [
    state(
      "show",
      style({
        transform: "scale(0.8)",
        opacity: 1,
      })
    ),
    state(
      "hide",
      style({
        transform: "scale(0)",
        opacity: 0,
      })
    ),
    transition("hide <=> show", [animate("300ms ease-in")]),
  ]),
];
