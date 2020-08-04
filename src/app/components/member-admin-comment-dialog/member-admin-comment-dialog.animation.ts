import { trigger, state, style, transition, animate } from "@angular/animations";

export const memberAdminCommentDialogAnimation = [
  trigger("editDeleteAnim", [
    state(
      "false",
      style({
        opacity: 0,
        transform: "scale(0)",
      })
    ),
    state(
      "true",
      style({
        opacity: 1,
        transform: "scale(1)",
      })
    ),
    transition("false <=> true", [animate("300ms ease-in")]),
  ]),
  trigger("deleteAnim", [
    state(
      "false",
      style({
        opacity: 0,
        transform: "scale(0)",
      })
    ),
    state(
      "true",
      style({
        opacity: 1,
        transform: "scale(1)",
      })
    ),
    transition("false <=> true", [animate("300ms ease-in")]),
  ]),
  trigger("clearButtonAnim", [
    state(
      "false",
      style({
        opacity: 0,
        transform: "scale(0) translateY(0)",
      })
    ),
    state(
      "true",
      style({
        opacity: 1,
        transform: "scale(1) translateY(-5px)"
      })
    ),
    transition("false <=> true", [animate("300ms ease-in")]),
  ]),
  trigger("saveButtonAnim", [
    state(
      "true",
      style({
        transform: "translateY(-5px)",
      })
    ),
    state(
      "false",
      style({
        transform: "translateY(10px)",
      })
    ),
    transition("false <=> true", [animate("300ms ease-in")]),
  ]),
];
