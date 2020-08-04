import { trigger, state, style, transition, animate } from "@angular/animations";

export const membershipAnimation = [
  trigger("membershipAnim", [
    state(
      "hide",
      style({
        height: "0",
        transform: "scale(0)"
      })
    ),
    state(
      "show",
      style({
        height: "*",
        transform: "scale(1)"
      })
    ),
    transition("hide <=> show", [
      animate("300ms ease-in")
    ])
  ]),
  trigger("receiptAnim", [
    state(
      "hide",
      style({
        height: "0",
        transform: "scale(0)"
      })
    ),
    state(
      "show",
      style({
        height: "*",
        transform: "scale(1)"
      })
    ),
    transition("hide <=> show", [
      animate("300ms ease-in")
    ])
  ])
];
