import { trigger, state, style, transition, animate } from "@angular/animations";

export const adminLoginAnim = [
  trigger("loginAnim", [
    state(
      "hide",
      style({
        height: 0,
        transform: "scale(0)",
        opacity: 0,
      })
    ),
    state(
      "show",
      style({
        height: "*",
        transform: "scale(1)",
        opacity: 1,
      })
    ),
    transition("hide <=> show", [animate("300ms ease-in")]),
  ]),
];
